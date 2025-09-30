"use client";

import { searchApi } from "@/apis/searchApi";
import { DeckProfile } from "@/components/atoms/DeckProfile";
import PaginationComponent from "@/components/mypage/PaginationComponent";
import { SearchDetailHeader } from "@/components/Search/SearchDetail/SearchDetailHeader";
import { theme } from "@/styles/theme";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface Artist {
  id: string;
  name: string;
  imageUrl: string;
}

export const mockDecks = [
  {
    id: "deck1",
    name: "Bruno Mars",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
  },
  {
    id: "deck2",
    name: "Taylor Swift",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25aa",
  },
  {
    id: "deck3",
    name: "Adele",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25bb",
  },
  {
    id: "deck4",
    name: "Ed Sheeran",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25cc",
  },
  {
    id: "deck5",
    name: "BTS",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25dd",
  },
  {
    id: "deck6",
    name: "BLACKPINK",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25ee",
  },
  {
    id: "deck7",
    name: "Coldplay",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f25ff",
  },
  {
    id: "deck8",
    name: "Ariana Grande",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f2600",
  },
  {
    id: "deck9",
    name: "Maroon 5",
    imageUrl:
      "https://i.scdn.co/image/ab6761610000e5ebc36dd9eb55fb0db4911f2611",
  },
];

export default function SearchDeckPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [artists, setArtists] = useState<Artist[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  //   useEffect(() => {
  //     if (!query) return;

  //     setArtists(mockDecks);
  //     setTotalCount(mockDecks.length);
  //     setTotalPages(Math.ceil(mockDecks.length / 8));
  //   }, [query, page]);

  useEffect(() => {
    if (!query) return;

    const fetchArtists = async () => {
      try {
        const res = await searchApi.searchDecks(query, page);
        if (res.isSuccess && res.data) {
          setArtists(res.data.artists);
          setTotalCount(res.data.totalElements);
          setTotalPages(res.data.totalPages);
        } else {
          setArtists([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } catch (err) {
        console.error(err);
        setArtists([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    };

    fetchArtists();
  }, [query, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Wrapper>
        <SearchDetailHeader children="데크" searchCount={totalCount} />
        <PostWrapper>
          <ProfileRow>
            {artists.map((artist) => (
              <DeckProfile
                key={artist.id}
                name={artist.name}
                imageUrl={artist.imageUrl}
              />
            ))}
          </ProfileRow>
        </PostWrapper>
        {totalPages > 0 && (
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 119px 83px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1200px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const PostWrapper = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const ProfileRow = styled.div`
  width: 1136px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  justify-content: flex-start;
`;
