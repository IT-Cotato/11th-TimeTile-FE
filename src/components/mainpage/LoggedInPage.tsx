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

const MOCK_ARTIST = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      followers: [
        {
          id: "28ot3wh4oNmoFOdVajibBl",
          name: "NMIXX",
          profileImageUrl:
            "https://i.scdn.co/image/ab6761610000e5ebb75519f6b752fce04b2e4ed7",
        },
        {
          id: "24nUVBIlCGi4twz4nYxJum",
          name: "fromis_9",
          profileImageUrl:
            "https://i.scdn.co/image/ab6761610000e5eb9287cd584e823ab3391f0f7e",
        },
        {
          id: "1HY2Jd0NmPuamShAr6KMms",
          name: "Lady Gaga",
          profileImageUrl:
            "https://i.scdn.co/image/ab6761610000e5ebaadc18cac8d48124357c38e6",
        },
        {
          id: "1gBUSTR3TyDdTVFIaQnc02",
          name: "NCT DREAM",
          profileImageUrl:
            "https://i.scdn.co/image/ab6761610000e5eb1adec53158528b5d5d86d7dc",
        },
      ],
    },
  },
];

const MOCK_DATA = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      events: [
        {
          eventId: 14,
          groupId: "28ot3wh4oNmoFOdVajibBl",
          name: "Legacy Directives Orchestrator",
          description:
            "Provident delinquo tener curiositas volva caecus tracto denego.",
          activityTypes: ["콘서트/팬미팅", "유튜브", "기타"],
          relatedMaterials: ["https://miserly-gallery.info"],
          startedAt: "2025-04-11",
          endedAt: "2025-04-07",
        },
        {
          eventId: 12,
          groupId: "24nUVBIlCGi4twz4nYxJum",
          name: "Prem Human Assurance Representative",
          description:
            "Tersus temperantia aedificium toties voluptatum truculenter perferendis culpo tempus.",
          activityTypes: ["콘서트/팬미팅"],
          relatedMaterials: ["https://aged-pacemaker.com/"],
          startedAt: "2025-04-21",
          endedAt: "2026-01-20",
        },
        {
          eventId: 15,
          groupId: "24nUVBIlCGi4twz4nYxJum",
          name: "Prem Human Assurance Representative",
          description:
            "Tersus temperantia aedifdddddddddddddddddddddddddddddddddddddddddddddddddddddddddicium toties voluptatum truculenter perferendis culpo tempus.",
          activityTypes: ["콘서트/팬미팅"],
          relatedMaterials: ["https://aged-pacemaker.com/"],
          startedAt: "2025-04-21",
          endedAt: "2026-01-20",
        },
        {
          eventId: 16,
          groupId: "24nUVBIlCGi4twz4nYxJum",
          name: "Prem Human Assurance Representative",
          description:
            "Tersus temperantia aedificium toties voluptatum truculenter perferendis culpo tempus.",
          activityTypes: ["콘서트/팬미팅"],
          relatedMaterials: ["https://aged-pacemaker.com/"],
          startedAt: "2025-04-21",
          endedAt: "2026-01-20",
        },
        {
          eventId: 17,
          groupId: "24nUVBIlCGi4twz4nYxJum",
          name: "Prem Human Assurance Representative",
          description:
            "Tersus temperantia aedificium toties voluptatum truculenter perferendis culpo tempus.",
          activityTypes: ["콘서트/팬미팅"],
          relatedMaterials: ["https://aged-pacemaker.com/"],
          startedAt: "2025-04-21",
          endedAt: "2026-01-20",
        },
      ],
      hasNext: false,
      hasPrevious: false,
      isLast: true,
    },
  },
];

export default function LoggedInPage() {
  // 아티스트 이벤트 페이지네이션
  const [artistEvents, setArtistEvents] = useState<any[]>([]);
  const [artistPage, setArtistPage] = useState(1);
  const [artistHasNext, setArtistHasNext] = useState(false);
  const [artistHasPrevious, setArtistHasPrevious] = useState(false);

  // 유저 포스트 페이지네이션
  const [userPosts, setUserPosts] = useState<MyPost[]>([]);
  const [userPage, setUserPage] = useState(1);
  const [userHasNext, setUserHasNext] = useState(false);
  const [userHasPrevious, setUserHasPrevious] = useState(false);
  const [followingArtists, setFollowingArtists] = useState<Artist[]>([]);

  // 팔로잉 아티스트 조회
  useEffect(() => {
    const fetchFollowingArtists = async () => {
      //const res = await usersApi.getFollowingArtists();
      const res = MOCK_ARTIST[0];
      setFollowingArtists(res.data.followers);
    };
    fetchFollowingArtists();
  }, []);

  // 아티스트 이벤트 조회
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        //const data = await mainApi.getFollowingArtistsEvents(artistPage);
        const data = MOCK_DATA[0];
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

  // 유저 포스트 조회
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

  // 아티스트 이벤트
  const handleArtistPrev = () => {
    if (artistHasPrevious) setArtistPage((prev) => prev - 1);
  };
  const handleArtistNext = () => {
    if (artistHasNext) setArtistPage((prev) => prev + 1);
  };

  // 유저 포스트
  const handleUserPrev = () => {
    if (userHasPrevious) setUserPage((prev) => prev - 1);
  };
  const handleUserNext = () => {
    if (userHasNext) setUserPage((prev) => prev + 1);
  };

  return (
    <FlexBox gap={32} direction="column">
      {/* 아티스트 이벤트 */}
      <Wrapper>
        <TextWrapper>
          <Text typo="H3_2" color="primary_700">
            팔로우한 데크의 새로운 타임타일
          </Text>
        </TextWrapper>
        <FlexBox>
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
                const topArtist = followingArtists.find(
                  (artist) => artist.id === event.groupId
                );
                if (!topArtist) return null;

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
                    topArtists={[topArtist]}
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
      {/* 유저 포스트 */}
      <Wrapper>
        <TextWrapper>
          <Text typo="H3_2" color="primary_700">
            팔로우한 유저의 새로운 타임타일
          </Text>
        </TextWrapper>
        <FlexBox>
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
  border: 1px solid var(--Primary-300, #c3dbff);
  background: var(--Primary-20, #fbfdff);
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
