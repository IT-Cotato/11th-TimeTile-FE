import React, { useRef } from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { MoreIcon } from '@/assets/icons/MoreIcon';
import { RightArrowIcon } from '@/assets/icons/RightArrowIcon';
import { LeftArrowIcon } from '@/assets/icons/LeftArrowIcon';

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
  onImageClick?: (index: number) => void;
}

const RecordPost = ({
  profileImage,
  username,
  visibility,
  date,
  title,
  content,
  images,
  likes,
  comments,
  onImageClick,
}: RecordPostProps) => {
  const imageGridRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    imageGridRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    imageGridRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
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
                onClick={() => onImageClick?.(index)}
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

      <CommentInput placeholder="댓글을 입력해보세요." />
    </Wrapper>
  );
};

export default RecordPost;

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

const CommentInput = styled.input`
  border-radius: 10px;
  border: 1px solid #c2c3c6;
  background: #fff;
  padding: 16px;
  font-size: 14px;
  outline: none;
  width: 902px;
  height: 56px;
`;
