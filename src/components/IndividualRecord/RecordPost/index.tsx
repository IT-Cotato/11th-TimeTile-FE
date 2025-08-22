'use client';

import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { HeartIconFill } from '@/assets/icons/HeartIconFill';
import { ChatIcon } from '@/assets/icons/ChatIcon';
import { ScrapIcon1 } from '@/assets/icons/ScrapIcon1';
import { ScrapIconFill } from '@/assets/icons/ScrapIconFill';
import { RightArrowIcon1 } from '@/assets/icons/RightArrowIcon1';
import { LeftArrowIcon } from '@/assets/icons/LeftArrowIcon';
import { MoreIcon } from '@/assets/icons/MoreIcon';
import ScrapModal from '@/components/Scrap/ScrapModal';
import { postApi } from '@/apis/postApi';
import { scrapApi } from '@/apis/scrapApi';
import CommentsSection from '@/components/atoms/Comments';
import { useRouter } from 'next/navigation';

interface RecordPostProps {
  postId: number;
  profileImage: string;
  username: string; // 작성자 닉네임(authorNickname)
  currentNickname?: string; // 내 닉네임(nickname)
  roleImageUrl?: string;
  visibility: string;
  date: string; // YYYY-MM-DD
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  scrapCount?: number;
  commentsData?: any[]; // 외부에서 주입 시 사용 (없어도 됨)
  onImageClick?: (index: number) => void;
  onDeleteSuccess?: () => void;
}

