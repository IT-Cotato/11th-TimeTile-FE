import styled from "styled-components";
import { Text } from "../atoms/Text";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { useEffect, useState } from "react";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { ChatIcon } from "@/assets/icons/ChatIcon";
import { theme } from "@/styles/theme";

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

interface Post {
  name: string;
  artistName: string;
  postId: number;
  groupId: string;
  title: string;
  content: string;
  mainImageUrl: string | null;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}

export const MyTimeLine = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPosts(mockData[0].data.posts);
  }, []);
  return (
    <Wrapper>
      <Title>
        <Text typo="H3" children="내 타임라인" />
        <CursorDiv>
          <MoveRightIcon />
        </CursorDiv>
      </Title>
      <TimeLineWrap>
        {posts.map((post) => {
          const hasImage = !!post.mainImageUrl;
          return (
            <TimeLineCard key={post.postId}>
              <CardContent>
                <TitleWrap>
                  <Text typo="Body_1">{post.artistName}</Text>
                </TitleWrap>
                <TitleWrap>
                  <Text typo="Body_3">{post.name}</Text>
                </TitleWrap>
              </CardContent>
              {post.mainImageUrl && (
                <Image src={post.mainImageUrl} alt="게시물 이미지" />
              )}
              <CardContent>
                <TitleWrap>
                  <Text typo="H4">{post.title}</Text>
                </TitleWrap>
                <Wrap hasImage={hasImage}>
                  <Text typo="Body_3">{post.content}</Text>
                </Wrap>
              </CardContent>
              <DetailWrap>
                <IconDiv>
                  <HeartIcon />
                  <Text typo="Body_3" children={post.likeCount} color="Heart" />
                </IconDiv>
                <IconDiv>
                  <ChatIcon />
                  <Text
                    typo="Body_3"
                    children={post.commentCount}
                    color="primary_500"
                  />
                </IconDiv>
              </DetailWrap>
            </TimeLineCard>
          );
        })}
      </TimeLineWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CursorDiv = styled.div`
  cursor: pointer;
`;

const TimeLineWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 24px;
`;

const TimeLineCard = styled.div`
  display: flex;
  width: 298px;
  height: 512px;
  padding: 24px;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  text-align: left;
`;

const Image = styled.img`
  width: 100%;
  height: 218px;
  border-radius: 12px;
  object-fit: cover;
`;

const TitleWrap = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const Wrap = styled.div<{ hasImage: boolean }>`
  height: ${({ hasImage }) => (hasImage ? "72px" : "312px")};
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ hasImage }) => (hasImage ? 3 : 13)};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const DetailWrap = styled.div`
  width: 100%;
  display: flex;
  margin-top: 4px;
`;

const IconDiv = styled.div`
  display: flex;
  width: 60px;
  height: 26px;
  align-items: center;
  gap: 4px;
`;
