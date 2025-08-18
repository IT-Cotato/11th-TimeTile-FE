'use client';

import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { MoreIcon } from '@/assets/icons/MoreIcon';
import { RightArrowIcon } from '@/assets/icons/RightArrowIcon';
import { LeftArrowIcon } from '@/assets/icons/LeftArrowIcon';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  likes: number;
}

interface RecordPostProps {
  profileImage: string;
  username: string;
  visibility: string;
  date: string;
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  commentsData: Comment[];
  isScrapped?: boolean;
  onImageClick?: (index: number) => void;
}

const RecordPost = ({
  profileImage,
  username,
  visibility,
  date,
  title,
  content,
  images = [],
  likes,
  comments,
  commentsData = [],
  onImageClick,
}: RecordPostProps) => {
  const imageGridRef = useRef<HTMLDivElement>(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isScrapped, setIsScrapped] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentsList, setCommentsList] = useState<Comment[]>(commentsData);

  const [scrapped, setScrapped] = useState(false);

  const scrollLeft = () => {
    imageGridRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    imageGridRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  const openImageViewer = (index: number) => {
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = () => {
    setIsImageViewerOpen(false);
  };

  const toggleScrap = () => {
    setIsScrapped(prev => !prev); // 스크랩 상태 토글
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: '유저닉네임',
      content: commentText,
      createdAt: '2025.05.25',
      likes: 0,
    };

    setCommentsList(prev => [newComment, ...prev]);
    setCommentText('');
  };

  return (
    <Wrapper>
      <Header>
        <Profile>
          <ProfileImg src={profileImage} />
          <Text typo="Body_3">{username}</Text>
          <Text typo="Caption_2">{visibility}</Text>
        </Profile>
        <MoreIcon />
      </Header>

      <Title typo="H4">{title}</Title>
      <Content typo="Body_3">{content}</Content>

      <ImageContainer>
        <ImageWrapper>
          <BlurOverlay position="left" />
          <BlurOverlay position="right" />
          <ImageGrid ref={imageGridRef}>
            {images.map((img, index) => (
              <PostImage
                key={index}
                src={img}
                onClick={() => openImageViewer(index)}
              />
            ))}
          </ImageGrid>
        </ImageWrapper>

        <ArrowGroup>
          <ArrowButton onClick={scrollLeft}>
            <LeftArrowIcon />
          </ArrowButton>
          <ArrowButton onClick={scrollRight}>
            <RightArrowIcon />
          </ArrowButton>
        </ArrowGroup>
      </ImageContainer>

      <MetaInfo>
        <Text typo="Body_3">❤️ {likes}</Text>
        <Text typo="Body_3">💬 {comments}</Text>
        <Toolbar>
          {/* <ScrapBtn
            $filled={scrapped}
            onClick={() => {
              setScrapOpen(true);
              setScrapped(true); // 모달 띄우면서 filled로
            }}
          >
            {scrapped ? '스크랩됨' : '스크랩'}
          </ScrapBtn> */}
        </Toolbar>
      </MetaInfo>

      <Divider />

      <Text typo="Body_2">{commentsList.length}개의 댓글</Text>
      <CommentList>
        {commentsList.map(comment => (
          <CommentItem key={comment.id}>
            <CommentTop>
              <Text typo="Body_3">{comment.author}</Text>
              <Text typo="Caption_2" color="gray_600">
                {comment.createdAt}
              </Text>
            </CommentTop>
            <Text typo="Body_2">{comment.content}</Text>
          </CommentItem>
        ))}
      </CommentList>

      {/* 댓글 입력창 */}
      <CommentInputWrapper>
        <CommentInput
          value={commentText}
          onChange={e => setCommentText(e.target.value)}
          placeholder="댓글을 입력해보세요."
        />
        <SubmitButton
          onClick={handleCommentSubmit}
          disabled={!commentText.trim()}
        >
          등록
        </SubmitButton>
      </CommentInputWrapper>

      {/* 이미지 뷰어 모달 */}
      {isImageViewerOpen && (
        <ImageViewerModal onClick={closeImageViewer}>
          <CloseButton onClick={closeImageViewer}>✕</CloseButton>
          <NavButton
            $left
            onClick={e => {
              e.stopPropagation();
              setCurrentImageIndex(
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
              setCurrentImageIndex(prev => (prev + 1) % images.length);
            }}
          >
            ›
          </NavButton>
          {/* <ModalContent onClick={e => e.stopPropagation()}>
            <ImageFull src={images[currentImageIndex]} />
          </ModalContent> */}
        </ImageViewerModal>
      )}
    </Wrapper>
  );
};

export default RecordPost;

/* ================= styles ================= */

const Wrapper = styled.div`
  width: 950px;
  padding: 24px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 0 0 1px #d1d3d4;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Profile = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Title = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Content = styled(Text)`
  white-space: pre-wrap;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
`;

const ImageGrid = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 8px 0;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostImage = styled.img`
  width: 274px;
  height: 232px;
  object-fit: contain;
  border-radius: 8px;
  flex-shrink: 0;
`;

const ArrowGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-left: 8px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
`;

const BlurOverlay = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  ${({ position }) => position}: 0;
  background: linear-gradient(
    to ${({ position }) => (position === 'left' ? 'right' : 'left')},
    white 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 16px;
`;

const ScrapButton = styled.button`
  border: none;
  background: none;
  color: #3a5caa;
  font-weight: bold;
  cursor: pointer;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #d2d4d6;
  border-radius: 10px;
  font-size: 14px;
`;

const SubmitButton = styled.button<{ disabled?: boolean }>`
  background: ${({ disabled }) => (disabled ? '#BFD5F7' : '#5B86E5')};
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const ImageViewerModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 32px;
  left: 32px;
  color: white;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
`;

const ImageViewerContent = styled.div`
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

const NavButton = styled.button.withConfig({
  shouldForwardProp: p => p !== '$left' && p !== '$right',
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

const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 12px 0 8px;
`;

const ScrapBtn = styled.button.withConfig({
  shouldForwardProp: p => p !== '$filled',
})<{ $filled?: boolean }>`
  border-radius: 10px;
  padding: 6px 10px;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${({ $filled }) => ($filled ? '#1F3E9A' : '#c9d8ff')};
  background: ${({ $filled }) => ($filled ? '#1F3E9A' : '#eef4ff')};
  color: ${({ $filled }) => ($filled ? '#fff' : '#1f3e9a')};
`;
