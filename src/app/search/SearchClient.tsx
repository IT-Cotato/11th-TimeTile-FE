"use client";

import { useEffect, useState } from "react";
import { searchApi } from "@/apis/searchApi";
import styled from "styled-components";
import {
  SearchArtist,
  SearchEvent,
  SearchPost,
  SearchResponse,
  SearchUser,
} from "@/model/components/SearchType";
import { theme } from "@/styles/theme";
import { useSearchParams } from "next/navigation";
import { SearchHeader } from "@/components/Search/SearchResult/SearchHeader";
import { DeckResult } from "@/components/Search/SearchResult/DeckResult";
import { UserResult } from "@/components/Search/SearchResult/UserResult";
import { MyTileResult } from "@/components/Search/SearchResult/MyTileResult";

const SearchClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [artists, setArtists] = useState<SearchArtist[]>([]);
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [results, setResults] = useState<SearchPost[]>([]);
  const [events, setEvents] = useState<SearchEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SearchResponse | null>(null);

  const searchCount = response
    ? response.artistCount +
      response.userCount +
      response.postCount +
      response.eventCount
    : 0;

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await searchApi.searchAll(query);
        if (res.isSuccess && res.data) {
          setResponse(res.data);
          setResults(res.data.posts);
          setEvents(res.data.events);
          setArtists(res.data.artists);
          setUsers(res.data.users);
          console.log(res.data);
        } else {
          setResults([]);
          setEvents([]);
          setArtists([]);
          setUsers([]);
        }
      } catch (error) {
        console.error(error);
        setResults([]);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <Container>
      <Wrapper>
        {loading && <p>로딩 중...</p>}
        {!loading && response && (
          <>
            <SearchHeader searchCount={searchCount} />
            <DeckResult artistCount={response.artistCount} artists={artists} />
            <UserResult userCount={response.userCount} users={users} />
            <MyTileResult
              postCount={response.postCount}
              posts={results}
              highlightWord={query}
            />
          </>
        )}
      </Wrapper>
    </Container>
  );
};

export default SearchClient;

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 100vh;
  padding: 0 119px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const ResultItem = styled.div`
  width: 100%;
  padding: 32px;
  border: 1px solid ${theme.palette.primary_300};
  border-radius: 20px;
  margin-bottom: 24px;
  background: ${theme.palette.primary_20};
`;

const EventItem = styled(ResultItem)``;
