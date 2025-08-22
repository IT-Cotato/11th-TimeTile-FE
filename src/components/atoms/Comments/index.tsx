'use client';

import React from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { commentsApi, unwrap } from '@/apis/commentApi';
import { MoreIcon } from '@/assets/icons/MoreIcon';
import { HeartIconG, HeartIconGFill } from '@/assets/icons/HeartIconG';
import { ChatIconG } from '@/assets/icons/ChatIconG';

/* ========= Types ========= */
export interface Reply {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  liked?: boolean;
  avatarUrl?: string;
  ownerId?: number;
  // UI-only
  isEditing?: boolean;
  editValue?: string;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
  liked?: boolean;
  avatarUrl?: string;
  ownerId?: number;
  // UI-only
  replyOpen?: boolean;
  replyInput?: string;
  isEditing?: boolean;
  editValue?: string;
  replies?: Reply[];
}

export interface CommentsSectionProps {
  postId: number | string; // 내부 연동용
  commentsData?: Comment[]; // 초기 데이터(없으면 자동 GET)
  currentUserName: string;
  autoFetch?: boolean; // 기본 true

  // 콜백 있으면 우선 사용(오버라이드)
  onCreateComment?: (content: string) => Promise<Comment | void>;
  onToggleCommentLike?: (
    commentId: number,
    nextLiked: boolean,
  ) => Promise<void>;
  onCreateReply?: (commentId: number, content: string) => Promise<Reply | void>;
  onToggleReplyLike?: (
    commentId: number,
    replyId: number,
    nextLiked: boolean,
  ) => Promise<void>;

  onCountChange?: (count: number) => void;
  showHeader?: boolean;
}

/* ========= mapping (서버 스펙) ========= */
// replies: replyId, replierId, replierNickname, replierProfileImageUrl, updatedAt, likeCount
const mapReply = (r: any): Reply => ({
  id: Number(r?.replyId ?? r?.id),
  author: r?.replierNickname ?? r?.author,
  avatarUrl: r?.replierProfileImageUrl ?? '/profile-default.png',
  ownerId: Number(r?.replierId ?? 0),
  content: r?.content ?? '',
  createdAt: (r?.updatedAt ?? r?.createdAt ?? '')
    .split('T')[0]
    ?.replace(/-/g, '.'),
  likes: Number(r?.likeCount ?? r?.likes ?? 0),
  liked: !!(r?.liked ?? r?.isLiked),
});

// comments: commentId, commenterId, commenterNickname, commenterProfileImageUrl, updatedAt, likeCount, replies:[]
const mapComment = (c: any): Comment => ({
  id: Number(c?.commentId ?? c?.id),
  author: c?.commenterNickname ?? c?.author,
  avatarUrl: c?.commenterProfileImageUrl ?? '/profile-default.png',
  ownerId: Number(c?.commenterId ?? 0),
  content: c?.content ?? '',
  createdAt: (c?.updatedAt ?? c?.createdAt ?? '')
    .split('T')[0]
    ?.replace(/-/g, '.'),
  likes: Number(c?.likeCount ?? c?.likes ?? 0),
  liked: !!(c?.liked ?? c?.isLiked),
  replyOpen: false,
  replyInput: '',
  isEditing: false,
  editValue: '',
  replies: (Array.isArray(c?.replies) ? c.replies : []).map(mapReply),
});

/* ========= util ========= */
const getMyId = (): number | undefined => {
  if (typeof window === 'undefined') return;
  const keys = ['userId', 'id', 'memberId', 'authorId'];
  for (const k of keys) {
    const raw = localStorage.getItem(k);
    if (!raw) continue;
    try {
      const n = Number(JSON.parse(raw) ?? raw);
      if (Number.isFinite(n)) return n;
    } catch {
      const n = Number(raw);
      if (Number.isFinite(n)) return n;
    }
  }
};

const normalizeServerComments = (raw: any[]): Comment[] => {
  const mapped = raw.map(mapComment);
  const replyIds = new Set<number>();
  mapped.forEach(c => c.replies?.forEach(r => replyIds.add(r.id)));
  // replies에 등장한 id는 top-level에서 제거
  return mapped.filter(c => !replyIds.has(c.id));
};

