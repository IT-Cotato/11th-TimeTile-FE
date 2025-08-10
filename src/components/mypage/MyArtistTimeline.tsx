import { useEffect, useState } from "react";
import styled from "styled-components";
import { ArtistListHeader } from "./ArtistListHeader";
import PaginationComponent from "./PaginationComponent";
import { MyTileComponent } from "./MyTileComponent";
import { usersApi } from "@/apis/usersApi";
import { theme } from "@/styles/theme";

interface Event {
  groupId: string;
  name: string;
  description: string;
  startedAt: string;
  relatedMaterials: string[];
  contributorCount: number;
}

interface Artist {
  id: string;
  name: string;
}

export const MyArtistTimeline = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [events, setEvents] = useState<Event[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchArtists = async () => {
      const data = await usersApi.getMyEventsArtists();
      if (data?.isSuccess && data.data.artists.length > 0) {
        setArtists(data.data.artists);
        setSelectedArtistId(data.data.artists[0].id);
      } else {
        setArtists([]);
        setSelectedArtistId(null);
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    if (!selectedArtistId) {
      setEvents([]);
      setTotalPages(1);
      return;
    }

    const loadEvents = async () => {
      try {
        const data = await usersApi.getEventsByArtist(selectedArtistId, page);
        if (data && data.isSuccess) {
          setEvents(data.data.events);
          setTotalPages(data.data.totalPages);
        } else {
          setEvents([]);
          setTotalPages(1);
        }
      } catch {
        setEvents([]);
        setTotalPages(1);
      }
    };
    loadEvents();
  }, [selectedArtistId, page]);

  return (
    <Container>
      {artists.length === 0 || !selectedArtistId ? (
        <NoDataMessage>기록한 아티스트 타임라인이 없습니다.</NoDataMessage>
      ) : (
        <>
          <ArtistListHeader
            artists={artists}
            selectedId={selectedArtistId}
            onSelect={(id) => {
              setSelectedArtistId(id);
              setPage(1);
            }}
          />
          <EventList>
            {events.map((event) => (
              <MyTileComponent key={event.groupId} {...event} />
            ))}
          </EventList>
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EventList = styled.div`
  margin-top: 24px;
  display: flex;
  width: 950px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 16px;
  border-radius: 20px;
  border: 1px solid var(--Primary-300, #c3dbff);
  background: var(--Primary-20, #fbfdff);
`;

const NoDataMessage = styled.div`
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${theme.palette.gray_600};
`;
