"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { postApi } from "@/apis/postApi";
import { DefaultDeck } from "./DefaultDeck";
import { MyExpandDeck } from "./MyExpandDeck";
import { Text } from "../atoms/Text";
import { DeckEventData } from "@/model/components/DeckEvent";
import { UserRole } from "@/model/common/user";
import { PostDTO } from "@/model/dto/post";
import { EventDTO } from "@/model/dto/event";
import { HotYearResponse } from "@/model/dto/hotYear";

interface MyTileDeckProps {
  year: number;
  artistId: string;
  mode: "view" | "edit" | "waiting";
  role: UserRole;
}

export const MyTileDeck = ({ year, artistId, mode, role }: MyTileDeckProps) => {
  const [monthlyEvents, setMonthlyEvents] = useState<
    Record<number, DeckEventData[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>(
    {}
  );

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const hotRes: HotYearResponse = await postApi.getHotPostsByYear(
          artistId,
          year
        );

        const postsByMonth = hotRes.data.posts;

        const monthly: Record<number, DeckEventData[]> = {};

        for (const [month, posts] of Object.entries(postsByMonth)) {
          const grouped = posts.reduce<Record<string, PostDTO[]>>(
            (acc, post) => {
              acc[post.groupId] ??= [];
              acc[post.groupId].push(post);
              return acc;
            },
            {}
          );

          const events: DeckEventData[] = await Promise.all(
            Object.entries(grouped).map(async ([groupId, groupPosts]) => {
              const eventRes = await postApi.getEvent(groupId);
              const event: EventDTO = eventRes.data;

              return {
                eventId: groupId,
                groupId,
                name: event.name,
                description: event.description,
                source: event.source,
                startedAt: event.startedAt,
                endedAt: event.endedAt,
                activityTypes: event.activityTypes,
                relatedArtists: event.relatedArtists,
                relatedEvents: event.relatedEvents,
                relatedMaterials: groupPosts.map((post) => ({
                  postId: post.postId,
                  imageUrl: post.mainImageUrl,
                  title: post.title,
                  description: post.content,
                  likes: post.likeCount,
                  comments: post.commentCount,
                })),
                contributorCount: groupPosts.length,
              };
            })
          );

          monthly[Number(month)] = events;
        }

        setMonthlyEvents(monthly);
      } catch (e) {
        console.error("MyTileDeck fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [artistId, year]);

  const toggleExpand = (month: number) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  if (loading) {
    return <Container $mode={mode}>로딩 중...</Container>;
  }

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
              {expanded ? (
                <MyExpandDeck
                  role={role}
                  events={events}
                  onClose={() => toggleExpand(month)}
                />
              ) : (
                <DefaultDeck
                  events={events}
                  showMoreButton
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
