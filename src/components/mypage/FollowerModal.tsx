"use client";

import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { usersApi } from "@/apis/usersApi";
import { Text } from "@/components/atoms/Text";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { theme } from "@/styles/theme";
import { FlexBox } from "@/components/layouts/FlexBox";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { userProfileAtom } from "@/store/UserProfileAtom";

interface Follower {
  id: string;
  name: string;
  profileImageUrl: string;
}

interface FollowerModalProps {
  onClose: () => void;
  targetId?: number;
}

export const FollowerModal: React.FC<FollowerModalProps> = ({
  onClose,
  targetId,
}) => {
  const [followerList, setFollowerList] = useState<Follower[]>([]);
  const [lastId, setLastId] = useState<number | undefined>(undefined);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const myProfile = useAtomValue(userProfileAtom);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasFetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched.current) {
      fetchFollowers();
      hasFetched.current = true;
    }
  }, []);

  const fetchFollowers = async () => {
    if (!hasNext || loading) return;
    setLoading(true);
    try {
      const res = targetId
        ? await usersApi.getUserFollowerUsers(targetId, lastId)
        : await usersApi.getFollowerUsers(lastId);

      if (res.data.isSuccess) {
        const newFollowers = res.data.data.followers;
        setFollowerList((prev) => {
          const existingIds = new Set(prev.map((f) => f.id));
          const filteredNew = newFollowers.filter(
            (f: Follower) => !existingIds.has(f.id)
          );
          return [...prev, ...filteredNew];
        });
        setHasNext(res.data.data.hasNext);
        setLastId(res.data.data.lastFollowId);
      }
    } catch (error) {
      console.error("팔로워 조회 실패", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const el = contentRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      fetchFollowers();
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [loading, hasNext]);

  return (
    <ModalWrapper>
      <ModalContainer>
        <ContentWrap ref={contentRef}>
          <TabHeader>
            <Text typo="H3" color="gray_800">
              팔로워
            </Text>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </TabHeader>
          <LineDiv>
            <FlexBox gap={56} justify="flex-start">
              <TabButton disabled>
                <Text typo="H4" color="primary_700">
                  유저
                </Text>
              </TabButton>
            </FlexBox>
          </LineDiv>
          <GridContainer>
            {followerList.map(({ id, name, profileImageUrl }) => (
              <FollowerItem
                key={id}
                onClick={() => {
                  if (myProfile && myProfile.id === Number(id)) {
                    router.push("/users/mypage");
                  } else {
                    router.push(`/users/${id}`);
                  }
                  onClose();
                }}
                style={{ cursor: "pointer" }}
              >
                <ProfileImg src={profileImageUrl} alt={name} />
                <Name>
                  <Text typo="H4" color="gray_1000">
                    {name}
                  </Text>
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
  border: 1px solid var(--Primary-400, #a6c6fa);
  background: var(--Primary-50, #f7faff);
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

const LineDiv = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid ${theme.palette.gray_300};
`;

const TabButton = styled.button`
  all: unset;
  cursor: default;
`;

const CloseButton = styled.div`
  cursor: pointer;
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
