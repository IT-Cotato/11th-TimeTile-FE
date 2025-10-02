"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import { searchApi } from "@/apis/searchApi";
import { SearchDetailHeader } from "@/components/Search/SearchDetail/SearchDetailHeader";
import { SearchPost } from "@/model/components/SearchType";
import PaginationComponent from "@/components/mypage/PaginationComponent";
import { MyTilePost } from "@/components/Search/SearchResult/MyTilePost";
import { theme } from "@/styles/theme";

export default function SearchMyTileClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchPosts = async () => {
      try {
        const res = await searchApi.searchPosts(query, page);
        if (res.isSuccess && res.data) {
          setPosts(res.data.posts);
          setTotalCount(res.data.totalElements);
          setTotalPages(res.data.totalPages);
        } else {
          setPosts([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } catch (err) {
        console.error(err);
        setPosts([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    };

    fetchPosts();
  }, [query, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Wrapper>
        <SearchDetailHeader
          children="마이타일"
          searchCount={totalCount}
          isMyTile={true}
        />
        <PostWrapper>
          <MyTilePost posts={posts} highlightWord={query} gridMode={true} />
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
