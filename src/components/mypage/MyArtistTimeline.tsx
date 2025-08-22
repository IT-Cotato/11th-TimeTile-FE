import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ArtistListHeader } from './ArtistListHeader';
import PaginationComponent from './PaginationComponent';
import { MyTileComponent } from './MyTileComponent';
import { usersApi } from '@/apis/usersApi';
import { theme } from '@/styles/theme';

const MOCK_ARTIST = [
  {
    isSuccess: true,
    code: 'COMMON001',
    message: '요청 성공',
    data: {
      artists: [
        {
          id: '6YVMFz59CuY7ngCxTxjpxE',
          name: 'aespa',
        },
        {
          id: '0du5cEVh5yTK9QJze8zA0C',
          name: 'Bruno Mars',
        },
      ],
    },
  },
];

const MOCK_DATA = [
  {
    isSuccess: true,
    code: 'COMMON001',
    message: '요청 성공',
    data: {
      events: [
        {
          eventId: 14,
          groupId: 'df596e5b-f827-49e7-8555-101e26267d9f',
          name: '연세대학교 AKARAKA 축제 무대',
          description:
            'Provident delinquo tener curiositas volva caecus tracto denego.',
          source: 'https://jagged-subexpression.us/',
          relatedEvents: [
            {
              groupId: '8ba5b9bf-e82c-4bac-bdbe-ec0e53fc02d2',
              name: 'Faker 1112',
            },
            {
              groupId: '781a8ce4-3897-409b-8500-5a9c084f68ec',
              name: 'Prem Customer Division Associate',
            },
          ],
          relatedArtists: [
            {
              id: '6HvZYsbFfjnjFrWF950C9d',
              name: 'NewJeans',
              imageUrl:
                'https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9',
            },
            {
              id: '6YVMFz59CuY7ngCxTxjpxE',
              name: 'aespa',
              imageUrl:
                'https://i.scdn.co/image/ab6761610000e5eb927f1260251e32135287e032',
            },
          ],
          activityTypes: ['팬사인회/기타', '팬사인회/기타'],
          relatedMaterials: ['https://miserly-gallery.info'],
          startedAt: '2025-04-11',
          endedAt: '2025-04-07',
          contributorCount: 1,
        },
      ],
      page: 3,
      size: 5,
      totalPages: 3,
      totalElements: 13,
      hasNext: false,
      hasPrevious: true,
      isLast: true,
    },
  },
];

interface RelatedArtist {
  id: string;
  name: string;
  imageUrl: string;
}

interface RelatedEvent {
  groupId: string;
  name: string;
}

interface Event {
  groupId: string;
  name: string;
  description: string;
  startedAt: string;
  relatedMaterials: string[];
  contributorCount: number;
  activityTypes: string[];
  relatedArtists: RelatedArtist[];
  relatedEvents: RelatedEvent[];
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
      try {
        const data = await usersApi.getMyEventsArtists();
        //const data = MOCK_ARTIST[0];
        if (data?.isSuccess && data.data.artists.length > 0) {
          setArtists(data.data.artists);
          setSelectedArtistId(data.data.artists[0].id);
        } else {
          setArtists([]);
          setSelectedArtistId(null);
        }
      } catch {
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
        //const data = MOCK_DATA[0];
        const data = await usersApi.getEventsByArtist(selectedArtistId, page);
        if (data?.isSuccess) {
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
        <NoDataMessage>기록한 타임타일이 없습니다.</NoDataMessage>
      ) : (
        <>
          <ArtistListHeader
            artists={artists}
            selectedId={selectedArtistId}
            onSelect={id => {
              setSelectedArtistId(id);
              setPage(1);
            }}
          />
          <EventList>
            {events.map(event => (
              <MyTileComponent
                key={event.groupId}
                groupId={event.groupId}
                name={event.name}
                description={event.description}
                startedAt={event.startedAt}
                relatedMaterials={event.relatedMaterials}
                contributorCount={event.contributorCount}
                activityTypes={event.activityTypes}
                relatedArtists={event.relatedArtists}
                relatedEvents={event.relatedEvents}
              />
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
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const NoDataMessage = styled.div`
  height: 360px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: ${theme.palette.gray_600};
`;
