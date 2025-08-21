'use client';

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { ChatIcon } from '@/assets/icons/ChatIcon';
import { ScrapIcon1 } from '@/assets/icons/ScrapIcon1';
import { RightArrowIcon1 } from '@/assets/icons/RightArrowIcon1';
import { LeftArrowIcon } from '@/assets/icons/LeftArrowIcon';
import { MoreIcon } from '@/assets/icons/MoreIcon';
import ScrapModal from '@/components/Scrap/ScrapModal';
import { postApi } from '@/apis/postApi';
import CommentsSection, { Comment } from '@/components/atoms/Comments';
import { useRouter } from 'next/navigation';

interface RecordPostProps {
  postId: number;
  authorId?: number;
  isMine?: boolean;
  roleImageUrl?: string; // 유저 등급/뱃지 이미지
  profileImage: string;
  username: string;
  visibility: string; // '전체공개' 등
  date: string; // 작성일(YYYY-MM-DD)
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  scrapCount?: number;
  commentsData: Comment[];
  onImageClick?: (index: number) => void;
  onDeleteSuccess?: () => void; // 삭제 후 콜백(선택)
}

const RecordPost = ({
  postId,
  isMine = false,
  authorId,
  roleImageUrl,
  profileImage,
  username,
  visibility,
  date,
  title,
  content,
  images = [],
  likes,
  comments,
  scrapCount = 0,
  commentsData = [],
  onImageClick,
  onDeleteSuccess,
}: RecordPostProps) => {
  const router = useRouter();
  const imageGridRef = useRef<HTMLDivElement>(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 더보기 메뉴/신고 모달
  const [menuOpen, setMenuOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const maxReportLen = 200;

  // 댓글 카운트(CommentsSection과 동기화)
  const [commentCount, setCommentCount] = useState<number>(
    commentsData.length || comments || 0,
  );

  const [scrapOpen, setScrapOpen] = React.useState(false);

  // 이미지 스크롤
  const scrollLeft = () =>
    imageGridRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  const scrollRight = () =>
    imageGridRef.current?.scrollBy({ left: 200, behavior: 'smooth' });

  // 이미지 뷰어
  const openImageViewer = (index: number) => {
    if (onImageClick) return onImageClick(index);
    setCurrentImageIndex(index);
    setIsImageViewerOpen(true);
  };
  const closeImageViewer = () => setIsImageViewerOpen(false);

  // 삭제
  const handleDelete = async () => {
    if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await postApi.deletePost(postId);
      alert('삭제되었습니다.');
      onDeleteSuccess ? onDeleteSuccess() : router.back();
    } catch (e: any) {
      alert(
        `삭제에 실패했습니다.\n${e?.response?.data?.message || e?.message || ''}`,
      );
    } finally {
      setMenuOpen(false);
    }
  };

  // 신고
  const handleReport = async () => {
    if (!reportText.trim()) {
      alert('신고 사유를 입력해주세요.');
      return;
    }
    // TODO: 신고 API 연동 (예: postApi.reportPost(postId, { reason: reportText }))
    alert('신고가 접수되었습니다.');
    setReportOpen(false);
    setReportText('');
    setMenuOpen(false);
  };

  // 컴포넌트 상단에서 owned 계산 (isMine이 undefined면 로컬스토리지로 보정)
  const getStoredMyId = () => {
    if (typeof window === 'undefined') return undefined;
    const keys = ['userId', 'id', 'memberId', 'authorId'];
    for (const k of keys) {
      const raw = localStorage.getItem(k);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        const n = Number(parsed ?? raw);
        if (Number.isFinite(n)) return n;
      } catch {
        const n = Number(raw);
        if (Number.isFinite(n)) return n;
      }
    }
    return undefined;
  };

  const myId = getStoredMyId();
  const owned =
    typeof isMine === 'boolean'
      ? isMine
      : authorId !== undefined &&
        myId !== undefined &&
        Number(authorId) === Number(myId);

  return (
    <Wrapper>
      {/* 헤더 : 좌(프로필/이름/등급/공개상태) - 우(더보기) */}
      <Header>
        <Left>
          <Avatar src={profileImage} alt="profile" />
          <InfoCol>
            <NameRow>
              <Text typo="Body_3">{username}</Text>
              {roleImageUrl && <RoleImg src={roleImageUrl} alt="role" />}
            </NameRow>
            <MetaRow>
              <Text typo="Caption_2">{visibility}</Text>
            </MetaRow>
          </InfoCol>
        </Left>

        <Right>
          <MoreBtn onClick={() => setMenuOpen(v => !v)} aria-label="더보기">
            <MoreIcon />
          </MoreBtn>
          {menuOpen && (
            <MenuCard onClick={e => e.stopPropagation()}>
              {owned ? (
                <>
                  <MenuItem
                    onClick={() => {
                      alert('수정하기는 준비 중입니다.');
                      setMenuOpen(false);
                    }}
                  >
                    수정하기
                  </MenuItem>
                  <MenuItem $danger onClick={handleDelete}>
                    삭제하기
                  </MenuItem>
                </>
              ) : (
                <MenuItem $danger onClick={() => setReportOpen(true)}>
                  신고하기
                </MenuItem>
              )}
            </MenuCard>
          )}
        </Right>
      </Header>

      {/* 본문 */}
      <Title typo="H4">{title}</Title>
      <Content typo="Body_3">{content}</Content>

      {/* 미디어 */}
      {images.length > 0 && (
        <ImageContainer>
          <ImageWrapper>
            <BlurOverlay position="left" />
            <BlurOverlay position="right" />
            <ImageGrid ref={imageGridRef}>
              {images.map((img, index) => (
                <PostImage
                  key={index}
                  src={img}
                  alt={`img-${index}`}
                  onClick={() => openImageViewer(index)}
                />
              ))}
            </ImageGrid>
          </ImageWrapper>

          <ArrowGroup>
            <ArrowButton onClick={scrollLeft} aria-label="왼쪽">
              <LeftArrowIcon />
            </ArrowButton>
            <ArrowButton onClick={scrollRight} aria-label="오른쪽">
              <RightArrowIcon1 />
            </ArrowButton>
          </ArrowGroup>
        </ImageContainer>
      )}

      {/* 하단 아이콘 바 + 작성일 */}
      <MetaBar>
        <IconRow>
          <HeartIcon />
          <Text typo="Body_3" color="Heart">
            {likes}
          </Text>
        </IconRow>
        <IconRow>
          <ChatIcon />
          <Text typo="Body_3" color="primary_500">
            {commentCount}
          </Text>
        </IconRow>
        <IconRow>
          <CapsuleBtn onClick={() => setScrapOpen(true)}>
            <ScrapIcon1 />
          </CapsuleBtn>
          <Text typo="Body_3" color="gray_700">
            {scrapCount}
          </Text>
        </IconRow>
        <BarSpacer />
        <DateText typo="Caption_2">{date}</DateText>
      </MetaBar>

      <ScrapModal
        postId={postId}
        open={scrapOpen}
        onClose={() => setScrapOpen(false)}
      />
      <DividerHr />

      {/* 댓글 섹션 */}
      <CommentsSection
        postId={postId}
        commentsData={[]}
        currentUserName={username}
        onCountChange={setCommentCount}
      />

      {/* 내부 이미지 뷰어 */}
      {isImageViewerOpen && !onImageClick && (
        <ImageViewerModal onClick={closeImageViewer}>
          <CloseBtn onClick={closeImageViewer}>✕</CloseBtn>
          <NavBtn
            $left
            onClick={e => {
              e.stopPropagation();
              setCurrentImageIndex(
                prev => (prev - 1 + images.length) % images.length,
              );
            }}
          >
            ‹
          </NavBtn>
          <NavBtn
            $right
            onClick={e => {
              e.stopPropagation();
              setCurrentImageIndex(prev => (prev + 1) % images.length);
            }}
          >
            ›
          </NavBtn>

          <ViewerContent onClick={e => e.stopPropagation()}>
            <ViewerImage
              src={images[currentImageIndex]}
              alt={`image-${currentImageIndex}`}
            />
          </ViewerContent>
        </ImageViewerModal>
      )}

      {/* 신고 모달 */}
      {reportOpen && (
        <ReportBackdrop onClick={() => setReportOpen(false)}>
          <ReportCard onClick={e => e.stopPropagation()}>
            <Text typo="H3">신고 사유를 작성해주세요.</Text>
            <ReportTextarea
              value={reportText}
              maxLength={maxReportLen}
              onChange={e => setReportText(e.target.value)}
              placeholder="신고 사유를 입력해주세요."
            />
            <ReportFooter>
              <Text typo="Caption_2">
                {reportText.length} / {maxReportLen}
              </Text>
              <ReportBtnRow>
                <CancelBtn onClick={() => setReportOpen(false)}>취소</CancelBtn>
                <PrimaryBtn onClick={handleReport}>신고하기</PrimaryBtn>
              </ReportBtnRow>
            </ReportFooter>
          </ReportCard>
        </ReportBackdrop>
      )}
    </Wrapper>
  );
};

