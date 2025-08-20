"use client";

import { useEffect, useRef, useState } from "react";
import { usersApi } from "@/apis/usersApi";
import styled from "styled-components";
import { FlexBox } from "@/components/layouts/FlexBox";
import { TimeLineComponent } from "@/components/mypage/TimeLineComponent";
import { Post } from "@/model/components/Post";
import { useParams } from "next/navigation";
import { UserProfile } from "@/components/mypage/UserProfile";
import { Text } from "@/components/atoms/Text";
import { BasicSymbolLogo } from "@/assets/images/BasicSymbolLogo";

const MOCK_POSTS = [
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
          postId: 23,
          title: "Brown Group",
          content: "Sumo vado apostolus sumptus spoliatio cogo congregatio.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045256Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=eb92a1db3f756e990b7e368fa2d34ff9c6edc43fc570432b1fdfc726ac39dd65",
          createdAt: "2025-07-23T20:55:58.958522",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 22,
          title: "Franecki LLC",
          content: "Aspernatur utrimque vetus deporto.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:56.375922",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 21,
          title: "Franecki - Franecki",
          content:
            "Auctor laboriosam speciosus tamdiu tergeo utor advenio blanditiis vesper.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:54.12418",
          likeCount: 1,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 20,
          title: "Kilback, Bogan and Sawayn",
          content: "Debeo bellicus carus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:51.895323",
          likeCount: 0,
          commentCount: 2,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 19,
          title: "Veum, Upton and Feil",
          content: "Cerno solio crustulum vetus timor utrum arma adnuo.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:49.486031",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 18,
          title: "Gislason, Ratke and Reinger",
          content: "Antea video aeneus dolor bardus decet umbra.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:47.184279",
          likeCount: 1,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 17,
          title: "Franecki - Durgan",
          content: "Collum vaco suasoria.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:44.190242",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 16,
          title: "Zemlak, Gibson and Leffler",
          content:
            "Aeternus perspiciatis caput cribro temptatio canto dolorem cupressus creta.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:41.388176",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 15,
          title: "Smith, Hodkiewicz and Will",
          content: "Tabernus cetera amplexus claudeo creo.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:39.070895",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 14,
          title: "Hoeger - Maggio",
          content: "Terga terra accusantium artificiose clarus umquam.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250814T045257Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CCFUW7277%2F20250814%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=10eba650aec7e3eec5462993cae3d31593d61c00471d79558d37cf0e0fc87b75",
          createdAt: "2025-07-23T20:55:37.215384",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
      ],
      hasNext: true,
      lastPostId: 14,
    },
  },
];

export default function OtherUserMyPage() {
  const params = useParams();
  const targetId = Number(params.targetId);
  const [posts, setPosts] = useState<Post[]>([]);
  const [nickname, setNickname] = useState<string>("");
  const [visibility, setVisibility] = useState<string>("PUBLIC");
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  const [lastPostId, setLastPostId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async () => {
    if (!targetId || loading || !hasNext) return;
    setLoading(true);
    try {
      const res = await usersApi.getUserProfilePost(
        targetId,
        lastPostId ?? undefined
      );
      //const res = MOCK_POSTS[0];
      setPosts((prev) => [...prev, ...res.data.posts]);
      setHasNext(res.data.hasNext);
      setLastPostId(res.data.lastPostId);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setLastPostId(null);
    setHasNext(true);
  }, [targetId]);

  // 무한스크롤
  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          fetchPosts();
        }
      },
      { threshold: 1.0 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [observerRef, hasNext, loading]);

  return (
    <Container>
      <Wrapper>
        <FlexBox gap={24} direction="column">
          <UserProfile
            targetId={targetId}
            onProfileLoad={({ name, visibility, isFollowing }) => {
              setNickname(name);
              setVisibility(visibility);
              setIsFollowing(isFollowing);
            }}
          />
          {visibility === "PRIVATE" && !isFollowing ? (
            <PrivateDiv>
              <TitleDiv>
                <Title>
                  <Text typo="H3">{nickname}님의 마이타일</Text>
                </Title>
              </TitleDiv>
              <EmptyText>
                <BasicSymbolLogo width={180} height={180} />
                <TextDiv>
                  <Text typo="H1" color="gray_500">
                    비공개 계정입니다.
                  </Text>
                  <Text typo="H3" color="gray_500">
                    마이타일을 보려면 계정을 팔로우하세요.
                  </Text>
                </TextDiv>
              </EmptyText>
            </PrivateDiv>
          ) : (
            <>
              <TimeLineComponent
                posts={posts}
                titleText={`${nickname}님의 마이타일`}
                infoText="마이타일이 없습니다."
                showViewMore={false}
              />
              <div ref={observerRef} style={{ height: 1 }} />
              {loading && (
                <Text typo="H3" color="gray_500">
                  로딩 중...
                </Text>
              )}
            </>
          )}
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PrivateDiv = styled.div`
  width: 100%;
`;

const TitleDiv = styled.div``;

const EmptyText = styled.div`
  width: 100%;
  height: 580px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 56px;
`;

const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
