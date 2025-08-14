import { useEffect, useState } from "react";
import styled from "styled-components";
import { ArtistListHeader } from "./ArtistListHeader";
import PaginationComponent from "./PaginationComponent";
import { MyTileComponent } from "./MyTileComponent";
import { usersApi } from "@/apis/usersApi";
import { theme } from "@/styles/theme";

const MOCK_ARTIST = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      artists: [
        {
          id: "6YVMFz59CuY7ngCxTxjpxE",
          name: "aespa",
        },
        {
          id: "0du5cEVh5yTK9QJze8zA0C",
          name: "Bruno Mars",
        },
      ],
    },
  },
];

const MOCK_DATA = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      events: [
        {
          groupId: "239cb613-2f69-416e-97f7-364fb59c8343",
          name: "Prem Human Assurance Representative",
          description:
            "Tersus temperantia aedificium toties voluptatum truculenter perferendis culpo tempus.",
          startedAt: "2025-04-21",
          relatedMaterials: ["https://aged-pacemaker.com/"],
          contributorCount: 1,
        },
        {
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          name: "Corporate Branding Manager",
          description: "Canis vesica ventosus solitudo pax.",
          startedAt: "2025-04-11",
          relatedMaterials: ["https://snoopy-derby.info/"],
          contributorCount: 1,
        },
        {
          groupId: "1cedc506-3ad7-4845-a66a-a9b92152ae9a",
          name: "Brakus aaaassss",
          description:
            "Depereo ait crepusculum temeritas amplus decens titulus.",
          startedAt: "2025-04-11",
          relatedMaterials: ["https://gummy-analogy.info"],
          contributorCount: 1,
        },
        {
          groupId: "5e3d8ffe-1dd8-48e1-a5f7-241b97ac2874",
          name: "Faker",
          description: "Ultra contigo nemo voco subseco.",
          startedAt: "2025-04-11",
          relatedMaterials: ["https://gorgeous-tinderbox.us/"],
          contributorCount: 1,
        },
        {
          groupId: "8ba5b9bf-e82c-4bac-bdbe-ec0e53fc02d2",
          name: "Faker 1112",
          description: "Facilis cubitum synagoga sollicito ago civis carus.",
          startedAt: "2025-04-11",
          relatedMaterials: ["https://extra-large-arcade.com/"],
          contributorCount: 1,
        },
      ],
      page: 1,
      size: 5,
      totalPages: 3,
      totalElements: 13,
      hasNext: true,
      hasPrevious: false,
      isLast: false,
    },
  },
];

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
      // const data = MOCK_ARTIST[0];
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
        // const data = MOCK_DATA[0];
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
