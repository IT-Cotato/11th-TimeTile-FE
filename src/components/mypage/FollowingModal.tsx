"use client";

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { usersApi } from "@/apis/usersApi";
import { Text } from "@/components/atoms/Text";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { theme } from "@/styles/theme";
import { FlexBox } from "@/components/layouts/FlexBox";
import { useRouter } from "next/navigation";
import { userProfileAtom } from "@/store/UserProfileAtom";
import { useAtomValue } from "jotai";

interface Follower {
  id: string;
  name: string;
  profileImageUrl: string;
}

interface FollowingModalProps {
  onClose: () => void;
  targetId?: number;
}

export const FollowingModal: React.FC<FollowingModalProps> = ({
  onClose,
  targetId,
}) => {
  const myProfile = useAtomValue(userProfileAtom);
  const [activeTab, setActiveTab] = useState<"artist" | "user">("artist");

  const [artistList, setArtistList] = useState<Follower[]>([]);
  const [artistLastId, setArtistLastId] = useState<number | undefined>(
    undefined
  );
  const [artistHasNext, setArtistHasNext] = useState(true);
  const [artistLoading, setArtistLoading] = useState(false);

  const [userList, setUserList] = useState<Follower[]>([]);
  const [userLastId, setUserLastId] = useState<number | undefined>(undefined);
  const [userHasNext, setUserHasNext] = useState(true);
  const [userLoading, setUserLoading] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const fetchFollowingArtists = async () => {
    if (!artistHasNext || artistLoading) return;
    setArtistLoading(true);
    try {
      const res = targetId
        ? await usersApi.getUserFollowingArtists(targetId, artistLastId)
        : await usersApi.getFollowingArtists(artistLastId);

      if (res.data.isSuccess) {
        const newFollowers = res.data.data.followers;
        setArtistList((prev) => [...prev, ...newFollowers]);
        setArtistHasNext(res.data.data.hasNext);
        setArtistLastId(res.data.data.lastFollowId);
      }
    } catch (error) {
      console.error("아티스트 팔로잉 조회 실패", error);
    } finally {
      setArtistLoading(false);
    }
  };

  const fetchFollowingUsers = async () => {
    if (!userHasNext || userLoading) return;
    setUserLoading(true);
    try {
      const res = targetId
        ? await usersApi.getUserFollowingUsers(targetId, userLastId)
        : await usersApi.getFollowingUsers(userLastId);

      if (res.data.isSuccess) {
        const newFollowers = res.data.data.followers;
        setUserList((prev) => [...prev, ...newFollowers]);
        setUserHasNext(res.data.data.hasNext);
        setUserLastId(res.data.data.lastFollowId);
      }
    } catch (error) {
      console.error("유저 팔로잉 조회 실패", error);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "artist") {
      if (artistList.length === 0) {
        setArtistLastId(undefined);
        setArtistHasNext(true);
        fetchFollowingArtists();
      }
    } else {
      if (userList.length === 0) {
        setUserLastId(undefined);
        setUserHasNext(true);
        fetchFollowingUsers();
      }
    }
  }, [activeTab]);

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      if (activeTab === "artist") {
        if (!artistLoading && artistHasNext) {
          fetchFollowingArtists();
        }
      } else {
        if (!userLoading && userHasNext) {
          fetchFollowingUsers();
        }
      }
    }
  };

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [activeTab, artistLoading, artistHasNext, userLoading, userHasNext]);

  const followersToShow = activeTab === "artist" ? artistList : userList;

  return (
    <ModalWrapper>
      <ModalContainer>
        <ContentWrap ref={contentRef}>
          <TabHeader>
            <Text typo="H3" color="gray_800" children="팔로잉" />
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </TabHeader>
          <LineDiv>
            <FlexBox gap={56} justify="flex-start">
              <TabButton onClick={() => setActiveTab("artist")}>
                <Text
                  typo="H4"
                  color={activeTab === "artist" ? "primary_700" : "gray_900"}
                  children="아티스트"
                />
              </TabButton>
              <TabButton onClick={() => setActiveTab("user")}>
                <Text
                  typo="H4"
                  color={activeTab === "user" ? "primary_700" : "gray_900"}
                  children="유저"
                />
              </TabButton>
            </FlexBox>
          </LineDiv>
          <GridContainer>
            {followersToShow.map(({ id, name, profileImageUrl }) => (
              <FollowerItem
                key={id}
                onClick={() => {
                  if (activeTab === "user") {
                    if (myProfile && myProfile.id === Number(id)) {
                      router.push("/users/mypage");
                    } else {
                      router.push(`/users/${id}`);
                    }
                    onClose();
                  }
                }}
                style={{ cursor: activeTab === "user" ? "pointer" : "default" }}
              >
                <ProfileImg src={profileImageUrl} alt={name} />
                <Name>
                  <Text typo="H4" color="gray_1000" children={name} />
                </Name>
              </FollowerItem>
            ))}
          </GridContainer>
        </ContentWrap>
      </ModalContainer>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: auto;
  padding: 32px;
`;

const ModalContainer = styled.div`
  display: inline-flex;
  padding: 32px;
  align-items: center;
  gap: 10px;
  position: relative;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
`;

const ContentWrap = styled.div`
  display: flex;
  width: 728px;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TabHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
`;

const TabButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const CloseButton = styled.div`
  cursor: pointer;
`;

const LineDiv = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${theme.palette.gray_300};
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 24px;
  row-gap: 24px;
  margin-top: 32px;
`;

const FollowerItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
`;

const Name = styled.div`
  width: 120px;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  white-space: normal;
`;
