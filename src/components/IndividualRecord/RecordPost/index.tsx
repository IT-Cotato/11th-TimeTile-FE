"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import ScrapModal from "@/components/Scrap/ScrapModal";
import CommentsSection from "@/components/atoms/Comments";
import Header from "./parts/Header";
import ActionBar from "./parts/ActionBar";
import ImageCarousel from "./parts/ImageCarousel";
import ImageViewerModal from "./modals/ImageViewerModal";
import ReportModal from "./modals/ReportModal";
import PostMenu from "./modals/PostMenu";
import { usePostDetail } from "./hooks/usePostDetail";
import { useLike } from "./hooks/useLike";
import { useScrapStatus } from "./hooks/useScrapStatus";
interface RecordPostProps {
  postId: number;
  profileImage: string;
  username: string;
  currentNickname: string;
  role?: string;
  roleImageUrl?: string;
  visibility: string;
  date: string;
  title: string;
  content: string;
  images?: string[];
  likes: number;
  comments: number;
  scrapCount?: number;
  isMine?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commentsData?: any[];
  onImageClick?: (idx: number) => void;
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
    onDeleteSuccess,
  } = props;

  const imageGridRef = useRef<HTMLDivElement>(null);

  const pick = useCallback((k: string) => {
    if (typeof window === "undefined") return "";
    return (localStorage.getItem(k) || "").trim();
  }, []);

  const currentUserName = pick("commenterNickname");

  const detail = usePostDetail({
    postId,
    fallbacks: {
      likeCount: likes,
      commentCount: comments,
      scrapCount,
      username,
      profileImage,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      role: role as any,
      visibility,
      date,
      images,
    },
  });

  const owned = useMemo(
    () => (currentNickname ?? "") === (detail.headerName ?? username ?? ""),
    [currentNickname, detail.headerName, username]
  );

  const like = useLike({
    postId,
    initialLiked: detail.liked,
    initialLikeCount: detail.likeCount,
    onServerSync: detail.setLikeFromOutside,
  });

  const scrap = useScrapStatus({
    postId,
    initialScrapCount: detail.scrapCnt,
    onServerSync: detail.setScrapFromOutside,
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportText, setReportText] = useState("");

  const handleDelete = useCallback(async () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    try {
      await detail.deletePost();
      alert("삭제되었습니다.");
      onDeleteSuccess?.();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      alert("삭제 실패: " + e?.message);
    } finally {
      setMenuOpen(false);
    }
  }, [detail, onDeleteSuccess]);

  const handleReport = useCallback(async () => {
    if (!reportText.trim()) {
      alert("신고 사유를 입력하세요.");
      return;
    }
    await detail.reportPost(reportText.trim());
    alert("신고 접수 완료");
    setReportOpen(false);
    setReportText("");
    setMenuOpen(false);
  }, [reportText, detail]);

  return (
    <Wrapper>
      {/* Header + 메뉴 anchor를 하나의 박스로 묶음 */}
      <HeaderBox>
        <Header
          profileImage={detail.headerProfile}
          username={detail.headerName}
          role={detail.headerRole}
          roleImageUrl={roleImageUrl}
          visibility={detail.visibilityState}
          onOpenMenu={() => setMenuOpen((v) => !v)}
        />

        {/* ⭐ Header 바로 아래 위치 */}
        <MenuAnchor>
          <PostMenu
            open={menuOpen}
            owned={owned}
            onEdit={() => {
              alert("수정 기능 준비 중");
              setMenuOpen(false);
            }}
            onDelete={handleDelete}
            onReport={() => setReportOpen(true)}
            onClose={() => setMenuOpen(false)}
          />
        </MenuAnchor>
      </HeaderBox>

      <Title typo="H4">{title}</Title>
      <Content typo="Body_3">{content}</Content>

      {detail.imgs.length > 0 && (
        <ImageCarousel
          images={detail.imgs}
          onImageClick={(i) => {
            setImgIndex(i);
            setIsViewerOpen(true);
          }}
          containerRef={imageGridRef}
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

      <Divider />

      <CommentsSection postId={postId} currentUserName={currentUserName} />

      <ImageViewerModal
        open={isViewerOpen}
        images={detail.imgs}
        currentIndex={imgIndex}
        onClose={() => setIsViewerOpen(false)}
        onPrev={() => setImgIndex((i) => Math.max(0, i - 1))}
        onNext={() =>
          setImgIndex((i) => Math.min(detail.imgs.length - 1, i + 1))
        }
      />

      <ReportModal
        open={reportOpen}
        value={reportText}
        onChange={setReportText}
        onCancel={() => setReportOpen(false)}
        onSubmit={handleReport}
        maxLen={200}
      />
    </Wrapper>
  );
}

/* ---------------- styled-components ---------------- */

const Wrapper = styled.div`
  width: 904px;
  padding: 24px;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 0 0 1px #dcdcdc;
  position: relative;
`;

/* ⭐ Header + 메뉴를 묶는 박스 */
const HeaderBox = styled.div`
  position: relative;
`;

const MenuAnchor = styled.div`
  position: absolute;
  top: 48px; /* 기존 값 유지 */
  right: 16px; /* 기존 값 유지 */
  z-index: 50;
`;

const Title = styled(Text)`
  display: block;
  margin-top: 24px;
`;

const Content = styled(Text)`
  display: block;
  white-space: pre-wrap;
  margin-top: 24px;
  margin-bottom: 12px;
`;

const Divider = styled.hr`
  margin-top: 24px;
  margin-bottom: 24px;
  border: none;
  border-top: 1px solid #eee;
`;
