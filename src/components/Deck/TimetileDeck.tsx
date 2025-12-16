"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { deckApi } from "@/apis/deckApi";
import { DefaultDeck } from "./DefaultDeck";
import { ExpandDeck } from "./ExpandDeck";
import { Text } from "../atoms/Text";
import { EventData } from "@/model/components/Event";
import { UserRole } from "@/model/common/user";
import { DefaultTimeTileDeck } from "./DefaultTimeTileDeck";

interface TimetileDeckProps {
  year: number;
  artistId: string;
  mode: "view" | "edit" | "waiting";
  role: UserRole;
}

export const TimetileDeck = ({
  year,
  artistId,
  mode,
  role,
}: TimetileDeckProps) => {
  const [monthlyEvents, setMonthlyEvents] = useState<
    Record<number, EventData[]>
  >({});
  const [loading, setLoading] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState<Record<number, boolean>>(
    {}
  );
  const [hasMore, setHasMore] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const hotData = await deckApi.getHotEvents(artistId, year);

        const months = Object.keys(hotData.events).map(Number);
        const monthly: Record<number, EventData[]> = {};
        const more: Record<number, boolean> = {};

        for (const month of months) {
          monthly[month] = hotData.events[month];

          const fullData = await deckApi.getMoreEvents(artistId, year, month);
          monthly[month] = fullData.events;
          more[month] = fullData.hasNext;
        }

        setMonthlyEvents(monthly);
        setHasMore(more);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [artistId, year]);

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
              {expanded ? (
                <ExpandDeck
                  role={role}
                  mode={mode}
                  events={events}
                  onClose={() => toggleExpand(month)}
                />
              ) : (
                <DefaultTimeTileDeck
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
  /* padding: 8px 6px; */
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;
