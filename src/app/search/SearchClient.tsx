"use client";

import { useEffect, useState } from "react";
import { searchApi } from "@/apis/searchApi";
import styled from "styled-components";
import { SearchEvent, SearchPost } from "@/model/components/SearchType";
import { theme } from "@/styles/theme";

interface SearchProps {
  query: string;
}

const SearchClient = ({ query }: SearchProps) => {
  const [results, setResults] = useState<SearchPost[]>([]);
  const [events, setEvents] = useState<SearchEvent[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await searchApi.searchAll(query);
        if (res.isSuccess && res.data) {
          setResults(res.data.posts);
          setEvents(res.data.events);
        } else {
          setResults([]);
          setEvents([]);
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
        {!loading && results.length === 0 && events.length === 0 && (
          <p>검색 결과가 없습니다.</p>
        )}
        {!loading &&
          results.map((post) => (
            <ResultItem key={post.postId}>
              <img src={post.mainImageUrl} alt={post.title} width={200} />
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <p>작성자: {post.authorNickname}</p>
            </ResultItem>
          ))}
        {!loading &&
          events.map((event) => (
            <EventItem key={event.groupId}>
              <img
                src={event.artistImageUrl}
                alt={event.artistName}
                width={200}
              />
              <h3>{event.name}</h3>
              <p>아티스트: {event.artistName}</p>
              <p>활동 유형: {event.activityTypes.join(", ")}</p>
              <p>{event.description}</p>
              <p>시작일: {event.startedAt}</p>
            </EventItem>
          ))}
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
  width: 1200px;
  margin: 0 auto;
  margin-bottom: 150px;
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