/* ========= Component ========= */
const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  commentsData = [],
  currentUserName,
  autoFetch = true,
  onCreateComment,
  onToggleCommentLike,
  onCreateReply,
  onToggleReplyLike,
  onCountChange,
  showHeader = true,
}) => {
  const me = React.useMemo(() => getMyId(), []);
  const [commentText, setCommentText] = React.useState('');
  const [comments, setComments] = React.useState<Comment[]>(() =>
    (commentsData ?? []).map(map => ({ ...map })),
  );

  /* 카운트 동기화 */
  React.useEffect(() => {
    onCountChange?.(comments.length);
  }, [comments.length, onCountChange]);

  /* 기본 동작(콜백 미제공 시 사용) */
  const defaultToggleCommentLike = async (
    commentId: number,
    nextLiked: boolean,
  ) => {
    if (nextLiked) await commentsApi.like(postId, commentId);
    else await commentsApi.unlike(postId, commentId);
  };
  const defaultToggleReplyLike = async (
    _cid: number,
    replyId: number,
    nextLiked: boolean,
  ) => {
    if (nextLiked) await commentsApi.like(postId, replyId);
    else await commentsApi.unlike(postId, replyId);
  };
  const defaultCreateComment = async (content: string): Promise<Comment> => {
    const res = await commentsApi.create(postId, { parentId: null, content });
    const c = unwrap(res);
    const created = c?.comment ?? c?.data ?? c;
    return mapComment(created);
  };
  const defaultCreateReply = async (
    commentId: number,
    content: string,
  ): Promise<Reply> => {
    const res = await commentsApi.create(postId, {
      parentId: Number(commentId),
      content,
    });
    const r = unwrap(res);
    const created = r?.reply ?? r?.data ?? r;
    return mapReply(created);
  };

  const refreshComments = React.useCallback(async () => {
    try {
      const res = await commentsApi.get(postId);
      const u: any = unwrap?.(res) ?? res;
      const list = u?.data?.comments ?? u?.comments ?? [];
      const normalized = normalizeServerComments(
        Array.isArray(list) ? list : [],
      );
      setComments(normalized);
    } catch (e) {
      console.warn('[comments refresh error]', e);
    }
  }, [postId]);

  React.useEffect(() => {
    if (!autoFetch || commentsData.length > 0) return;
    refreshComments();
  }, [refreshComments, autoFetch, commentsData.length]);

  /* 좋아요 */
  const toggleCommentLike = async (commentId: number) => {
    const was = comments.find(c => c.id === commentId)?.liked ?? false;
    const next = !was;
    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? {
              ...c,
              liked: next,
              likes: next ? c.likes + 1 : Math.max(0, c.likes - 1),
            }
          : c,
      ),
    );
    try {
      await (onToggleCommentLike ?? defaultToggleCommentLike)(commentId, next);
    } catch {
      setComments(prev =>
        prev.map(c =>
          c.id === commentId
            ? {
                ...c,
                liked: was,
                likes: was ? c.likes + 1 : Math.max(0, c.likes - 1),
              }
            : c,
        ),
      );
    }
  };
  const toggleReplyLike = async (commentId: number, replyId: number) => {
    const parent = comments.find(c => c.id === commentId);
    const was = parent?.replies?.find(r => r.id === replyId)?.liked ?? false;
    const next = !was;
    setComments(prev =>
      prev.map(c =>
        c.id === commentId
          ? {
              ...c,
              replies:
                c.replies?.map(r =>
                  r.id === replyId
                    ? {
                        ...r,
                        liked: next,
                        likes: next ? r.likes + 1 : Math.max(0, r.likes - 1),
                      }
                    : r,
                ) ?? [],
            }
          : c,
      ),
    );
    try {
      await (onToggleReplyLike ?? defaultToggleReplyLike)(
        commentId,
        replyId,
        next,
      );
    } catch {
      setComments(prev =>
        prev.map(c =>
          c.id === commentId
            ? {
                ...c,
                replies:
                  c.replies?.map(r =>
                    r.id === replyId
                      ? {
                          ...r,
                          liked: was,
                          likes: was ? r.likes + 1 : Math.max(0, r.likes - 1),
                        }
                      : r,
                  ) ?? [],
              }
            : c,
        ),
      );
    }
  };

  const toggleReplyOpen = (commentId: number) =>
    setComments(prev =>
      prev.map(c =>
        c.id === commentId ? { ...c, replyOpen: !c.replyOpen } : c,
      ),
    );
  const changeReplyInput = (commentId: number, text: string) =>
    setComments(prev =>
      prev.map(c => (c.id === commentId ? { ...c, replyInput: text } : c)),
    );

  /* ====== 인라인 편집/삭제 핸들러 ====== */
  const startEditComment = (cid: number) =>
    setComments(prev =>
      prev.map(c =>
        c.id === cid ? { ...c, isEditing: true, editValue: c.content } : c,
      ),
    );
  const cancelEditComment = (cid: number) =>
    setComments(prev =>
      prev.map(c =>
        c.id === cid ? { ...c, isEditing: false, editValue: '' } : c,
      ),
    );
  const saveEditComment = async (cid: number) => {
    const content = comments.find(c => c.id === cid)?.editValue?.trim() ?? '';
    if (!content) return cancelEditComment(cid);
    try {
      await commentsApi.update(postId, cid, content);
      setComments(prev =>
        prev.map(c =>
          c.id === cid ? { ...c, isEditing: false, content, editValue: '' } : c,
        ),
      );
    } catch {
      alert('수정에 실패했습니다.');
    }
  };
  const deleteComment = async (cid: number) => {
    if (!confirm('댓글을 삭제할까요?')) return;
    try {
      await commentsApi.remove(postId, cid);
      setComments(prev => prev.filter(c => c.id !== cid));
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  const removeOnServer = async (
    postId: number | string,
    commentOrReplyId: number,
  ) => {
    await commentsApi.remove(postId, commentOrReplyId);
  };

  const startEditReply = (cid: number, rid: number) =>
    setComments(prev =>
      prev.map(c =>
        c.id === cid
          ? {
              ...c,
              replies: c.replies?.map(r =>
                r.id === rid
                  ? { ...r, isEditing: true, editValue: r.content }
                  : r,
              ),
            }
          : c,
      ),
    );
  const cancelEditReply = (cid: number, rid: number) =>
    setComments(prev =>
      prev.map(c =>
        c.id === cid
          ? {
              ...c,
              replies: c.replies?.map(r =>
                r.id === rid ? { ...r, isEditing: false, editValue: '' } : r,
              ),
            }
          : c,
      ),
    );
  const saveEditReply = async (cid: number, rid: number) => {
    const reply = comments
      .find(c => c.id === cid)
      ?.replies?.find(r => r.id === rid);
    const content = reply?.editValue?.trim() ?? '';
    if (!content) return cancelEditReply(cid, rid);
    try {
      await commentsApi.update(postId, rid, content); // ↔ 서버가 replyId도 동일 엔드포인트로 처리
      setComments(prev =>
        prev.map(c =>
          c.id === cid
            ? {
                ...c,
                replies: c.replies?.map(r =>
                  r.id === rid
                    ? { ...r, isEditing: false, content, editValue: '' }
                    : r,
                ),
              }
            : c,
        ),
      );
    } catch {
      alert('수정에 실패했습니다.');
    }
  };
  const deleteReply = async (cid: number, rid: number) => {
    if (!confirm('대댓글을 삭제할까요?')) return;
    try {
      await commentsApi.remove(postId, rid);
      setComments(prev =>
        prev.map(c =>
          c.id === cid
            ? {
                ...c,
                replies: c.replies?.filter(r => r.id !== rid) ?? [],
              }
            : c,
        ),
      );
    } catch {
      alert('삭제에 실패했습니다.');
    }
  };

  /* 소유자 체크 */
  const ownedByMe = (ownerId?: number) =>
    me !== undefined && ownerId !== undefined && Number(me) === Number(ownerId);

  // 신고 모달 상태
  const [reportOpen, setReportOpen] = React.useState(false);
  const [reportText, setReportText] = React.useState('');
  const maxReportLen = 200;

  // 어떤 것을 신고하는지 구분: comment / reply
  const [reportTarget, setReportTarget] = React.useState<
    | { type: 'comment'; id: number }
    | { type: 'reply'; cid: number; rid: number }
    | null
  >(null);

  /* ====== 대댓글 등록 핸들러 (ReplySubmit 버튼용) ====== */
  const handleSubmitReply = async (cid: number) => {
    const content = (comments.find(x => x.id === cid)?.replyInput ?? '').trim();
    if (!content) return;

    const now = new Date();
    const optimistic: Reply = {
      id: now.getTime(),
      author: currentUserName || '나',
      content,
      createdAt: now.toISOString().split('T')[0].replace(/-/g, '.'),
      likes: 0,
      liked: false,
      avatarUrl: '/profile-default.png',
      ownerId: me,
    };

    // 낙관적 등록: 해당 댓글에만 추가
    setComments(prev =>
      prev.map(x =>
        x.id === cid
          ? {
              ...x,
              replies: [...(x.replies ?? []), optimistic],
              replyInput: '',
              replyOpen: false,
            }
          : x,
      ),
    );

    try {
      const created = await (onCreateReply ?? defaultCreateReply)(cid, content);
      if (created) {
        setComments(prev =>
          prev.map(x =>
            x.id === cid
              ? {
                  ...x,
                  replies:
                    x.replies?.map(r =>
                      r.id === optimistic.id ? created : r,
                    ) ?? [],
                }
              : x,
          ),
        );
      }
    } catch {
      // 실패 롤백
      setComments(prev =>
        prev.map(x =>
          x.id === cid
            ? {
                ...x,
                replies: x.replies?.filter(r => r.id !== optimistic.id) ?? [],
              }
            : x,
        ),
      );
    }
  };

  /* ====== UI ====== */
  return (
    <Section>
      {/* 최상단 입력 */}
      <InputRow>
        <Input
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="댓글을 입력해보세요."
        />
        <Submit
          disabled={!commentText.trim()}
          onClick={async () => {
            const content = commentText.trim();
            if (!content) return;
            const now = new Date();
            const optimistic: Comment = {
              id: now.getTime(),
              author: currentUserName || '나',
              avatarUrl: '/profile-default.png',
              content,
              createdAt: now.toISOString().split('T')[0].replace(/-/g, '.'),
              likes: 0,
              liked: false,
              replyOpen: false,
              replyInput: '',
              replies: [],
            };
            setComments(prev => [optimistic, ...prev]);
            setCommentText('');
            try {
              const created = await (onCreateComment ?? defaultCreateComment)(
                content,
              );
              await refreshComments();
            } catch {
              setComments(prev => prev.filter(c => c.id !== optimistic.id));
              setCommentText(content);
            }
          }}
        >
          등록
        </Submit>
      </InputRow>

      {showHeader && <Text typo="Body_2">{comments.length}개의 댓글</Text>}

      <List>
        {comments.map(c => (
          <Item key={c.id}>
            {/* 1행: 아바타 + 닉네임 / 우측 More */}
            {/* 1행: 아바타 + 닉네임 / 우측 More */}
            <HeadRow>
              <LeftGroup>
                <Avatar
                  src={c.avatarUrl ?? '/profile-default.png'}
                  alt="avatar"
                />
                <Text typo="Body_3">{c.author}</Text>
              </LeftGroup>

              {/* ✅ 버튼은 항상 보이게 */}
              <DropdownWrap>
                <MoreBtn aria-label="more">
                  <MoreIcon />
                </MoreBtn>

                {/* ✅ 메뉴는 내가 쓴 댓글일 때만 표시 */}
                {ownedByMe(c.ownerId) && (
                  <Dropdown className="menu">
                    {!c.isEditing ? (
                      <>
                        <DropItem onClick={() => startEditComment(c.id)}>
                          수정하기
                        </DropItem>
                        <DropDivider />
                        <DropItem $danger onClick={() => deleteComment(c.id)}>
                          삭제하기
                        </DropItem>
                      </>
                    ) : (
                      <>
                        <DropItem onClick={() => saveEditComment(c.id)}>
                          저장
                        </DropItem>
                        <DropDivider />
                        <DropItem onClick={() => cancelEditComment(c.id)}>
                          취소
                        </DropItem>
                      </>
                    )}
                  </Dropdown>
                )}
              </DropdownWrap>
            </HeadRow>

            {/* 2행: 텍스트 or 편집 */}
            {!c.isEditing ? (
              <Text typo="Body_2">{c.content}</Text>
            ) : (
              <EditInput
                value={c.editValue ?? ''}
                onChange={e =>
                  setComments(prev =>
                    prev.map(x =>
                      x.id === c.id ? { ...x, editValue: e.target.value } : x,
                    ),
                  )
                }
              />
            )}

            {/* 3행: 좋아요/댓글 + 날짜 */}
            <MetaRow>
              <CapsuleBtn
                data-active={c.liked ? 'true' : 'false'}
                onClick={() => toggleCommentLike(c.id)}
              >
                {c.liked ? <HeartIconGFill /> : <HeartIconG />} {c.likes}
              </CapsuleBtn>
              <CapsuleBtn onClick={() => toggleReplyOpen(c.id)}>
                <ChatIconG /> {c.replies?.length ?? 0}
              </CapsuleBtn>
              <RowSpacer />
              <DateText typo="Caption_2">{c.createdAt}</DateText>
            </MetaRow>

            {/* 대댓글 입력 토글 */}
            {c.replyOpen && (
              <ReplyRow>
                <ReplyInput
                  placeholder="답글을 입력하세요"
                  value={c.replyInput ?? ''}
                  onChange={e => changeReplyInput(c.id, e.target.value)}
                  maxLength={300}
                />
                <ReplySubmit
                  onClick={async () => {
                    await handleSubmitReply(c.id); // 대댓글 생성
                    await refreshComments(); // ✅ 서버 값으로 즉시 새로고침
                  }}
                >
                  등록
                </ReplySubmit>
              </ReplyRow>
            )}

            {/* 대댓글 리스트 */}
            {!!c.replies?.length && (
              <Replies>
                {c.replies.map(r => (
                  <ReplyItem key={r.id}>
                    <ReplyHead>
                      <ReplyLeft>
                        <ReplyAvatar
                          src={r.avatarUrl ?? '/profile-default.png'}
                          alt="avatar"
                        />
                        <Text typo="Body_3">{r.author}</Text>
                      </ReplyLeft>

                      {/* ✅ 버튼은 항상, 메뉴는 내 대댓글일 때만 */}
                      <DropdownWrap>
                        <MoreBtn aria-label="more">
                          <MoreIcon />
                        </MoreBtn>
                        {ownedByMe(r.ownerId) && (
                          <Dropdown className="menu">
                            {!r.isEditing ? (
                              <>
                                <DropItem
                                  onClick={() => startEditReply(c.id, r.id)}
                                >
                                  수정하기
                                </DropItem>
                                <DropDivider />
                                <DropItem
                                  $danger
                                  onClick={() => deleteReply(c.id, r.id)}
                                >
                                  삭제하기
                                </DropItem>
                              </>
                            ) : (
                              <>
                                <DropItem
                                  onClick={() => saveEditReply(c.id, r.id)}
                                >
                                  저장
                                </DropItem>
                                <DropDivider />
                                <DropItem
                                  onClick={() => cancelEditReply(c.id, r.id)}
                                >
                                  취소
                                </DropItem>
                              </>
                            )}
                          </Dropdown>
                        )}
                      </DropdownWrap>
                    </ReplyHead>

                    {!r.isEditing ? (
                      <Text typo="Body_3">{r.content}</Text>
                    ) : (
                      <EditInput
                        value={r.editValue ?? r.content}
                        onChange={e =>
                          setComments(prev =>
                            prev.map(x =>
                              x.id === c.id
                                ? {
                                    ...x,
                                    replies:
                                      x.replies?.map(rr =>
                                        rr.id === r.id
                                          ? { ...rr, editValue: e.target.value }
                                          : rr,
                                      ) ?? [],
                                  }
                                : x,
                            ),
                          )
                        }
                      />
                    )}

                    <ReplyActions>
                      <CapsuleBtn
                        data-active={r.liked ? 'true' : 'false'}
                        onClick={() => toggleReplyLike(c.id, r.id)}
                      >
                        <HeartIconG /> {r.likes}
                      </CapsuleBtn>
                      <RowSpacer />
                      <DateText typo="Caption_2">{r.createdAt}</DateText>
                    </ReplyActions>
                  </ReplyItem>
                ))}
              </Replies>
            )}
          </Item>
        ))}
      </List>
    </Section>
  );
};

export default CommentsSection;

//* ===== styles ===== */
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* 입력 행 */
const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;
const Input = styled.input`
  flex: 1;
  height: 44px;
  padding: 0 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #9ca3af;
  }
  &:focus {
    border-color: #a6c6fa;
    box-shadow: 0 0 0 3px rgba(166, 198, 250, 0.18);
  }
`;
const Submit = styled.button<{ disabled?: boolean }>`
  height: 44px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid ${({ disabled }) => (disabled ? '#dbe4f4' : '#80a9f2')};
  background: ${({ disabled }) => (disabled ? '#eef3ff' : '#e9f1ff')};
  color: ${({ disabled }) => (disabled ? '#94a3b8' : '#1f3e9a')};
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

/* 리스트 */
const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  padding: 16px;
`;

/* 댓글 헤더 */
const HeadRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f4f6;
`;
const MoreBtn = styled.button`
  all: unset;
  cursor: pointer;
  padding: 4px;
  line-height: 0;
`;

/* 메타 행 */
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
`;
const CapsuleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: none;
  background: #fff;
  line-height: 1;
  cursor: pointer;
  svg {
    display: block;
  }
  &[data-active='true'] {
    border-color: #ef4444;
    background: #fff5f5;
  }
  &:hover {
    background: #f7faff;
  }
`;
const RowSpacer = styled.div`
  flex: 1;
`;
const DateText = styled(Text)`
  color: #6b7280;
`;

/* 대댓글 */
const Replies = styled.div`
  margin-top: 8px;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ReplyItem = styled.div`
  background: #fff;
  border: none;
  border-radius: 12px;
  padding: 12px;
`;

/* 대댓글 헤더 */
const ReplyHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;
const ReplyLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const ReplyAvatar = styled.img`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  object-fit: cover;
  background: #f3f4f6;
`;

const ReplyActions = styled.div`
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

/* 대댓글 입력 */
const ReplyRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
  align-items: flex-end;
`;
const ReplyInput = styled.textarea`
  flex: 1;
  resize: none;
  height: 84px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  font-size: 14px;
  outline: none;
  &::placeholder {
    color: #9ca3af;
  }
  &:focus {
    border-color: #a6c6fa;
    box-shadow: 0 0 0 3px rgba(166, 198, 250, 0.2);
  }
`;
const ReplySubmit = styled.button`
  padding: 10px 13px;
  border-radius: 10px;
  border: none;
  background: #e9f1ff;
  color: #1f3e9a;
  font-weight: 600;
  cursor: pointer;
`;

/* 인라인 편집 입력 */
const EditInput = styled.textarea`
  width: 100%;
  min-height: 88px;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  outline: none;
  resize: vertical;
  background: #fff;
  &:focus {
    border-color: #a6c6fa;
    box-shadow: 0 0 0 3px rgba(166, 198, 250, 0.2);
  }
`;

/* 간단 드롭다운 (More) */
const DropdownWrap = styled.div`
  position: relative;
  &:hover .menu {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }
`;
const Dropdown = styled.div`
  position: absolute;
  right: 0;
  top: 24px;
  min-width: 120px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 5;
  opacity: 0;
  pointer-events: none;
  transform: translateY(-6px);
  transition: all 0.15s ease;
`;
const DropItem = styled.button.withConfig({
  shouldForwardProp: p => p !== '$danger',
})<{ $danger?: boolean }>`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  background: #fff;
  border: none;
  cursor: pointer;
  color: ${({ $danger }) => ($danger ? '#ef4444' : '#111827')};
  &:hover {
    background: #f9fafb;
  }
`;
const DropDivider = styled.div`
  height: 1px;
  background: #eef2ff;
`;