export default RecordPost;

/* ============ styles ============ */
const Wrapper = styled.div`
  width: 904px;
  padding: 24px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 0 0 1px #d1d3d4;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Left = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Right = styled.div`
  position: relative;
  margin-left: auto; /* 가장 오른쪽 정렬 */
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const RoleImg = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  object-fit: cover;
`;
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
`;

const CapsuleBtn = styled.div``;

const MoreBtn = styled.button`
  all: unset;
  cursor: pointer;
  padding: 4px;
`;
const MenuCard = styled.div`
  position: absolute;
  right: 0;
  top: 28px;
  z-index: 20;
  min-width: 120px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;
const MenuItem = styled.button.withConfig({
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

const Title = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;
const Content = styled(Text)`
  white-space: pre-wrap;
`;

const ImageContainer = styled.div`
  display: flex;
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
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  cursor: pointer;
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
  ${({ position }) => position}:0;
  background: linear-gradient(
    to ${({ position }) => (position === 'left' ? 'right' : 'left')},
    white 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
`;

const MetaBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const BarSpacer = styled.div`
  flex: 1;
`;
const DateText = styled(Text)`
  color: #6b7280;
`;

const DividerHr = styled.hr`
  border: none;
  border-top: 1px solid #eee;
`;

const ImageViewerModal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 32px;
  left: 32px;
  color: #fff;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
`;
const NavBtn = styled.button.withConfig({
  shouldForwardProp: p => p !== '$left' && p !== '$right',
})<{ $left?: boolean; $right?: boolean }>`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  ${({ $left }) => $left && 'left: 32px;'} ${({ $right }) =>
    $right && 'right: 32px;'}
  font-size: 48px;
  background: none;
  color: #fff;
  border: none;
  cursor: pointer;
`;
const ViewerContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;
const ViewerImage = styled.img`
  width: 600px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
`;

/* 간단 북마크 아이콘 */
const BookmarkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"
      stroke="#3a5caa"
      strokeWidth="1.6"
      fill="none"
    />
  </svg>
);

/* 신고 모달 */
const ReportBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
const ReportCard = styled.div`
  width: 560px;
  max-width: 90vw;
  border-radius: 20px;
  background: #fff;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ReportTextarea = styled.textarea`
  width: 100%;
  min-height: 160px;
  border-radius: 12px;
  border: 1px solid #c3dbff;
  padding: 12px;
  resize: vertical;
`;
const ReportFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReportBtnRow = styled.div`
  display: flex;
  gap: 8px;
`;
const CancelBtn = styled.button`
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  background: #fff;
  cursor: pointer;
`;
const PrimaryBtn = styled.button`
  border-radius: 10px;
  border: 1px solid #80a9f2;
  padding: 8px 12px;
  background: #e9f1ff;
  color: #1f3e9a;
  cursor: pointer;
`;
