'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RecordPost from '@/components/IndividualRecord/RecordPost';
import { Text } from '@/components/atoms/Text';
import { useParams } from 'next/navigation';
import { postApi } from '@/apis/postApi';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

const IndividualRecordPage = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [post, setPost] = useState<any>(null);
  const params = useParams<{ postId: string }>();
  const postId = params.postId;

  const handleSubmit = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: '유저닉네임',
      content: commentText,
      createdAt: '2025.05.25',
      likes: 0,
    };

    setComments(prev => [newComment, ...prev]);
    setCommentText('');
  };

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!postId) return;
    const fetchPost = async () => {
      try {
        const res = await postApi.getPostDetail(postId);
        setPost(res.data.data);
      } catch (err) {
        alert('게시글을 불러오지 못했습니다.');
      }
    };
    fetchPost();
  }, [postId]);

  const images = post?.mediaUrls ?? [];

  return (
    <PageWrapper>
      {post && (
        <>
          <Header>
            <LeftSection>
              <SingerText typo="Body_2">{post.authorNickname}</SingerText>·
              <TitleText typo="Body_2">{post.title}</TitleText>
            </LeftSection>
            <DateText typo="Body_3">
              {post.createdAt.split('T')[0].replace(/-/g, '.')}
            </DateText>
          </Header>

          <RecordPost
            profileImage={post.authorProfileImageUrl}
            username={post.authorNickname}
            visibility={post.visibility === 'PUBLIC' ? '전체공개' : '나만보기'}
            date={post.createdAt.split('T')[0]}
            title={post.title}
            content={post.content}
            images={images}
            likes={post.likeCount}
            comments={post.commentCount}
            commentsData={comments}
          />
        </>
      )}

      {isViewerOpen && post && (
        <ModalOverlay onClick={() => setIsViewerOpen(false)}>
          <CloseButton onClick={() => setIsViewerOpen(false)}>✕</CloseButton>
          <NavButton
            $left
            onClick={e => {
              e.stopPropagation();
              setCurrentIndex(
                prev => (prev - 1 + images.length) % images.length,
              );
            }}
          >
            ‹
          </NavButton>
          <NavButton
            $right
            onClick={e => {
              e.stopPropagation();
              setCurrentIndex(prev => (prev + 1) % images.length);
            }}
          >
            ›
          </NavButton>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ImageFull
              src={images[currentIndex]}
              alt={`image-${currentIndex}`}
            />
          </ModalContent>
        </ModalOverlay>
      )}

      <CommentInputWrapper $focused={isFocused || commentText.length > 0}>
        <CommentInput
          placeholder="댓글을 입력해보세요."
          value={commentText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => setCommentText(e.target.value)}
        />
        <SubmitButton onClick={handleSubmit} disabled={!commentText.trim()}>
          등록
        </SubmitButton>
      </CommentInputWrapper>
    </PageWrapper>
  );
};

export default IndividualRecordPage;

const PageWrapper = styled.div`
  margin: 0 auto;
  width: 952px;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  border: 1px solid var(--Primary-400, #a6c6fa);
  background: var(--Primary-50, #f7faff);
  margin-bottom: 24px;
`;

const LeftSection = styled.div``;

const SingerText = styled(Text)`
  color: var(--Primary-700, #3a5caa);
  margin-right: 4px;
`;

const TitleText = styled(Text)`
  overflow: hidden;
  color: var(--Gray-800, #3e3f40);
  text-overflow: ellipsis;
  margin-left: 4px;
`;

const DateText = styled(Text)`
  color: var(--Gray-800, #3e3f40);
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

const ImageFull = styled.img`
  width: 600px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 32px;
  left: 32px;
  color: white;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
`;

const NavButton = styled.button.withConfig({
  shouldForwardProp: prop => prop !== '$left' && prop !== '$right',
})<{ $left?: boolean; $right?: boolean }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${({ $left }) => $left && 'left: 32px;'}
  ${({ $right }) => $right && 'right: 32px;'}
  font-size: 48px;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 10000;
`;

const CommentInputWrapper = styled.div<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1.5px solid ${({ $focused }) => ($focused ? '#A6C6FA' : '#D2D4D6')};
  border-radius: 12px;
  background-color: #fff;
  gap: 12px;
  width: 100%;
`;

const CommentInput = styled.textarea`
  flex: 1;
  resize: none;
  border: none;
  font-size: 14px;
  outline: none;
  color: #000;
  min-height: 44px;
  max-height: 100px;
  line-height: 1.4;
  background: transparent;

  &::placeholder {
    color: #c2c3c6;
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#BFD5F7' : '#3A5CAA')};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  border: none;
  height: 32px;
  min-width: 50px;
`;
