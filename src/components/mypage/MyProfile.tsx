import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Text } from "../atoms/Text";
import { Tag } from "../atoms/Tag";
import { Buttons } from "../atoms/Buttons";
import { EditIcon } from "@/assets/icons/EditIcon";
import { usersApi } from "@/apis/usersApi";
import { Editor } from "./../../assets/images/role/Editor";
import { FlexBox } from "@/components/layouts/FlexBox";

interface UserProfile {
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: string;
  visibility: string;
  followingCount: number;
  followerCount: number;
  postCount: number;
  introduction: string;
}

const song = "투모로우바이투게더 - tommorow xjdjdjdjjaja";

export const MyProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await usersApi.getMyProfile();
        setProfile(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("프로필을 불러오는데 실패했습니다", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>로딩 중...</div>;

  return (
    <Wrapper>
      <ProfileImg
        src={profile.profileImageUrl}
        alt={`${profile.nickname}의 프로필 이미지`}
      />
      <Info>
        <FlexBox gap={8} justify="start" align="center">
          <Editor width={24} />
          <Text typo="H1" color="gray_1000" children={profile.nickname} />
        </FlexBox>
        <Stats>
          <Part>
            <Text typo="Caption_1" children="내 기록" />
            <Text typo="Caption_1" children={profile.postCount} />
          </Part>
          <Part>
            <Text typo="Caption_1" children="팔로잉" />
            <Text typo="Caption_1" children={profile.followingCount} />
          </Part>
          <Part>
            <Text typo="Caption_1" children="팔로워" />
            <Text typo="Caption_1" children={profile.followerCount} />
          </Part>
        </Stats>
        <FlexDiv>
          <Tag variant="song" children={song} />
        </FlexDiv>
        <Intro>
          <Text typo="Body_3" children={profile.introduction} />
        </Intro>
      </Info>
      <Buttons
        width={85}
        variant="edit"
        children="수정"
        leftChildren={<EditIcon />}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 26px;
  display: flex;
  width: 950px;
  padding: 32px;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 32px;
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
`;
const Part = styled.div`
  display: flex;
  gap: 8px;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Nickname = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

const Intro = styled.p`
  margin-top: 16px;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
`;
