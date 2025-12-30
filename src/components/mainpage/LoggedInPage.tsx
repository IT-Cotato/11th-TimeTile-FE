"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { theme } from "@/styles/theme";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { TimeTileComponent, Artist, BottomData } from "./TimeTileComponent";
import { mainApi } from "@/apis/mainApi";
import { FlexBox } from "../layouts/FlexBox";
import { UserTileComponent } from "./UserTileComponent";
import { usersApi } from "@/apis/usersApi";

export interface MyPost {
  postId: number;
  title: string;
  content: string;
  mainImageUrl?: string;
  likeCount: number;
  commentCount: number;
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl: string;
  startedAt: string;
}

export default function LoggedInPage() {
  const [artistEvents, setArtistEvents] = useState<any[]>([]);
  const [artistPage, setArtistPage] = useState(1);
  const [artistHasNext, setArtistHasNext] = useState(false);
  const [artistHasPrevious, setArtistHasPrevious] = useState(false);
  const [userPosts, setUserPosts] = useState<MyPost[]>([]);
  const [userPage, setUserPage] = useState(1);
  const [userHasNext, setUserHasNext] = useState(false);
  const [userHasPrevious, setUserHasPrevious] = useState(false);
  const [followingArtists, setFollowingArtists] = useState<Artist[]>([]);

  useEffect(() => {
    const fetchFollowingArtists = async () => {
      const res = await usersApi.getFollowingArtists();
      //const res = MOCK_ARTIST[0];
      setFollowingArtists(res.data.followers);
    };
    fetchFollowingArtists();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await mainApi.getFollowingArtistsEvents(artistPage);
        if (data?.data?.events) {
          setArtistEvents(data.data.events);
          setArtistHasNext(data.data.hasNext);
          setArtistHasPrevious(data.data.hasPrevious);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, [artistPage]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await mainApi.getFollowingUsersPosts(userPage);
        if (res?.data?.posts) {
          setUserPosts(res.data.posts);
          setUserHasNext(res.data.hasNext);
          setUserHasPrevious(res.data.hasPrevious);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [userPage]);

  const handleArtistPrev = () => {
    if (artistHasPrevious) setArtistPage((prev) => prev - 1);
  };
  const handleArtistNext = () => {
    if (artistHasNext) setArtistPage((prev) => prev + 1);
  };

  const handleUserPrev = () => {
    if (userHasPrevious) setUserPage((prev) => prev - 1);
  };
  const handleUserNext = () => {
    if (userHasNext) setUserPage((prev) => prev + 1);
  };

  return (
    <FlexBox gap={32} direction="column">
      <Wrapper>
        <TextWrapper>
          <Text typo="H3_2" color="primary_700">
            팔로우한 데크의 새로운 타임타일
          </Text>
        </TextWrapper>
        <FlexBox style={{ width: "100%" }}>
          <ArrowButton onClick={handleArtistPrev} disabled={!artistHasPrevious}>
            <MoveLeftIcon />
          </ArrowButton>
          <SliderContainer>
            {artistEvents.length === 0 ? (
              <LoginComponent>
                <CheckTimeTile>
                  <Text typo="H5" color="primary_600">
                    조회되는 데이터가 없습니다.
                  </Text>
                </CheckTimeTile>
              </LoginComponent>
            ) : (
              artistEvents.map((event) => {
                const bottomData: BottomData = {
                  title: event.name,
                  description: event.description,
                  activityTypes: event.activityTypes,
                  date: event.startedAt,
                  relatedMaterials: event.relatedMaterials.length,
                };

                return (
                  <TimeTileComponent
                    key={event.eventId}
                    artistId={event?.groupId}
                    bottomData={bottomData}
                  />
                );
              })
            )}
          </SliderContainer>
          <ArrowButton onClick={handleArtistNext} disabled={!artistHasNext}>
            <MoveRightIcon />
          </ArrowButton>
        </FlexBox>
      </Wrapper>
      <Divider />
      <Wrapper>
        <TextWrapper>
          <Text typo="H3_2" color="primary_700">
            팔로우한 유저의 새로운 마이타일
          </Text>
        </TextWrapper>
        <FlexBox style={{ width: "100%" }}>
          <ArrowButton onClick={handleUserPrev} disabled={!userHasPrevious}>
            <MoveLeftIcon />
          </ArrowButton>
          <SliderContainer>
            {userPosts.length === 0 ? (
              <LoginComponent>
                <CheckTimeTile>
                  <Text typo="H5" color="primary_600">
                    조회되는 데이터가 없습니다.
                  </Text>
                </CheckTimeTile>
              </LoginComponent>
            ) : (
              userPosts.map((post) => (
                <UserTileComponent key={post.postId} post={post} />
              ))
            )}
          </SliderContainer>
          <ArrowButton onClick={handleUserNext} disabled={!userHasNext}>
            <MoveRightIcon />
          </ArrowButton>
        </FlexBox>
      </Wrapper>
    </FlexBox>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 1128px;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const LoginComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${theme.palette.gray_300};
`;

const CheckTimeTile = styled.div`
  display: flex;
  width: 1128px;
  height: 120px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const Divider = styled.div`
  width: 1144px;
  height: 1px;
  background-color: ${theme.palette.gray_100};
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
`;

const ArrowButton = styled.button<{ disabled?: boolean }>`
  all: unset;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  color: ${({ disabled }) =>
    disabled ? theme.palette.gray_300 : theme.palette.gray_800};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;
