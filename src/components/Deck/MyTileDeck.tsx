"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { postApi } from "@/apis/postApi";
import { DefaultDeck } from "./DefaultDeck";
import { MyExpandDeck } from "./MyExpandDeck";
import { Text } from "../atoms/Text";
import { EventData } from "@/model/components/Event";
import { UserRole } from "@/model/common/user";

interface PostItem {
  postId: number;
  groupId: string;
  title: string | null;
  content: string | null;
  mainImageUrl: string | null;
  createdAt: string;
  likeCount: number | null;
  commentCount: number | null;
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl: string | null;
}

interface MyTileDeckProps {
  year: number;
  artistId: string;
  mode: "view" | "edit" | "waiting";
  role: UserRole;
  groupId: string;
}

export const MyTileDeck = ({
  year,
  artistId,
  mode,
  role,
  groupId,
}: MyTileDeckProps) => {
  const [monthlyEvents, setMonthlyEvents] = useState<
    Record<number, EventData[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>(
    {}
  );
  const [hasMore, setHasMore] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const hotRes = await postApi.getHotPostsByYear(artistId, year);
        const postsByMonth = hotRes?.data?.posts ?? hotRes?.posts ?? {};
        const months = Object.keys(postsByMonth).map(Number);

        const monthly: Record<number, EventData[]> = {};
        const more: Record<number, boolean> = {};

        for (const month of months) {
          const posts = postsByMonth[month] ?? [];

          // groupId로 묶기
          const grouped: Record<string, PostItem[]> = {};
          posts.forEach((post) => {
            if (!grouped[post.groupId]) grouped[post.groupId] = [];
            grouped[post.groupId].push(post);
          });

          // 각 group별로 event 정보 가져오기
          const events: EventData[] = await Promise.all(
            Object.entries(grouped).map(async ([groupId, groupPosts]) => {
              let eventTitle = "스케줄명 불러오는 중...";
              try {
                const eventRes = await postApi.getEvent(groupId);
                // 서버 구조에 따라 eventRes.data 또는 eventRes.event 로 확인 필요
                eventTitle =
                  eventRes?.data?.event?.name ||
                  eventRes?.data?.name ||
                  eventRes?.event?.name ||
                  "제목 없음";
              } catch (e) {
                console.warn(`event fetch 실패 (${groupId})`, e);
              }

              const representative = groupPosts[0];

              return {
                eventId: representative.postId,
                groupId,
                name: eventTitle, // 이제 스케줄 제목
                source:
                  representative.mainImageUrl ||
                  "/images/default_thumbnail.png",
                description: representative.content || "내용이 없습니다.",
                startedAt: representative.createdAt,
                endedAt: representative.createdAt,
                relatedMaterials: groupPosts.map((p) => ({
                  postId: p.postId,
                  imageUrl: p.mainImageUrl,
                  title: p.title,
                  description: p.content,
                  likes: p.likeCount ?? 0,
                  comments: p.commentCount ?? 0,
                })),
                contributorCount: groupPosts.length,
                activityTypes: [],
                relatedArtists: [],
                relatedEvents: [],
              };
            })
          );

          monthly[month] = events;
          more[month] = events.length > 1;
        }

        setMonthlyEvents(monthly);
        setHasMore(more);
      } catch (e) {
        console.error("MyTileDeck fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [artistId, year, groupId]);

  const toggleExpand = (month: number) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  if (loading) return <Container $mode={mode}>로딩 중...</Container>;

  return (
    <Container $mode={mode}>
      {Object.entries(monthlyEvents).map(([monthStr, events]) => {
        const month = Number(monthStr);
        const expanded = expandedMonths[month];

        return (
          <ScheduleWrapper key={month}>
            <MonthTitle>
              <Text typo="H2">{month}월</Text>
            </MonthTitle>
            <Wrapper>
              {/* 펼쳤을 때는 MyExpandDeck */}
              {expanded ? (
                <MyExpandDeck
                  role={role}
                  mode={mode}
                  events={events}
                  onClose={() => toggleExpand(month)}
                />
              ) : (
                <DefaultDeck
                  events={events}
                  showMoreButton={true}
                  onMoreClick={() => toggleExpand(month)}
                />
              )}
            </Wrapper>
          </ScheduleWrapper>
        );
      })}
    </Container>
  );
};

// 스타일
const Container = styled.div<{ $mode: "view" | "edit" | "waiting" }>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  width: 950px;
  border-radius: ${({ $mode }) =>
    $mode === "edit" ? "20px" : "0 0 20px 20px"};
  border-top: ${({ $mode }) =>
    $mode === "edit" ? `1px solid ${theme.palette.primary_300}` : "none"};
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const ScheduleWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 33px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

const MonthTitle = styled.div`
  display: flex;
  width: 52px;
  height: 49px;
  padding: 8px 6px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
