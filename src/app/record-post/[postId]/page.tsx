'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecordPost from '@/components/IndividualRecord/RecordPost';
import { Text } from '@/components/atoms/Text';
import { useParams } from 'next/navigation';
import { postApi } from '@/apis/postApi';
import ScrapModal from '@/components/Scrap/ScrapModal';
import CommentList from '@/components/Comments/CommentsList';

const IndividualRecordDetailPage = () => {
  const params = useParams<{ postId: string }>();
  const postId = params.postId;

  const [post, setPost] = useState<any>(null);

  // 스크랩
  const [scrapOpen, setScrapOpen] = useState(false);

  // 이미지 뷰어
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const res = await postApi.getPostDetail(postId);
        const data = res.data;
        const normalized = {
          ...data,
          mediaUrls:
            (Array.isArray(data.mediaUrls) &&
              data.mediaUrls.length > 0 &&
              data.mediaUrls) ||
            data.imageUrls ||
            data.images ||
            (data.mainImageUrl ? [data.mainImageUrl] : []),
        };
        setPost(normalized);
      } catch (e) {
        console.error('[post detail error]', e);
        alert('게시글을 불러오지 못했습니다.');
      }
    })();
  }, [postId]);

  const images: string[] = post?.mediaUrls ?? [];

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
              {post.createdAt?.split('T')[0]?.replace(/-/g, '.')}
            </DateText>
          </Header>

          <RecordPost
            profileImage={post.authorProfileImageUrl}
            username={post.authorNickname}
            visibility={post.visibility === 'PUBLIC' ? '전체공개' : '나만보기'}
            date={post.createdAt?.split('T')[0]}
            title={post.title}
            content={post.content}
            images={images}
            likes={post.likeCount}
            comments={post.commentCount}
            commentsData={[]}
            onImageClick={(idx: number) => {
              setCurrentIndex(idx);
              setIsViewerOpen(true);
            }}
          />
        </>
      )}

      {/* 이미지 뷰어 */}
      {isViewerOpen && images.length > 0 && (
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

      {/* 스크랩 모달 (닫을 때 해제하고 싶으면 onClose에서 setScrapped(false) 처리) */}
      <ScrapModal
        postId={postId}
        open={scrapOpen}
        onClose={() => setScrapOpen(false)}
      />
    </PageWrapper>
  );
};

export default IndividualRecordDetailPage;

/* ============ styles ============ */
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

/* 뷰어 */
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
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
  color: #fff;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
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
  color: #fff;
  border: none;
  cursor: pointer;
`;
