"use client";

import React from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { commentsApi, unwrap } from "@/apis/commentApi";
import { MoreIcon } from "@/assets/icons/MoreIcon";
import { HeartIconG, HeartIconGFill } from "@/assets/icons/HeartIconG";
import { ChatIconG } from "@/assets/icons/ChatIconG";

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
  replyOpen?: boolean;
  replyInput?: string;
  isEditing?: boolean;
  editValue?: string;
  replies?: Reply[];
}

export interface CommentsSectionProps {
  postId: number | string;
  commentsData?: any[];
  currentUserName: string;
  autoFetch?: boolean;

  onCreateComment?: (content: string) => Promise<Comment | void>;
  onToggleCommentLike?: (
    commentId: number,
    nextLiked: boolean
  ) => Promise<void>;
  onCreateReply?: (commentId: number, content: string) => Promise<Reply | void>;
  onToggleReplyLike?: (
    commentId: number,
    replyId: number,
    nextLiked: boolean
  ) => Promise<void>;

  onCountChange?: (count: number) => void;
  showHeader?: boolean;
}

/* ========= mapping (server → UI) ========= */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapReply = (r: Record<string, any>): Reply => ({
  id: Number(r?.replyId ?? r?.id),
  author: r?.replierNickname ?? r?.author,
  avatarUrl: r?.replierProfileImageUrl ?? "/profile-default.png",
  ownerId: Number(r?.replierId ?? 0),
  content: r?.content ?? "",
  createdAt: (r?.updatedAt ?? r?.createdAt ?? "")
    .split("T")[0]
    ?.replace(/-/g, "."),
  likes: Number(r?.likeCount ?? r?.likes ?? 0),
  liked: !!(r?.liked ?? r?.isLiked),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapComment = (c: Record<string, any>): Comment => ({
  id: Number(c?.commentId ?? c?.id),
  author: c?.commenterNickname ?? c?.author,
  avatarUrl: c?.commenterProfileImageUrl ?? "/profile-default.png",
  ownerId: Number(c?.commenterId ?? 0),
  content: c?.content ?? "",
  createdAt: (c?.updatedAt ?? c?.createdAt ?? "")
    .split("T")[0]
    ?.replace(/-/g, "."),
  likes: Number(c?.likeCount ?? c?.likes ?? 0),
  liked: !!(c?.liked ?? c?.isLiked),
  replyOpen: false,
  replyInput: "",
  isEditing: false,
  editValue: "",
  replies: (Array.isArray(c?.replies) ? c.replies : []).map(mapReply),
});

/* ========= util ========= */

const getMyId = (): number | undefined => {
  if (typeof window === "undefined") return;
  const keys = ["userId", "id", "memberId", "authorId"];
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

const normalizeServerComments = (
  raw: Array<Record<string, unknown>>
): Comment[] => {
  const mapped = raw.map(mapComment);
  const replyIds = new Set<number>();
  mapped.forEach((c) => c.replies?.forEach((r) => replyIds.add(r.id)));
  return mapped.filter((c) => !replyIds.has(c.id));
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

  const [commentText, setCommentText] = React.useState("");
  const [comments, setComments] = React.useState<Comment[]>(() =>
    (commentsData ?? []).map((c) => ({ ...c }))
  );

  /* 댓글 개수 상위 전달 */
  React.useEffect(() => {
    onCountChange?.(comments.length);
  }, [comments.length, onCountChange]);

  /* 기본 동작 */
  const defaultToggleCommentLike = async (cid: number, next: boolean) => {
    if (next) await commentsApi.like(postId, cid);
    else await commentsApi.unlike(postId, cid);
  };
  const defaultToggleReplyLike = async (
    _cid: number,
    rid: number,
    next: boolean
  ) => {
    if (next) await commentsApi.like(postId, rid);
    else await commentsApi.unlike(postId, rid);
  };
  const defaultCreateComment = async (content: string): Promise<Comment> => {
    const res = await commentsApi.create(postId, { parentId: null, content });
    const c = unwrap(res);
    return mapComment(c?.comment ?? c?.data ?? c);
  };
  const defaultCreateReply = async (
    cid: number,
    content: string
  ): Promise<Reply> => {
    const res = await commentsApi.create(postId, {
      parentId: cid,
      content,
    });
    const r = unwrap(res);
    return mapReply(r?.reply ?? r?.data ?? r);
  };

  /* 서버 새로고침 */
  const refreshComments = React.useCallback(async () => {
    try {
      const res = await commentsApi.get(postId);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const u: any = unwrap(res);
      const list = u?.data?.comments ?? u?.comments ?? [];
      const normalized = normalizeServerComments(
        Array.isArray(list) ? list : []
      );
      setComments(normalized);
    } catch (e) {
      console.warn("[refresh error]", e);
    }
  }, [postId]);

  React.useEffect(() => {
    if (!autoFetch || commentsData.length > 0) return;
    refreshComments();
  }, [autoFetch, commentsData.length, refreshComments]);

  /* 좋아요 */
  const toggleCommentLike = async (cid: number) => {
    const was = comments.find((c) => c.id === cid)?.liked ?? false;
    const next = !was;

    setComments((prev) =>
      prev.map((c) =>
        c.id === cid
          ? { ...c, liked: next, likes: next ? c.likes + 1 : c.likes - 1 }
          : c
      )
    );

    try {
      await (onToggleCommentLike ?? defaultToggleCommentLike)(cid, next);
    } catch {
      // rollback
      setComments((prev) =>
        prev.map((c) =>
          c.id === cid
            ? { ...c, liked: was, likes: was ? c.likes + 1 : c.likes - 1 }
            : c
        )
      );
    }
  };

  const toggleReplyLike = async (cid: number, rid: number) => {
    const parent = comments.find((c) => c.id === cid);
    const was = parent?.replies?.find((r) => r.id === rid)?.liked ?? false;
    const next = !was;

    setComments((prev) =>
      prev.map((c) =>
        c.id === cid
          ? {
              ...c,
              replies:
                c.replies?.map((r) =>
                  r.id === rid
                    ? {
                        ...r,
                        liked: next,
                        likes: next ? r.likes + 1 : r.likes - 1,
                      }
                    : r
                ) ?? [],
            }
          : c
      )
    );

    try {
      await (onToggleReplyLike ?? defaultToggleReplyLike)(cid, rid, next);
    } catch {
      // rollback
      setComments((prev) =>
        prev.map((c) =>
          c.id === cid
            ? {
                ...c,
                replies:
                  c.replies?.map((r) =>
                    r.id === rid
                      ? {
                          ...r,
                          liked: was,
                          likes: was ? r.likes + 1 : r.likes - 1,
                        }
                      : r
                  ) ?? [],
              }
            : c
        )
      );
    }
  };

  /* 대댓글 토글/입력 */
  const toggleReplyOpen = (cid: number) =>
    setComments((prev) =>
      prev.map((c) => (c.id === cid ? { ...c, replyOpen: !c.replyOpen } : c))
    );

  const changeReplyInput = (cid: number, text: string) =>
    setComments((prev) =>
      prev.map((c) => (c.id === cid ? { ...c, replyInput: text } : c))
    );

  /* 댓글/대댓글 편집/삭제 */

  const startEditComment = (cid: number) =>
    setComments((prev) =>
      prev.map((c) =>
        c.id === cid ? { ...c, isEditing: true, editValue: c.content } : c
      )
    );

  const cancelEditComment = (cid: number) =>
    setComments((prev) =>
      prev.map((c) =>
        c.id === cid ? { ...c, isEditing: false, editValue: "" } : c
      )
    );

  const saveEditComment = async (cid: number) => {
    const content = comments.find((c) => c.id === cid)?.editValue?.trim() ?? "";

    if (!content) return cancelEditComment(cid);

    try {
      await commentsApi.update(postId, cid, content);
      setComments((prev) =>
        prev.map((c) =>
          c.id === cid ? { ...c, isEditing: false, content } : c
        )
      );
    } catch {
      alert("수정 실패");
    }
  };

  const deleteComment = async (cid: number) => {
    if (!confirm("댓글을 삭제할까요?")) return;
    try {
      await commentsApi.remove(postId, cid);
      setComments((prev) => prev.filter((c) => c.id !== cid));
    } catch {
      alert("삭제 실패");
    }
  };

  const startEditReply = (cid: number, rid: number) =>
    setComments((prev) =>
      prev.map((c) =>
        c.id === cid
          ? {
              ...c,
              replies:
                c.replies?.map((r) =>
                  r.id === rid
                    ? { ...r, isEditing: true, editValue: r.content }
                    : r
                ) ?? [],
            }
          : c
      )
    );

  const cancelEditReply = (cid: number, rid: number) =>
    setComments((prev) =>
      prev.map((c) =>
        c.id === cid
          ? {
              ...c,
              replies:
                c.replies?.map((r) =>
                  r.id === rid ? { ...r, isEditing: false, editValue: "" } : r
                ) ?? [],
            }
          : c
      )
    );

  const saveEditReply = async (cid: number, rid: number) => {
    const content =
      comments.find((c) => c.id === cid)?.replies?.find((r) => r.id === rid)
        ?.editValue ?? "";

    if (!content) return cancelEditReply(cid, rid);

    try {
      await commentsApi.update(postId, rid, content);
      setComments((prev) =>
        prev.map((c) =>
          c.id === cid
            ? {
                ...c,
                replies:
                  c.replies?.map((r) =>
                    r.id === rid ? { ...r, isEditing: false, content } : r
                  ) ?? [],
              }
            : c
        )
      );
    } catch {
      alert("수정 실패");
    }
  };

  const deleteReply = async (cid: number, rid: number) => {
    if (!confirm("대댓글을 삭제할까요?")) return;

    try {
      await commentsApi.remove(postId, rid);
      setComments((prev) =>
        prev.map((c) =>
          c.id === cid
            ? {
                ...c,
                replies: c.replies?.filter((r) => r.id !== rid) ?? [],
              }
            : c
        )
      );
    } catch {
      alert("삭제 실패");
    }
  };

  const ownedByMe = (ownerId?: number) =>
    me !== undefined && ownerId !== undefined && Number(me) === Number(ownerId);

  /* 대댓글 등록 */

  const handleSubmitReply = async (cid: number) => {
    const content =
      comments.find((x) => x.id === cid)?.replyInput?.trim() ?? "";
    if (!content) return;

    const now = new Date();
    const optimistic: Reply = {
      id: now.getTime(),
      author: currentUserName,
      content,
      createdAt: now.toISOString().split("T")[0].replace(/-/g, "."),
      liked: false,
      likes: 0,
      avatarUrl: "/profile-default.png",
      ownerId: me,
    };

    setComments((prev) =>
      prev.map((x) =>
        x.id === cid
          ? {
              ...x,
              replies: [...(x.replies ?? []), optimistic],
              replyInput: "",
              replyOpen: false,
            }
          : x
      )
    );

    try {
      const created =
        (await (onCreateReply ?? defaultCreateReply)(cid, content)) ?? null;
      if (created) {
        setComments((prev) =>
          prev.map((x) =>
            x.id === cid
              ? {
                  ...x,
                  replies: x.replies?.map((r) =>
                    r.id === optimistic.id ? created : r
                  ),
                }
              : x
          )
        );
      }
    } catch {
      // rollback
      setComments((prev) =>
        prev.map((x) =>
          x.id === cid
            ? {
                ...x,
                replies: x.replies?.filter((r) => r.id !== optimistic.id) ?? [],
              }
            : x
        )
      );
    }
  };

  /* ======= UI ======= */
  return (
    <Section>
      {showHeader && <Text typo="Body_2">{comments.length}개의 댓글</Text>}

      {/* 입력 */}
      <InputRow>
        <Input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
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
              author: currentUserName,
              avatarUrl: "/profile-default.png",
              content,
              createdAt: now.toISOString().split("T")[0].replace(/-/g, "."),
              likes: 0,
              liked: false,
              replyInput: "",
              replyOpen: false,
              replies: [],
            };

            setComments((prev) => [optimistic, ...prev]);
            setCommentText("");

            try {
              await (onCreateComment ?? defaultCreateComment)(content);
              await refreshComments();
            } catch {
              // rollback
              setComments((prev) => prev.filter((c) => c.id !== optimistic.id));
              setCommentText(content);
            }
          }}
        >
          등록
        </Submit>
      </InputRow>

      {/* 리스트 */}
      <List>
        {comments.map((c) => (
          <Item key={c.id}>
            <HeadRow>
              <LeftGroup>
                <Avatar
                  src={c.avatarUrl ?? "/profile-default.png"}
                  alt="avatar"
                />
                <Text typo="Body_3">{c.author}</Text>
              </LeftGroup>

              <DropdownWrap>
                <MoreBtn aria-label="more">
                  <MoreIcon />
                </MoreBtn>

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

            {/* 본문 */}
            {!c.isEditing ? (
              <Text typo="Body_2">{c.content}</Text>
            ) : (
              <EditInput
                value={c.editValue ?? ""}
                onChange={(e) =>
                  setComments((prev) =>
                    prev.map((x) =>
                      x.id === c.id ? { ...x, editValue: e.target.value } : x
                    )
                  )
                }
              />
            )}

            {/* 메타 */}
            <MetaRow>
              <CapsuleBtn
                data-active={c.liked ? "true" : "false"}
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

            {/* 대댓글 입력 */}
            {c.replyOpen && (
              <ReplyRow>
                <ReplyInput
                  placeholder="답글을 입력하세요"
                  value={c.replyInput ?? ""}
                  onChange={(e) => changeReplyInput(c.id, e.target.value)}
                />
                <ReplySubmit
                  onClick={async () => {
                    await handleSubmitReply(c.id);
                    await refreshComments();
                  }}
                >
                  등록
                </ReplySubmit>
              </ReplyRow>
            )}

            {/* 대댓글 리스트 */}
            {!!c.replies?.length && (
              <Replies>
                {c.replies.map((r) => (
                  <ReplyItem key={r.id}>
                    <ReplyHead>
                      <ReplyLeft>
                        <ReplyAvatar
                          src={r.avatarUrl ?? "/profile-default.png"}
                          alt="avatar"
                        />
                        <Text typo="Body_3">{r.author}</Text>
                      </ReplyLeft>

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
                        onChange={(e) =>
                          setComments((prev) =>
                            prev.map((x) =>
                              x.id === c.id
                                ? {
                                    ...x,
                                    replies:
                                      x.replies?.map((rr) =>
                                        rr.id === r.id
                                          ? {
                                              ...rr,
                                              editValue: e.target.value,
                                            }
                                          : rr
                                      ) ?? [],
                                  }
                                : x
                            )
                          )
                        }
                      />
                    )}

                    <ReplyActions>
                      <CapsuleBtn
                        data-active={r.liked ? "true" : "false"}
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

/* ========= styles ========= */

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

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
  font-weight: 700;
  border: 1px solid ${({ disabled }) => (disabled ? "#dbe4f4" : "#80a9f2")};
  background: ${({ disabled }) => (disabled ? "#eef3ff" : "#e9f1ff")};
  color: ${({ disabled }) => (disabled ? "#94a3b8" : "#1f3e9a")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

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

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CapsuleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: none;
  background: #fff;
  cursor: pointer;

  &[data-active="true"] {
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

const Replies = styled.div`
  margin-top: 8px;
  padding-left: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ReplyItem = styled.div`
  background: #fff;
  padding: 12px;
  border-radius: 12px;
`;

const ReplyHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
`;

const ReplyActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ReplyRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 8px;
`;

const ReplyInput = styled.textarea`
  flex: 1;
  height: 84px;
  padding: 12px 14px;
  border-radius: 12px;
  resize: none;
  border: 1px solid #e5e7eb;
`;

const ReplySubmit = styled.button`
  padding: 10px 13px;
  background: #e9f1ff;
  color: #1f3e9a;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const EditInput = styled.textarea`
  width: 100%;
  min-height: 88px;
  padding: 12px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  resize: vertical;

  &:focus {
    border-color: #a6c6fa;
    box-shadow: 0 0 0 3px rgba(166, 198, 250, 0.2);
  }
`;

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
  top: 24px;
  right: 0;
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
  shouldForwardProp: (p) => p !== "$danger",
})<{ $danger?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  text-align: left;
  background: #fff;
  border: none;
  cursor: pointer;
  color: ${({ $danger }) => ($danger ? "#ef4444" : "#111827")};

  &:hover {
    background: #f9fafb;
  }
`;

const DropDivider = styled.div`
  height: 1px;
  background: #eef2ff;
`;
