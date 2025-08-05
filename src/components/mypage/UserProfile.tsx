import { useEffect, useState } from "react";
import styled from "styled-components";
import { usersApi } from "@/apis/usersApi";
import { FlexBox } from "@/components/layouts/FlexBox";
import { Text } from "@/components/atoms/Text";
import { RoleIcon } from "./RoleIcon";
import { PrivateIcon } from "@/assets/icons/PrivateIcon";
import { FollowButton } from "@/components/atoms/FollowButton";
import { Tag } from "../atoms/Tag";
import { UserRole } from "@/model/common/user";
import { theme } from "@/styles/theme";
import { FollowingModal } from "./FollowingModal";
import { FollowerModal } from "./FollowerModal";

interface UserProfileProps {
  targetId: number;
  onProfileLoad?: (user: { name: string }) => void;
}

interface UserProfileData {
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: UserRole;
  visibility: string;
  followingCount: number;
  followerCount: number;
  postCount: number;
  introduction: string;
}

const song = "투모로우바이투게더 - tommorow xjdjdjdjjaja";

export const UserProfile = ({ targetId, onProfileLoad }: UserProfileProps) => {
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowerModalOpen, setIsFollowerModalOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [followVariant, setFollowVariant] = useState<
    "follow" | "following" | "unfollow"
  >("follow");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await usersApi.getUserProfileById(targetId);
        setProfile(data);
        // setFollowVariant(data.isFollowing ? "following" : "follow");
        // 추후 isFollowing이 생긴다면 사용
        // 닉네임 상위로 전달
        if (onProfileLoad) {
          onProfileLoad({ name: data.nickname });
        }
      } catch (error) {
        console.error("프로필 불러오기 실패", error);
      }
    };
    fetchProfile();
  }, [targetId, onProfileLoad]);

  if (!profile) return <div>로딩 중...</div>;

  const handleFollowClick = () => {
    if (followVariant === "follow") {
      // 팔로우 API 호출
      setFollowVariant("following");
    } else if (followVariant === "following") {
      setFollowVariant("unfollow");
    } else if (followVariant === "unfollow") {
    }
  };

  const handleUnfollowClick = () => {
    // 언팔로우 API 호출
    setFollowVariant("follow");
  };

  return (
    <>
      <Wrapper>
        <ProfileImg
          src={profile.profileImageUrl}
          alt={`${profile.nickname}의 프로필 이미지`}
        />
        <Info>
          <FlexBox gap={8} justify="start" align="center">
            <Text typo="H1" color="gray_1000">
              {profile.nickname}
            </Text>
            <RoleIcon role={profile.role} width={24} />
            {profile.visibility === "PRIVATE" && <PrivateIcon />}
          </FlexBox>
          <Stats>
            <Part onClick={() => setIsFollowingModalOpen(true)}>
              <Text typo="Caption_1">팔로잉</Text>
              <Text typo="Caption_1">{profile.followingCount}</Text>
            </Part>
            <Part onClick={() => setIsFollowerModalOpen(true)}>
              <Text typo="Caption_1">팔로워</Text>
              <Text typo="Caption_1">{profile.followerCount}</Text>
            </Part>
          </Stats>
          <FlexDiv>
            <Tag variant="song">{song}</Tag>
          </FlexDiv>
          <Intro>
            <Text typo="Body_3">{profile.introduction}</Text>
          </Intro>
        </Info>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "115px",
          }}
        >
          <FollowButton
            variant={followVariant}
            onClick={handleFollowClick}
            onUnfollowClick={handleUnfollowClick}
            width={68}
          />
        </div>
      </Wrapper>
      {isFollowingModalOpen && (
        <FollowingModal
          onClose={() => setIsFollowingModalOpen(false)}
          targetId={targetId}
        />
      )}
      {isFollowerModalOpen && (
        <FollowerModal
          onClose={() => setIsFollowerModalOpen(false)}
          targetId={targetId}
        />
      )}
    </>
  );
};

const Wrapper = styled.div`
  margin-top: 26px;
  display: flex;
  width: 950px;
  padding: 32px;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 20px;
  border: 1px solid ${theme.palette.gray_200};
`;

const ProfileImg = styled.img`
  width: 212px;
  height: 212px;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 546px;
  gap: 16px;
  margin-left: 32px;
`;

const Part = styled.div`
  display: flex;
  gap: 8px;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
`;

const Intro = styled.p`
  margin-top: 16px;
`;
