"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RecordCardMedium from "@/components/IndividualRecord/RecordCardMedium";
import { Text } from "@/components/atoms/Text";
import { AddRecordButton as RawAddRecordButton } from "@/components/atoms/AddRecordButton";
import { postApi } from "@/apis/postApi";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BackIcon } from "@/assets/icons/BackIcon";
import { theme } from "@/styles/theme";

interface EventData {
  name: string;
  startedAt: string;
  endedAt: string;
  relatedArtists: { id: string; name: string; imageUrl: string }[];
}

interface RecordItem {
  postId: number;
  profileImage: string;
  profileName: string;
  date: string;
  title: string;
  description: string;
  imageSrc: string;
  likes: number;
  comments: number;
}

const IndividualRecordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  /** ✅ URL 쿼리에서 groupId 추출 */
  const groupId = searchParams.get("groupId");

  const [event, setEvent] = useState<EventData | null>(null);
  const [eventLoading, setEventLoading] = useState(true);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [selected, setSelected] = useState<"LATEST" | "HOTTEST">("LATEST");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /** ✅ 날짜 포맷 (YYYY-MM-DD → YYYY년 M월 D일) */
  const formatKoreanDate = (isoDate?: string) => {
    if (!isoDate) return "";
    const [y, m, d] = isoDate.split("-").map(Number);
    if (!y || !m || !d) return isoDate;
    return `${y}년 ${m}월 ${d}일`;
  };

  /** ✅ 이벤트 정보 불러오기 (GET /events/{groupId}) */
  useEffect(() => {
    const fetchEvent = async () => {
      if (!groupId) return;
      setEventLoading(true);
      try {
        const res = await postApi.getEvent(groupId);
        console.log("📦 event detail:", res);

        const data = res.data?.data ?? res.data ?? res;
        setEvent({
          name: data.name ?? "이벤트 제목 없음",
          startedAt: data.startedAt ?? "",
          endedAt: data.endedAt ?? "",
          relatedArtists: data.relatedArtists ?? [],
        });
      } catch (err) {
        console.error("[getEvent error]", err);
        alert("이벤트 정보를 불러오지 못했습니다.");
      } finally {
        setEventLoading(false);
      }
    };

    fetchEvent();
  }, [groupId]);

  /** ✅ 기록 목록 불러오기 (GET /posts/{groupId}/all) */
  useEffect(() => {
    const fetchRecords = async () => {
      if (!groupId) return;
      try {
        const safePage = Math.max(currentPage, 1);
        const safeSort = selected === "HOTTEST" ? "HOTTEST" : "LATEST";

        const res = await postApi.getAllPosts({
          groupId,
          page: safePage,
          sortBy: safeSort,
        });

        console.log("📦 posts:", res);

        const { posts, totalPages } = res.data ?? res;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mapped = (posts || []).map((post: any) => ({
          postId: post.postId,
          profileImage: post.authorProfileImageUrl ?? "/default-profile.png",
          profileName: post.authorNickname,
          date: (post.createdAt || "").split("T")[0],
          title: post.title,
          description: post.content,
          imageSrc: post.mainImageUrl,
          likes: post.likeCount,
          comments: post.commentCount,
        }));

        setRecords(mapped);
        setTotalPages(totalPages ?? 1);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("[getAllPosts error]", err.response || err);
        alert("게시글 목록을 불러오지 못했습니다.");
      }
    };

    fetchRecords();
  }, [groupId, currentPage, selected]);

  /** ✅ 페이지네이션 컴포넌트 */
  const Pagination = () => {
    const visibleCount = 5;
    const half = Math.floor(visibleCount / 2);
    let start = Math.max(currentPage - half, 1);
    let end = start + visibleCount - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - visibleCount + 1, 1);
    }
    const pageNumbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );

    return (
      <PaginationWrapper>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          ‹
        </PageButton>
        {pageNumbers.map((page) => (
          <PageNumber
            key={page}
            $active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageNumber>
        ))}
        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          ›
        </PageButton>
      </PaginationWrapper>
    );
  };

  const artistName = event?.relatedArtists?.[0]?.name ?? "";
  const startedAtLabel = formatKoreanDate(event?.startedAt);
  const scheduleName = event?.name;

  /** ✅ groupId 없을 때 예외 처리 */
  if (!groupId) {
    return (
      <EmptyContainer>
        <Text typo="Body_2">잘못된 접근입니다. (groupId가 없습니다)</Text>
      </EmptyContainer>
    );
  }

  return (
    <PageWrapper>
      <Header>
        <TopSection>
          <DateText typo="H4">
            {eventLoading ? "로딩 중..." : startedAtLabel || "-"}
          </DateText>
          <BackButton onClick={() => router.back()}>
            <BackIcon />
            {artistName ? `${artistName} 데크로 돌아가기` : "뒤로가기"}
          </BackButton>
        </TopSection>
        <TitleText typo="H1">
          {eventLoading ? "불러오는 중..." : scheduleName || ""}
        </TitleText>
      </Header>

      <FilterGroup>
        <ToggleWrapper>
          <ToggleButtonGroup>
            <ToggleButton
              selected={selected === "LATEST"}
              onClick={() => {
                setSelected("LATEST");
                setCurrentPage(1);
              }}
            >
              최신순
            </ToggleButton>
            <ToggleButton
              selected={selected === "HOTTEST"}
              onClick={() => {
                setSelected("HOTTEST");
                setCurrentPage(1);
              }}
            >
              인기순
            </ToggleButton>
          </ToggleButtonGroup>
        </ToggleWrapper>

        <AddRecordButton
          variant="able"
          onClick={() => router.push(`/record-add?groupId=${groupId}`)}
        >
          마이타일 추가
        </AddRecordButton>
      </FilterGroup>

      {records.length > 0 ? (
        <>
          <CardGrid>
            {records.map((record) => (
              <Link
                key={record.postId}
                href={`/record-post/${record.postId}`}
                style={{ textDecoration: "none" }}
              >
                <RecordCardMedium {...record} />
              </Link>
            ))}
          </CardGrid>
          <Pagination />
        </>
      ) : (
        <EmptyContainer>
          <Text typo="Body_2">첫 번째 기록을 추가해보세요.</Text>
          <AddRecordButton
            variant="able"
            onClick={() => router.push(`/record-add?groupId=${groupId}`)}
          >
            마이타일 추가
          </AddRecordButton>
        </EmptyContainer>
      )}
    </PageWrapper>
  );
};

