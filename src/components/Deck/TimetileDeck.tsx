"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import axios from "axios";

interface RelatedArtist {
  id: string;
  name: string;
  imageUrl: string;
}

interface EventData {
  eventId: number;
  groupId: string;
  name: string;
  description: string;
  source: string;
  relatedEvents: string[];
  relatedArtists: RelatedArtist[];
  activityTypes: string[];
  relatedMaterials: string[];
  startedAt: string;
  endedAt: string;
  contributorCount: number;
}

interface EventsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    events: Record<number, EventData[]>;
  };
}

interface TimetileDeckProps {
  year: number;
  artistId: string;
  mode: "view" | "edit" | "waiting";
}

export const TimetileDeck = ({ year, artistId, mode }: TimetileDeckProps) => {
  const [monthlyEvents, setMonthlyEvents] = useState<
    Record<number, EventData[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get<EventsResponse>(`/events/${artistId}/hot`, {
          params: { year: year.toString() },
        });

        if (res.data.isSuccess) {
          setMonthlyEvents(res.data.data.events);
        } else {
          console.error("API Error:", res.data.message);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [artistId, year]);

  if (loading) return <Container $mode={mode}>로딩 중...</Container>;

  return (
    <Container $mode={mode}>
      {Object.entries(monthlyEvents).map(([month, events]) => (
        <MonthWrapper key={month}>
          <MonthTitle>{month}월</MonthTitle>
          {events.map((event) => (
            <EventCard key={event.eventId}>
              <EventName>{event.name}</EventName>
              <EventDate>
                {event.startedAt} ~ {event.endedAt}
              </EventDate>
              {event.relatedArtists.length > 0 && (
                <RelatedArtists>
                  {event.relatedArtists.map((artist) => (
                    <ArtistImg
                      key={artist.id}
                      src={artist.imageUrl}
                      alt={artist.name}
                      title={artist.name}
                    />
                  ))}
                </RelatedArtists>
              )}
            </EventCard>
          ))}
        </MonthWrapper>
      ))}
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

const MonthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MonthTitle = styled.div`
  font-weight: bold;
  color: ${theme.palette.gray_900};
`;

const EventCard = styled.div`
  padding: 8px;
  border-radius: 8px;
  background: ${theme.palette.gray_100};
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EventName = styled.div`
  font-weight: 500;
`;

const EventDate = styled.div`
  font-size: 12px;
  color: ${theme.palette.gray_600};
`;

const RelatedArtists = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 4px;
`;

const ArtistImg = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;
