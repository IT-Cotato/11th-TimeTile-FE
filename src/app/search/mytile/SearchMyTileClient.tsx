"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import styled from "styled-components";
import { searchApi } from "@/apis/searchApi";
import { SearchDetailHeader } from "@/components/Search/SearchDetail/SearchDetailHeader";
import { ImageSearchPost, SearchPost } from "@/model/components/SearchType";
import PaginationComponent from "@/components/mypage/PaginationComponent";
import { MyTilePost } from "@/components/Search/SearchResult/MyTilePost";
import { theme } from "@/styles/theme";
import { MyTileImageGrid } from "@/components/Search/SearchResult/MyTileImageGrid";

export default function SearchMyTileClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [posts, setPosts] = useState<SearchPost[]>([]);
  const [imagePosts, setImagePosts] = useState<ImageSearchPost[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [variant, setVariant] = useState<"default" | "images">("default");

  const [lastPostId, setLastPostId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (variant !== "default" || !query) return;

    const fetchPosts = async () => {
      try {
        const res = await searchApi.searchPosts(query, page);
        if (res.isSuccess && res.data) {
          setPosts(res.data.posts);
          setTotalCount(res.data.totalElements);
          setTotalPages(res.data.totalPages);
        } else {
          setPosts([]);
        }
      } catch (err) {
        console.error(err);
        setPosts([]);
      }
    };

    fetchPosts();
  }, [variant, query, page]);

  const fetchImagePosts = async () => {
    if (!query || loading || !hasNext || variant !== "images") return;

    setLoading(true);
    try {
      const res = await searchApi.searchImage(query, lastPostId || undefined);

      if (res.isSuccess && res.data) {
        setImagePosts((prev: ImageSearchPost[]) => [
          ...prev,
          ...res.data.posts.filter(
            (post: ImageSearchPost) => !prev.some((p) => p.id === post.id)
          ),
        ]);
        setHasNext(res.data.hasNext);
        setLastPostId(res.data.lastPostId);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (variant === "images") {
      setImagePosts([]);
      setHasNext(true);
      setLastPostId(null);
    }
  }, [query, variant]);

  useEffect(() => {
    if (!observerRef.current || variant !== "images") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          fetchImagePosts();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef, hasNext, loading, variant]);

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
          variant={variant}
          onChange={setVariant}
        />
        <PostWrapper>
          {variant === "default" ? (
            <MyTilePost posts={posts} highlightWord={query} gridMode={true} />
          ) : (
            <>
              <MyTileImageGrid posts={imagePosts} />
              <div ref={observerRef} style={{ height: 1 }} />
              {loading && <LoadingText>로딩 중...</LoadingText>}
            </>
          )}
        </PostWrapper>
        {variant === "default" && totalPages > 0 && (
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

const LoadingText = styled.div`
  text-align: center;
  padding: 16px;
  color: ${theme.palette.gray_500};
`;