export default IndividualRecordPage;

/* 💅 스타일 동일 */
const PageWrapper = styled.div`
  margin: 0 auto;
  width: 950px;
`;

const Header = styled.div`
  display: flex;
  padding: 32px;
  margin-bottom: 24px;
  flex-direction: column;
  border-radius: 20px;
  border: 1.5px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_20};
  box-shadow: 0 4px 8px 0 rgba(128, 169, 242, 0.15);
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const DateText = styled(Text)`
  color: ${theme.palette.primary_700};
  margin-bottom: 12px;
`;

const TitleText = styled(Text)``;

const BackButton = styled.button`
  color: ${theme.palette.gray_500};
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_20};
  padding: 4px 12px;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  padding: 7px 8px;
  border-radius: 24px;
  border: 1px solid ${theme.palette.primary_500};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 4px 0 rgba(159, 198, 255, 0.15);
`;

const ToggleButton = styled.button<{ selected: boolean }>`
  border: none;
  background-color: ${({ selected }) => (selected ? "#C3DBFF" : "transparent")};
  color: ${({ selected }) => (selected ? "#0D2364" : "#000")};
  font-weight: 500;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
`;

const AddRecordButton = styled(RawAddRecordButton)`
  display: flex;
  align-items: center;
`;

const CardGrid = styled.div`
  display: grid;
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(467px, 1fr));
  gap: 16px;
`;

const EmptyContainer = styled.div`
  display: flex;
  height: 400px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 8px;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const PageNumber = styled.button<{ $active: boolean }>`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#C3DBFF" : "transparent")};
  color: ${({ $active }) => ($active ? "#0D2364" : "#666")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  cursor: pointer;
  font-size: 14px;
`;
