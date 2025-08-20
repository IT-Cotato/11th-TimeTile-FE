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
  const [userExists, setUserExists] = useState(true);

  const observerRef = useRef<HTMLDivElement | null>(null);

  const fetchPosts = async () => {
    if (!targetId || loading || !hasNext || !userExists) return;

    setLoading(true);
    try {
      const res = await usersApi.getUserProfilePost(
        targetId,
        lastPostId ?? undefined
      );

      // 유저가 존재하지 않거나 데이터 없으면 무한스크롤 중단
      if (!res.data || !res.data.posts || res.data.posts.length === 0) {
        setHasNext(false);
        return;
      }

      setPosts((prev) => [...prev, ...res.data.posts]);
      setHasNext(res.data.hasNext);
      setLastPostId(res.data.lastPostId);
    } catch (error) {
      console.error(error);
      setHasNext(false); // 에러 발생 시 무한스크롤 중단
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPosts([]);
    setLastPostId(null);
    setHasNext(true);
    setUserExists(true);
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
  }, [observerRef, hasNext, loading, userExists]);

  if (!targetId) {
    return (
      <Container>
        <Text typo="H3" color="gray_500">
          잘못된 접근입니다.
        </Text>
      </Container>
    );
  }

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
            onError={() => {
              setUserExists(false);
              setHasNext(false);
            }}
            userExists={userExists}
          />
          {!userExists ? (
            <PrivateDiv>
              <EmptyText>
                <BasicSymbolLogo width={180} height={180} />
                <TextDiv>
                  <Text typo="Body_1" color="gray_500">
                    존재하지 않는 사용자입니다.
                  </Text>
                </TextDiv>
              </EmptyText>
            </PrivateDiv>
          ) : visibility === "PRIVATE" && !isFollowing ? (
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
                <Text typo="Caption_3" color="gray_500">
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
