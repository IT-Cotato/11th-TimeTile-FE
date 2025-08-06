"use client";
import { usersApi } from "@/apis/usersApi";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { Text } from "@/components/atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { MyProfile } from "@/components/mypage/MyProfile";
import { TimeLineComponent } from "@/components/mypage/TimeLineComponent";
import { Post } from "@/model/components/Post";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

const mockData = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      posts: [
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 12,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Dickinson, Mayert and Metz",
          content:
            "Cohibeo aedificium aequitas ratione vis nam vulariter versus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:49:13.737354",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 11,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Howell LLC",
          content:
            "게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글",
          mainImageUrl: null,
          createdAt: "2025-07-23T20:49:11.629089",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 10,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Dooley LLC",
          content:
            "게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글 내용 게시글",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:49:09.281998",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 9,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Koch - Spencer",
          content: "Civitas inflammatio animi advoco aeneus tricesimus dens.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:49:07.023323",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 8,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Roberts - Carroll",
          content:
            "Tamen utpote subiungo sub ante patruus dens carpo celebrer.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:49:04.563124",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 7,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Bergnaum Inc",
          content: "Vigilo amita acies.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:48:57.010337",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 6,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Dare and Sons",
          content: "Temporibus cibo cito.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:48:54.814594",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 5,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "O'Kon - McKenzie",
          content:
            "Aegrus conculco patior recusandae animi deficio apparatus antiquus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:48:52.668386",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 4,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Zboncak, Raynor and Christiansen",
          content: "Apud inflammatio sto nemo et peccatus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:48:50.494542",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 3,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Von Inc",
          content: "Dapifer asper ubi accedo versus cohibeo a quis tabernus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:48:48.091059",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 2,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Rowe, Heller and Reichel",
          content: "Neque trans talio vapulus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:48:44.888204",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 1,
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          title: "Bartell - Thiel",
          content: "Illo contra arcesso defero pecco tamdiu tenus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:41:19.316065",
          likeCount: 0,
          commentCount: 0,
        },
      ],
    },
  },
];

export default function Mypage() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await usersApi.getMyProfilePost();
      setPosts(res.data.data.posts);
      console.log(res);
    };
    fetchPosts();
    //   const fetchMockPosts = async () => {
    //     const mockPosts = mockData[0].data.posts;
    //     setPosts(mockPosts);
    //     console.log(mockPosts);
    //   };
    //   fetchMockPosts();
  }, []);

  return (
    <Container>
      <Wrapper>
        <FlexBox gap={24} direction="column">
          <MyProfile />
          <TimeLineComponent posts={posts} />
          <Wrap>
            <Text typo="H3" children="좋아요" />
            <IconDiv
              onClick={() => (window.location.href = `/users/mypage/like`)}
            >
              <MoveRightIcon size={20} />
            </IconDiv>
          </Wrap>
          <Wrap>
            <Text typo="H3" children="스크랩" />
            <IconDiv
              onClick={() => (window.location.href = `/users/mypage/scrap`)}
            >
              <MoveRightIcon size={20} />
            </IconDiv>
          </Wrap>
          <Wrap>
            <Text typo="H3" children="내 등급 확인" />
            <IconDiv>
              <MoveRightIcon size={20} />
            </IconDiv>
          </Wrap>
          <Wrap>
            <Text typo="H3" children="설정" />
            <IconDiv>
              <MoveRightIcon size={20} />
            </IconDiv>
          </Wrap>
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
  justify-content: space-between;
  width: 100%;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid ${theme.palette.primary_400};
`;

const IconDiv = styled.div`
  cursor: pointer;
`;