const RecordPost = ({
  postId,
  profileImage,
  username,
  currentNickname,
  roleImageUrl,
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

  // 상세 데이터(표시용) 상태
  const [headerName, setHeaderName] = useState(username);
  const [headerProfile, setHeaderProfile] = useState(profileImage);
  const [theDate, setTheDate] = useState(date);
  const [imgs, setImgs] = useState(images);
  const [visibilityState, setVisibilityState] = useState(visibility);

  // 카운트/상태
  const [commentCount, setCommentCount] = useState<number>(
    (commentsData?.length ?? 0) || comments || 0,
  );
  const [likeCount, setLikeCount] = useState(likes);
  const [liked, setLiked] = useState(false); // 상세 스펙에 isLiked 없으므로 false 시작
  const [likeLoading, setLikeLoading] = useState(false);

  const [scrapped, setScrapped] = useState(false); // 내 스크랩 여부(아이콘 색칠)
  const [scrapCnt, setScrapCnt] = useState(scrapCount);
  const [scrapOpen, setScrapOpen] = useState(false);

  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState('');
  const maxReportLen = 200;

  const owned = (currentNickname ?? '') === (username ?? '');
  // 댓글 카운트(CommentsSection과 동기화)

  // 유틸
  const pick = (k: string) =>
    (typeof window === 'undefined' ? '' : localStorage.getItem(k) || '').trim();

  // ✅ 현재 로그인 유저 닉네임/프로필 (댓글 낙관적 렌더용)
  const currentUserName = pick('commenterNickname');
  const currentUserAvatarUrl = pick('commenterProfileImageUrl');

  // 날짜 포맷
  const formatDateYMD = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };

  // 상세 조회로 표시값/카운트 초기화
  React.useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        // ⬇️ 반환 모양이 AxiosResponse든, 이미 벗긴 DTO든 모두 커버
        const raw: any = await postApi.getPostDetail(postId);
        const d: any = raw?.data?.data ?? raw?.data ?? raw;

        setLikeCount(Number.isFinite(+d.likeCount) ? +d.likeCount : likes);
        setCommentCount(
          Number.isFinite(+d.commentCount) ? +d.commentCount : comments,
        );
        setScrapCnt(
          Number.isFinite(+d.scrapCount) ? +d.scrapCount : scrapCount,
        );

        // 헤더/본문/이미지/공개범위 동기화 (여기 변수명은 현재 파일의 state에 맞춰 사용)
        setHeaderName(d.authorNickname ?? headerName);
        setHeaderProfile(d.authorProfileImageUrl ?? headerProfile);
        setTheDate(formatDateYMD(d.createdAt ?? theDate));
        setImgs(Array.isArray(d.mediaUrls) ? d.mediaUrls : imgs);
        setVisibilityState(d.visibility ?? visibilityState);
      } catch (e) {
        console.warn('[getPostDetail failed]', e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // 현재 스크랩 여부(아이콘 색칠) 조회
  React.useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const st = await scrapApi.getScrapStatus(postId);
        const body = st?.data?.data ?? st?.data ?? {};
        const preset: number[] =
          body?.scrapFolderIds ??
          body?.folderIds ??
          (Array.isArray(body?.scrapFolders)
            ? body.scrapFolders.map((f: any) => Number(f?.id))
            : []) ??
          [];
        setScrapped(Array.isArray(preset) && preset.length > 0);
      } catch {
        // 조회 실패 시 기본 false 유지
        setScrapped(false);
      }
    })();
  }, [postId]);

  // 삭제
  const handleDelete = async () => {
    if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await postApi.deletePost(postId);
      alert('삭제되었습니다.');
      onDeleteSuccess ? onDeleteSuccess() : router.back();
    } catch (e: any) {
      alert(e?.response?.data?.message || e?.message || '삭제 실패');
    } finally {
      setMenuOpen(false);
    }
  };

  // ✅ 좋아요(낙관적 → API → 실패 롤백)
  const toggleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);
    const was = liked;

    // 낙관적 반영
    setLiked(!was);
    setLikeCount(c => (was ? Math.max(0, c - 1) : c + 1));

    try {
      if (was) await postApi.unlikePost(postId);
      else await postApi.likePost(postId);
    } catch (e) {
      // 실패 롤백
      setLiked(was);
      setLikeCount(c => (was ? c + 1 : Math.max(0, c - 1)));
      alert('좋아요 처리에 실패했습니다.');
    } finally {
      setLikeLoading(false);
    }
  };

  // 스크랩 토글은 모달에서 처리. 여기서는 아이콘 색칠만 관리
  const handleScrapSuccess = () => {
    if (!scrapped) {
      setScrapped(true); // ✅ 색칠
      setScrapCnt(c => c + 1);
    }
    setScrapOpen(false);
  };

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

  // 신고
  const handleReport = async () => {
    if (!reportText.trim()) {
      alert('신고 사유를 입력해주세요.');
      return;
    }
    alert('신고가 접수되었습니다.');
    setReportOpen(false);
    setReportText('');
    setMenuOpen(false);
  };

  return (
    <Wrapper>
      <Header>
        <Left>
          <Avatar src={headerProfile} alt="profile" />
          <InfoCol>
            <NameRow>
              <Text typo="Body_3">{headerName}</Text>
              {roleImageUrl && <RoleImg src={roleImageUrl} alt="role" />}
            </NameRow>
            <MetaRow>
              <Text typo="Caption_2">
                {visibilityState === 'PUBLIC' ? '전체공개' : '나만보기'}
              </Text>
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

      <Title typo="H4">{title}</Title>
      <Content typo="Body_3">{content}</Content>

      {imgs.length > 0 && (
        <ImageContainer>
          <ImageWrapper>
            <BlurOverlay position="left" />
            <BlurOverlay position="right" />
            <ImageGrid ref={imageGridRef}>
              {imgs.map((img, index) => (
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

      <MetaBar>
        <IconRow>
          <IconButton
            onClick={toggleLike}
            disabled={likeLoading}
            aria-pressed={liked}
          >
            {liked ? <HeartIconFill /> : <HeartIcon />}
          </IconButton>
          <Text typo="Body_3" color="Heart">
            {likeCount}
          </Text>
        </IconRow>

        <IconRow>
          <ChatIcon />
          <Text typo="Body_3" color="primary_500">
            {commentCount}
          </Text>
        </IconRow>

        <IconRow>
          <IconButton
            onClick={() => setScrapOpen(true)}
            aria-label="스크랩"
            aria-pressed={scrapped}
          >
            {scrapped ? <ScrapIconFill /> : <ScrapIcon1 />}
          </IconButton>
          <Text typo="Body_3" color="gray_700">
            {scrapCnt}
          </Text>
        </IconRow>

        <BarSpacer />
        <DateText typo="Caption_2">{theDate}</DateText>
      </MetaBar>

      <ScrapModal
        postId={postId}
        open={scrapOpen}
        onClose={() => setScrapOpen(false)}
        onSuccess={() => {
          setScrapped(true);
          setScrapCnt(c => c + 1);
          setScrapOpen(false);
        }}
      />
      <DividerHr />

      <CommentsSection postId={postId} currentUserName={currentUserName} />

      {isImageViewerOpen && !onImageClick && (
        <ImageViewerModal onClick={closeImageViewer}>
          <CloseBtn onClick={closeImageViewer}>✕</CloseBtn>
          <NavBtn
            $left
            onClick={e => {
              e.stopPropagation();
              setCurrentImageIndex(
                prev => (prev - 1 + imgs.length) % imgs.length,
              );
            }}
          >
            ‹
          </NavBtn>
          <NavBtn
            $right
            onClick={e => {
              e.stopPropagation();
              setCurrentImageIndex(prev => (prev + 1) % imgs.length);
            }}
          >
            ›
          </NavBtn>

          <ViewerContent onClick={e => e.stopPropagation()}>
            <ViewerImage
              src={imgs[currentImageIndex]}
              alt={`image-${currentImageIndex}`}
            />
          </ViewerContent>
        </ImageViewerModal>
      )}

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
  margin-left: auto;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const InfoCol = styled.div`
  display: inline-flex;
  gap: 8px;
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
  color: #87898c;
  gap: 8px;
  margin-top: 5px;
`;

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
  ${({ position }) => position}: 0;
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
  ${({ $left }) => $left && 'left: 32px;'}
  ${({ $right }) => $right && 'right: 32px;'}
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

const IconButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 0;
  padding: 4px;
  border-radius: 6px;
  &:focus-visible {
    outline: 2px solid rgba(0, 0, 0, 0.2);
    outline-offset: 2px;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
`;
