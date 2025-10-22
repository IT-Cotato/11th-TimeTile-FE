"use client";

import styled from "styled-components";
import { Text } from "../atoms/Text";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import { deckApi } from "@/apis/deckApi";
import { FollowButton } from "../atoms/FollowButton";
import { usersApi } from "@/apis/usersApi";
import { useRouter } from "next/navigation";

interface Participant {
  id: number;
  nickname: string;
  profileImageUrl: string;
  isFollowing?: boolean;
}

interface ParticipantsModalProps {
  groupId: string;
  onClose: () => void;
}

export const ParticipantsModal = ({
  groupId,
  onClose,
}: ParticipantsModalProps) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const res = await deckApi.getParticipants(groupId);

        const followingRes = await usersApi.getFollowingUsers();
        const followingIds =
          followingRes.data?.data?.followers?.map((u: any) => Number(u.id)) ??
          [];

        const participantsWithFollow = res.map((p: Participant) => ({
          ...p,
          isFollowing: followingIds.includes(p.id),
        }));

        setParticipants(participantsWithFollow);
      } catch (error) {
        console.error("참여자 목록 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchParticipants();
  }, [groupId]);

  const handleOverlayClick = () => onClose();
  const handleModalClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleFollowToggle = async (participantId: number) => {
    setParticipants((prev) =>
      prev.map((p) =>
        p.id === participantId ? { ...p, isFollowing: !p.isFollowing } : p
      )
    );

    const participant = participants.find((p) => p.id === participantId);
    if (!participant) return;

    try {
      if (participant.isFollowing) {
        await usersApi.unfollowUser(participantId);
      } else {
        await usersApi.followUser(participantId);
      }
    } catch (error) {
      console.error("팔로우/언팔로우 처리 실패", error);
      setParticipants((prev) =>
        prev.map((p) =>
          p.id === participantId
            ? { ...p, isFollowing: participant.isFollowing }
            : p
        )
      );
    }
  };

  const handleItemClick = (participantId: number) => {
    router.push(`/users/${participantId}`);
  };

  if (isLoading) {
    return (
      <Overlay onClick={handleOverlayClick}>
        <ModalBox onClick={handleModalClick}>
          <Text typo="Body_2">로딩 중...</Text>
        </ModalBox>
      </Overlay>
    );
  }

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox onClick={handleModalClick}>
        <Wrapper>
          <TopBar>
            <Text typo="Body_2">참여한 사용자</Text>
          </TopBar>
          <ListWrapper>
            {participants.map((p) => (
              <ParticipantsWrapper key={p.id}>
                <Item onClick={() => handleItemClick(p.id)}>
                  <ProfileImg src={p.profileImageUrl} alt={p.nickname} />
                  <TextDiv>
                    <Text typo="Body_2" color="gray_900">
                      {p.nickname}
                    </Text>
                  </TextDiv>
                </Item>
                <FollowButton
                  width={63}
                  height={32}
                  size="small"
                  variant={p.isFollowing ? "following" : "follow"}
                  onClick={() => handleFollowToggle(p.id)}
                />
              </ParticipantsWrapper>
            ))}
            <GradientOverlay />
          </ListWrapper>
        </Wrapper>
      </ModalBox>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  display: flex;
  width: 296px;
  height: 448px;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  background: ${theme.palette.gray_0};
  border-radius: 16px;
  border: 1px solid ${theme.palette.gray_100};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.05);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const TopBar = styled.div`
  align-self: stretch;
`;

const ListWrapper = styled.div`
  position: relative;
  height: 376px;
  width: 100%;
`;

const ParticipantsWrapper = styled.div`
  display: flex;
  width: 264px;
  height: 40px;
  align-items: center;
  gap: 10px;
`;

const GradientOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 264px;
  height: 40px;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  object-fit: cover;
  background: ${theme.palette.gray_200};
`;

const TextDiv = styled.div`
  display: -webkit-box;
  max-width: 126px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: #000;
  text-overflow: ellipsis;
`;
