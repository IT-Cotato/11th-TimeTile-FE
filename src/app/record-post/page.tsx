'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import RecordPost from '@/components/IndividualRecord/RecordPost';
import { Text } from '@/components/atoms/Text';

const IndividualRecordPage = () => {
  const images = [
    '/record-image.png',
    '/record-image.png',
    '/record-image.png',
  ];

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <PageWrapper>
      <Header>
        <LeftSection>
          <SingerText typo="Body_2">에스파</SingerText>·
          <TitleText typo="Body_2">
            멜론뮤직어워드(<strong>MMA</strong>) 참석
          </TitleText>
        </LeftSection>
        <DateText typo="Body_3">2025.05.20</DateText>
      </Header>

      <RecordPost
        profileImage="/profile-default.png"
        username="레드벨벳멤버"
        visibility="공개중"
        date="2025.05.20"
        title="트리플에스트리플에스트리플..."
        content={`다만 MY WORLD에서는 SM엔터테인먼트...\n\n잠깐 REAL WORLD로 돌아와 휴식을 취하는 콘셉트라고 한다.`}
        images={images}
        likes={99}
        comments={99}
        onImageClick={(idx: number) => {
          setCurrentIndex(idx);
          setIsViewerOpen(true);
        }}
      />

      {isViewerOpen && (
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
    </PageWrapper>
  );
};

export default IndividualRecordPage;

const PageWrapper = styled.div`
  margin: 0 auto;
  width: 952px;
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
