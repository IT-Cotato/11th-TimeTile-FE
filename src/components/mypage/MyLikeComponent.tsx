"use client";

import styled from "styled-components";
import { OtherPostComponent } from "./OtherPostComponent";
import PaginationComponent from "./PaginationComponent";
import { useEffect, useState } from "react";
import { OtherPost } from "@/model/components/Post";
import { usersApi } from "@/apis/usersApi";

export const MyLikeComponent = () => {
  const [posts, setPosts] = useState<OtherPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await usersApi.getMyLike({ page });
      // const res = MOCK_DATA[0];
      if (res.isSuccess) {
        setPosts(res.data.posts);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("데이터 가져오기 실패", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <OtherPostComponent
        showTitle={false}
        posts={posts}
        infoText="좋아요 기록이 없습니다."
      />
      {posts.length > 0 && (
        <PaginationComponent
          totalPages={totalPages}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

const Container = styled.div``;
