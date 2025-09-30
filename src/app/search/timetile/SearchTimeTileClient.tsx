"use client";

import { searchApi } from "@/apis/searchApi";
import { TimeTileCard } from "@/components/atoms/TimeTileCard";
import PaginationComponent from "@/components/mypage/PaginationComponent";
import { SearchDetailHeader } from "@/components/Search/SearchDetail/SearchDetailHeader";
import { SearchEvent } from "@/model/components/SearchType";
import { theme } from "@/styles/theme";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function SearchTimeTileClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [events, setEvents] = useState<SearchEvent[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchEvents = async () => {
      try {
        const res = await searchApi.searchEvents(query, page);
        if (res.isSuccess && res.data) {
          setEvents(res.data.events);
          setTotalCount(res.data.totalElements);
          setTotalPages(res.data.totalPages);
        } else {
          setEvents([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } catch (err) {
        console.error(err);
        setEvents([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    };

    fetchEvents();
  }, [query, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Wrapper>
        <SearchDetailHeader children="타임타일" searchCount={totalCount} />
        <PostWrapper>
          {events.map((event) => (
            <TimeTileCard
              key={event.groupId}
              event={event}
              highlightWord={query}
            />
          ))}
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
  align-items: center;
  gap: 32px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;
