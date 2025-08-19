'use client';

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { commentsApi } from '@/apis/commentApi';

/** 서버 응답 타입(필요 필드만) */
type Reply = {
  replyId: number;
  content: string;
  replierId: number;
  replierNickname: string;
  replierProfileImageUrl: string;
  updatedAt: string;
  likeCount: number;
  liked?: boolean;
};
type Comment = {
  commentId: number;
  content: string;
  commenterId: number;
  commenterNickname: string;
  commenterProfileImageUrl: string;
  updatedAt: string;
  likeCount: number;
  liked?: boolean;
  replies: Reply[];
};
type ApiGetResponse = {
  data?: { totalCount?: number; comments?: Comment[] };
};

export default function CommentList({ postId }: { postId: number | string }) {
  const [list, setList] = useState<Comment[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // 입력 상태머신: idle(버튼 없음) → typing(버튼 보이되 비활성) → active(버튼 활성)
  const [focused, setFocused] = useState(false);
  const [rootInput, setRootInput] = useState('');
  const trimmed = rootInput.trim();
  const showSubmit = focused; // 피그마: 클릭하면 버튼 나타남
  const disabled = !trimmed;

  // 대댓글 (1레벨만)
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyInput, setReplyInput] = useState('');
  const replyDisabled = !replyInput.trim();

  const load = async () => {
    setLoading(true);
    try {
      const res: ApiGetResponse = await commentsApi.get(postId);
      const comments = res?.data?.comments ?? [];
      const count = res?.data?.totalCount ?? comments.length;
      setList(comments);
      setTotalCount(count);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const dateOnly = (iso?: string) => (iso ? (iso.split('T')[0] ?? iso) : '');

  const submitRoot = async () => {
    if (!trimmed) return;
    await commentsApi.create(postId, { parentId: null, content: trimmed });
    setRootInput('');
    setFocused(false); // 다시 idle
    await load();
  };

  const submitReply = async () => {
    if (!replyingTo || !replyInput.trim()) return;
    await commentsApi.create(postId, {
      parentId: replyingTo,
      content: replyInput.trim(),
    });
    setReplyInput('');
    setReplyingTo(null);
    await load();
  };

  const like = async (commentId: number, liked?: boolean) => {
    try {
      if (liked) await commentsApi.unlike(postId, commentId);
      else await commentsApi.like(postId, commentId);
      await load();
    } catch {
      setList(prev =>
        prev.map(c =>
          c.commentId === commentId
            ? { ...c, likeCount: c.likeCount + (liked ? -1 : 1), liked: !liked }
            : c,
        ),
      );
    }
  };

  const headerLabel = useMemo(() => `${totalCount}개의 댓글`, [totalCount]);

  return (
    <Wrap>
      {/* 상단 입력 (기본 idle: 버튼 없음 → 포커스 시 버튼 노출 → 입력 시 활성) */}
      <InputBar $focused={focused} onClick={() => setFocused(true)}>
        <InputArea
          placeholder="댓글을 입력해보세요."
          value={rootInput}
          onChange={e => setRootInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            // 비어있으면 idle로 돌아가며 버튼 숨김
            if (!rootInput.trim()) setFocused(false);
          }}
        />
        {showSubmit && (
          <SubmitBtn disabled={disabled} onClick={submitRoot}>
            등록
          </SubmitBtn>
        )}
      </InputBar>

      <CountBar>{headerLabel}</CountBar>
      {loading && <Loading>불러오는 중…</Loading>}

      <List>
        {list.map(c => (
          <Item key={c.commentId}>
            <RowTop>
              <User>
                <Avatar
                  src={c.commenterProfileImageUrl || '/default-profile.png'}
                  alt=""
                />
                <strong>{c.commenterNickname}</strong>
              </User>
              <DateText>{dateOnly(c.updatedAt)}</DateText>
            </RowTop>

            <Content>{c.content}</Content>

            <ActionRow>
              <ActionBtn onClick={() => like(c.commentId, c.liked)}>
                ❤️ {c.likeCount}
              </ActionBtn>
              <Divider>·</Divider>
              <ActionBtn
                className="reply"
                onClick={() => {
                  setReplyingTo(prev =>
                    prev === c.commentId ? null : c.commentId,
                  );
                  setReplyInput('');
                }}
              >
                답글
              </ActionBtn>
            </ActionRow>

            {/* typing-short (대댓글 입력) */}
            {replyingTo === c.commentId && (
              <ReplyEditor>
                <ReplyArea
                  placeholder="답글을 입력해보세요."
                  value={replyInput}
                  onChange={e => setReplyInput(e.target.value)}
                />
                <ReplySubmit disabled={replyDisabled} onClick={submitReply}>
                  등록
                </ReplySubmit>
              </ReplyEditor>
            )}

            {/* 대댓글 목록 (우측으로) */}
            {c.replies?.length > 0 && (
              <Replies>
                {c.replies.map(r => (
                  <ReplyItem key={r.replyId}>
                    <ReplyHead>
                      <User>
                        <Avatar
                          src={
                            r.replierProfileImageUrl || '/default-profile.png'
                          }
                          alt=""
                        />
                        <strong>{r.replierNickname}</strong>
                      </User>
                      <DateText>{dateOnly(r.updatedAt)}</DateText>
                    </ReplyHead>
                    <Content>{r.content}</Content>
                  </ReplyItem>
                ))}
              </Replies>
            )}
          </Item>
        ))}
      </List>
    </Wrap>
  );
}

/* ============ styles (피그마 상태) ============ */
const Wrap = styled.div`
  margin-top: 12px;
`;

const InputBar = styled.div.withConfig({
  shouldForwardProp: p => p !== '$focused',
})<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1.5px solid ${({ $focused }) => ($focused ? '#A6C6FA' : '#D2D4D6')};
  border-radius: 12px;
  background: #fff;
  transition: border-color 0.15s ease;
  min-height: 44px;
`;

const InputArea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  min-height: 24px;
  max-height: 120px;
  font-size: 14px;
  background: transparent;
  &::placeholder {
    color: #b8bdc4;
  }
`;

const SubmitBtn = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? '#BFD5F7' : '#5B86E5')};
  color: #fff;
  border: none;
  padding: 6px 10px;
  height: 28px;
  border-radius: 8px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const CountBar = styled.div`
  color: #6b7280;
  font-size: 13px;
  margin: 10px 2px 12px;
`;

