import { RightArrow } from "@/assets/icons/RightArrow";
import { BlankSearchTile } from "@/components/atoms/BlankSearchTile";
import { Text } from "@/components/atoms/Text";
import { UserProfileCard } from "@/components/atoms/UserProfileCard";
import { FlexBox } from "@/components/layouts/FlexBox";
import { theme } from "@/styles/theme";
import styled from "styled-components";

interface User {
  nickname: string;
  imageUrl: string;
  introduction: string | null;
}

interface UserResultProps {
  userCount: number;
  users: User[];
}

export const UserResult = ({ userCount, users }: UserResultProps) => {
  return (
    <Container>
      <InfoText>
        <Text typo="H3" color="primary_800">
          유저({userCount})
        </Text>
        <div style={{ cursor: "pointer" }}>
          <FlexBox gap={4}>
            <Text typo="Body_3" color="primary_800" children="전체보기" />
            <RightArrow />
          </FlexBox>
        </div>
      </InfoText>
      {users.length === 0 ? (
        <BlankSearchTile />
      ) : (
        <InnerWrapper>
          <ProfileRow>
            {users.slice(0, 5).map((user, index) => (
              <UserProfileCard
                key={index}
                name={user.nickname}
                imageUrl={user.imageUrl}
                introduction={user.introduction}
              />
            ))}
          </ProfileRow>
          {users.length >= 5 && <MoreOverlay />}
        </InnerWrapper>
      )}
    </Container>
  );
};
const InfoText = styled.div`
  display: flex;
  height: 24px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Container = styled.div`
  display: flex;
  width: 1200px;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
  position: relative;
`;

const InnerWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const ProfileRow = styled.div`
  display: flex;
  gap: 16px;
`;

const MoreOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 176px;
  background: linear-gradient(90deg, rgba(251, 253, 255, 0) 0%, #fbfdff 91.83%);
  pointer-events: none;
`;
