import styled from "styled-components";
import { OtherPostComponent } from "./OtherPostComponent";
import PaginationComponent from "./PaginationComponent";
import { useEffect, useState } from "react";
import { OtherPost } from "@/model/components/Post";
import { usersApi } from "@/apis/usersApi";

const MOCK_DATA = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      posts: [
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          nickname: "choyeon",
          writerImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          postId: 21,
          title: "Franecki - Franecki",
          content:
            "Auctor laboriosam speciosus tamdiu tergeo utor advenio blanditiis vesper.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250723T144835Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250723%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=d3c8a06e645bcecb625c04dffad60e02a5ce5eb5121285255fc72e326d06d554",
          createdAt: "2025-07-23T20:55:54.12418",
          likeCount: 1,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          nickname: "choyeonnnn nnnnnnnnnnnnnnn nnnnnnnnnnnnnnnnnnnnnnnnnnn",
          writerImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          postId: 18,
          title: "Gislason, Ratke and Reinger",
          content: "Antea video aeneus dolor bardus decet umbra.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250723T144835Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250723%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=d3c8a06e645bcecb625c04dffad60e02a5ce5eb5121285255fc72e326d06d554",
          createdAt: "2025-07-23T20:55:47.184279",
          likeCount: 1,
          commentCount: 0,
        },
      ],
      hasNext: false,
      lastPostId: 18,
    },
  },
];
export const MyLikeComponent = () => {
  const [posts, setPosts] = useState<OtherPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await usersApi.getMyLike({ page });
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
