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
import { useRouter, useSearchParams } from "next/navigation";
import { SearchHeader } from "@/components/Search/SearchResult/SearchHeader";
import { DeckResult } from "@/components/Search/SearchResult/DeckResult";
import { UserResult } from "@/components/Search/SearchResult/UserResult";
import { MyTileResult } from "@/components/Search/SearchResult/MyTileResult";
import { TimeTileResult } from "@/components/Search/SearchResult/TimeTileResult";

const SearchClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [artists, setArtists] = useState<SearchArtist[]>([]);
  const [users, setUsers] = useState<SearchUser[]>([]);
  const [results, setResults] = useState<SearchPost[]>([]);
  const [events, setEvents] = useState<SearchEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<SearchResponse | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

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

          const total =
            res.data.artistCount +
            res.data.userCount +
            res.data.postCount +
            res.data.eventCount;
          if (total === 0) {
            const suggestRes = await searchApi.getSuggestions(query);
            if (suggestRes.isSuccess) {
              setSuggestions(suggestRes.data.suggestions);
            }
          } else {
            setSuggestions([]);
          }
        } else {
          setResponse(null);
          setResults([]);
          setEvents([]);
          setArtists([]);
          setUsers([]);
          setSuggestions([]);
        }
      } catch (error) {
        console.error(error);
        setResults([]);
        setEvents([]);
        setSuggestions([]);
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
        {!loading && response && searchCount > 0 && (
          <>
            <SearchHeader searchCount={searchCount} />
            <DeckResult
              artistCount={response.artistCount}
              artists={artists}
              query={query}
            />
            <UserResult
              userCount={response.userCount}
              users={users}
              query={query}
            />
            <MyTileResult
              postCount={response.postCount}
              posts={results}
              highlightWord={query}
              query={query}
            />
            <TimeTileResult
              eventCount={response.eventCount}
              events={events}
              highlightWord={query}
              query={query}
            />
          </>
        )}
        {!loading && searchCount === 0 && suggestions.length > 0 && (
          <SearchHeader
            searchCount={searchCount}
            suggestion={suggestions[1]}
            onClickSuggestion={(word) =>
              router.push(`/search?query=${encodeURIComponent(word)}`)
            }
          />
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
  padding-bottom: 83px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;