const Loading = styled.div`
  color: #888;
  font-size: 14px;
  margin-bottom: 8px;
`;

const List = styled.div`
  display: grid;
  gap: 14px;
`;

const Item = styled.div`
  border: 1px solid #e6e7e8;
  border-radius: 12px;
  padding: 12px;
  background: #fff;
`;

const RowTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  strong {
    color: #171717;
  }
`;

const Avatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  object-fit: cover;
`;

const DateText = styled.span`
  color: #9aa1a8;
  font-size: 12px;
`;

const Content = styled.p`
  margin: 8px 0 0;
  white-space: pre-wrap;
  color: #2b2d2f;
  line-height: 1.6;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  color: #6b7280;
  font-size: 13px;
`;

const ActionBtn = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  color: #e55;
  &.reply {
    color: #3a5caa;
  }
`;

const Divider = styled.span`
  color: #9aa1a8;
`;

/** 대댓글: 우측 들여쓰기 & 1레벨만 */
const Replies = styled.div`
  margin-top: 12px;
  padding-left: 36px;
  display: grid;
  gap: 10px;
`;

const ReplyItem = styled.div`
  border-left: 2px solid #eef2ff;
  padding-left: 12px;
`;

const ReplyHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

/** typing-short 스타일 */
const ReplyEditor = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-top: 10px;
  margin-left: 24px;
`;

const ReplyArea = styled.textarea`
  flex: 1;
  border: 1.5px solid #d2d4d6;
  border-radius: 10px;
  padding: 8px;
  resize: none;
  font-size: 13px;
  min-height: 36px;
  &::placeholder {
    color: #b8bdc4;
  }
`;

const ReplySubmit = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? '#BFD5F7' : '#5B86E5')};
  color: #fff;
  border: none;
  padding: 6px 10px;
  height: 28px;
  border-radius: 8px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;
