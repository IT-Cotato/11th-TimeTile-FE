"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import ScrapModal from "@/components/Scrap/ScrapModal";
import CommentsSection from "@/components/atoms/Comments";
import { useRouter } from "next/navigation";
import { UserRole } from "@/model/common/user";

import Header from "./parts/Header";
import ActionBar from "./parts/ActionBar";
import ImageCarousel from "./parts/ImageCarousel";
import ImageViewerModal from "./modals/ImageViewerModal";
import ReportModal from "./modals/ReportModal";
import PostMenu from "./modals/PostMenu";

import { usePostDetail } from "./hooks/usePostDetail";
import { useLike } from "./hooks/useLike";
import { useScrapStatus } from "./hooks/useScrapStatus";

export interface RecordPostProps {
  postId: number;
  profileImage: string;
  username: string; // 작성자 닉네임
  currentNickname?: string; // 내 닉네임
  role?: UserRole; // 작성자 역할(선택)
  roleImageUrl?: string; // 아이콘 이미지 fallback(선택)
  visibility: string;
  date: string; // YYYY-MM-DD or ISO
  title: string;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  scrapCount?: number;
  commentsData?: any[];
  onImageClick?: (index: number) => void;
  onDeleteSuccess?: () => void;
}

export default function RecordPost(props: RecordPostProps) {
  const {
    postId,
    profileImage,
    username,
    currentNickname,
    role,
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
  } = props;

  const imageGridRef = useRef<HTMLDivElement>(null);

  // SSR-safe localStorage pick
  const pick = useCallback((k: string) => {
    if (typeof window === "undefined") return "";
    return (localStorage.getItem(k) || "").trim();
  }, []);
  const currentUserName = pick("commenterNickname");

  // 상세 데이터 로딩
  const detail = usePostDetail({
    postId,
    fallbacks: {
      likeCount: likes,
      commentCount: (commentsData?.length ?? 0) || comments || 0,
      scrapCount: scrapCount,
      username,
      profileImage,
      role,
      visibility,
      date,
      images,
    },
  });

  const owned = useMemo(
    () => (currentNickname ?? "") === (detail.headerName ?? username ?? ""),
    [currentNickname, detail.headerName, username]
  );

  // 좋아요 훅
  const like = useLike({
    postId,
    initialLiked: detail.liked,
    initialLikeCount: detail.likeCount,
    onServerSync: detail.setLikeFromOutside, // 상세 재로딩 없이 값만 동기화
  });

  // 스크랩 훅
  const scrap = useScrapStatus({
    postId,
    initialScrapCount: detail.scrapCnt,
    onServerSync: detail.setScrapFromOutside,
  });

  // 메뉴/모달 UI 상태
  const [menuOpen, setMenuOpen] = useState(false);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");
  const maxReportLen = 200;

  // 삭제
  const handleDelete = useCallback(async () => {
    if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
    try {
      await detail.deletePost();
      alert("삭제되었습니다.");
      onDeleteSuccess?.();
    } catch (e: any) {
      alert(e?.response?.data?.message || e?.message || "삭제 실패");
    } finally {
      setMenuOpen(false);
    }
  }, [detail, onDeleteSuccess]);

  // 이미지 뷰어
  const openImageViewer = useCallback(
    (index: number) => {
      if (onImageClick) return onImageClick(index);
      setCurrentImageIndex(index);
      setIsImageViewerOpen(true);
    },
    [onImageClick]
  );
  const closeImageViewer = useCallback(() => setIsImageViewerOpen(false), []);

  // Carousel 스크롤
  const scrollLeft = useCallback(
    () => imageGridRef.current?.scrollBy({ left: -200, behavior: "smooth" }),
    []
  );
  const scrollRight = useCallback(
    () => imageGridRef.current?.scrollBy({ left: 200, behavior: "smooth" }),
    []
  );

  // 신고
  const handleReport = useCallback(async () => {
    if (!reportText.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }
    await detail.reportPost(reportText.trim());
    alert("신고가 접수되었습니다.");
    setReportOpen(false);
    setReportText("");
    setMenuOpen(false);
  }, [detail, reportText]);

  return (
    <Wrapper>
      <Header
        profileImage={detail.headerProfile}
        username={detail.headerName}
        role={detail.headerRole}
        roleImageUrl={roleImageUrl}
        visibility={detail.visibilityState}
        onOpenMenu={() => setMenuOpen((v) => !v)}
      />

      <Title typo="H4">{title}</Title>
      <Content typo="Body_3">{content}</Content>

      {detail.imgs.length > 0 && (
        <ImageCarousel
          images={detail.imgs}
          onImageClick={openImageViewer}
          containerRef={imageGridRef}
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
        />
      )}

      <ActionBar
        likeCount={like.likeCount}
        liked={like.liked}
        likeLoading={like.likeLoading}
        commentCount={detail.commentCount}
        scrapCount={scrap.scrapCnt}
        dateText={detail.theDate}
        onToggleLike={like.toggleLike}
        onOpenScrap={() => scrap.setScrapOpen(true)}
      />

      <ScrapModal
        postId={postId}
        open={scrap.scrapOpen}
        onClose={() => scrap.setScrapOpen(false)}
        onSuccess={scrap.handleScrapSuccess}
      />

      <DividerHr />

      <CommentsSection postId={postId} currentUserName={currentUserName} />

      {/* 메뉴 (Header 기준 anchor가 필요하다면 Header 내부로 옮겨도 됨) */}
      <MenuAnchor>
        <PostMenu
          open={menuOpen}
          owned={owned}
          onEdit={() => {
            alert("수정하기는 준비 중입니다.");
            setMenuOpen(false);
          }}
          onDelete={handleDelete}
          onReport={() => setReportOpen(true)}
          onClose={() => setMenuOpen(false)}
        />
      </MenuAnchor>

      {/* 이미지 뷰어 */}
      <ImageViewerModal
        open={isImageViewerOpen && !onImageClick}
        images={detail.imgs}
        currentIndex={currentImageIndex}
        onClose={closeImageViewer}
        onPrev={() =>
          setCurrentImageIndex(
            (prev) => (prev - 1 + detail.imgs.length) % detail.imgs.length
          )
        }
        onNext={() =>
          setCurrentImageIndex((prev) => (prev + 1) % detail.imgs.length)
        }
      />

      {/* 신고 모달 */}
      <ReportModal
        open={reportOpen}
        value={reportText}
        maxLen={maxReportLen}
        onChange={setReportText}
        onCancel={() => setReportOpen(false)}
        onSubmit={handleReport}
      />
    </Wrapper>
  );
}

// ===== styles (컨테이너 전용, 나머지는 각 파일에 co-location)
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

const Title = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Content = styled(Text)`
  white-space: pre-wrap;
`;

const DividerHr = styled.hr`
  border: none;
  border-top: 1px solid #eee;
`;

// 메뉴는 Header의 더보기 버튼 오른쪽 상단 기준으로 뜨므로 절대 위치 기준점
const MenuAnchor = styled.div`
  position: relative;
`;
