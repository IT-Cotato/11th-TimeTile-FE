"use client";

import { useEffect, useState } from "react";
import { usersApi } from "@/apis/usersApi";
import styled from "styled-components";
import { FlexBox } from "@/components/layouts/FlexBox";
import { TimeLineComponent } from "@/components/mypage/TimeLineComponent";
import { Post } from "@/model/components/Post";
import { useParams } from "next/navigation";
import { theme } from "@/styles/theme";
import { UserProfile } from "@/components/mypage/UserProfile";

const MOCK_POSTS: Post[] = [
  {
    name: "Corporate Branding Manager",
    artistName: "Bruno Mars",
    postId: 23,
    groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
    title: "Brown Group",
    content: "Sumo vado apostolus sumptus spoliatio cogo congregatio.",
    mainImageUrl:
      "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
    createdAt: "2025-07-23T20:55:58.958522",
    likeCount: 0,
    commentCount: 0,
  },
  {
    name: "Corporate Branding Manager",
    artistName: "Bruno Mars",
    postId: 22,
    groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
    title: "Franecki LLC",
    content: "Aspernatur utrimque vetus deporto.",
    mainImageUrl:
      "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250723T120320Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250723%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=3089e52ceb8288663b59ea2d5731e24d0c759791011fd5f8e3d43c9c795059a0",
    createdAt: "2025-07-23T20:55:56.375922",
    likeCount: 0,
    commentCount: 0,
  },
  {
    name: "Corporate Branding Manager",
    artistName: "Bruno Mars",
    postId: 21,
    groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
    title: "Franecki - Franecki",
    content:
      "Auctor laboriosam speciosus tamdiu tergeo utor advenio blanditiis vesper.",
    mainImageUrl:
      "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250723T120320Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250723%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=3089e52ceb8288663b59ea2d5731e24d0c759791011fd5f8e3d43c9c795059a0",
    createdAt: "2025-07-23T20:55:54.12418",
    likeCount: 0,
    commentCount: 0,
  },
  {
    name: "Corporate Branding Manager",
    artistName: "Bruno Mars",
    postId: 20,
    groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
    title: "Kilback, Bogan and Sawayn",
    content: "Debeo bellicus carus.",
    mainImageUrl:
      "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250723T120320Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250723%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=3089e52ceb8288663b59ea2d5731e24d0c759791011fd5f8e3d43c9c795059a0",
    createdAt: "2025-07-23T20:55:51.895323",
    likeCount: 0,
    commentCount: 0,
  },
  {
    name: "Corporate Branding Manager",
    artistName: "Bruno Mars",
    postId: 19,
    groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
    title: "Veum, Upton and Feil",
    content: "Cerno solio crustulum vetus timor utrum arma adnuo.",
    mainImageUrl:
      "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250723T120320Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250723%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=3089e52ceb8288663b59ea2d5731e24d0c759791011fd5f8e3d43c9c795059a0",
    createdAt: "2025-07-23T20:55:49.486031",
    likeCount: 0,
    commentCount: 0,
  },
  {
    name: "Corporate Branding Manager",
    artistName: "Bruno Mars",
    postId: 18,
    groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
    title: "Gislason, Ratke and Reinger",
    content: "Antea video aeneus dolor bardus decet umbra.",
    mainImageUrl:
      "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250723T120320Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250723%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=3089e52ceb8288663b59ea2d5731e24d0c759791011fd5f8e3d43c9c795059a0",
    createdAt: "2025-07-23T20:55:47.184279",
    likeCount: 0,
    commentCount: 0,
  },
];

export default function OtherUserMyPage() {
  const params = useParams();
  const targetId = Number(params.targetId);
  const [posts, setPosts] = useState<Post[]>([]);
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    if (!targetId) return;
    const fetchPosts = async () => {
      const res = await usersApi.getUserProfilePost(targetId);
      setPosts(res.data.posts);
      console.log(res.data.posts);
    };
    fetchPosts();
  }, [targetId]);

  //   useEffect(() => {
  //     if (!targetId) return;
  //     const fetchPosts = async () => {
  //       setPosts(MOCK_POSTS);
  //     };
  //     fetchPosts();
  //   }, [targetId]);

  useEffect(() => {
    console.log("posts updated", posts);
  }, [posts]);

  return (
    <Container>
      <Wrapper>
        <FlexBox gap={24} direction="column">
          <UserProfile
            targetId={targetId}
            onProfileLoad={({ name }) => setNickname(name)}
          />
          <TimeLineComponent
            posts={posts}
            titleText={`${nickname}님의 개별기록`}
            infoText="개별기록이 없습니다."
          />
        </FlexBox>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 100vh;
  padding: 0 119px;
`;

const Wrapper = styled.div`
  width: 962px;
  margin: 0 auto;
  margin-bottom: 150px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid ${theme.palette.primary_400};
`;
