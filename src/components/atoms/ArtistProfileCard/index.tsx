import styled from "styled-components";
import { FollowButton } from "@/components/atoms/FollowButton";
import { theme } from "@/styles/theme";
import { Text } from "@/components/atoms/Text";
import { YearScroller } from "@/components/Deck/YearScroller";

interface ArtistProfileCardProps {
  artistName: string;
  followerCount: number;
  imageUrl: string;
  years?: number[];
  yearSchedules?: Record<number, string[]>;
  role?: "watcher" | "linker" | "editor";
  mode?: "view" | "edit" | "waiting";
  isFollowing?: boolean;
  followLoading?: boolean;
  onFollowClick?: () => void;
  onUnfollowClick?: () => void;
  onYearSelect?: (year: number | null) => void;
}

export const ArtistProfileCard = ({
  artistName,
  followerCount,
  imageUrl,
  years = [],
  yearSchedules = {},
  role = "watcher",
  mode = "view",
  isFollowing,
  followLoading,
  onFollowClick,
  onUnfollowClick,
  onYearSelect,
}: ArtistProfileCardProps) => {
  return (
    <CardWrapper>
      <ImageWrapper $imageUrl={imageUrl} />
      <Container>
        <TopWrapper>
          <Info>
            <TopRow>
              <ArtistInfo>
                <Text typo="H1" color="gray_1000">
                  {artistName}
                </Text>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    flexDirection: "column",
                    width: "115px",
                    alignItems: "flex-start",
                  }}
                >
                  <FollowButton
                    variant={isFollowing ? "unfollow" : "follow"}
                    isLoading={followLoading}
                    onClick={onFollowClick}
                    onUnfollowClick={onUnfollowClick}
                    width={68}
                  />
                </div>
              </ArtistInfo>
              <Part>
                <Text typo="Caption_1">팔로워</Text>
                <Text typo="Caption_1">{followerCount.toLocaleString()}명</Text>
              </Part>
            </TopRow>
          </Info>
        </TopWrapper>
        <YearWrapper>
          <YearScroller
            years={years}
            yearSchedules={yearSchedules}
            onYearSelect={onYearSelect}
          />
        </YearWrapper>
      </Container>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  padding: 32px;
  width: 950px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.gray_200};
  background-color: ${theme.palette.gray_0};
  gap: 32px;
  margin-top: 12px;
`;

const Container = styled.div`
  display: flex;
  width: 654px;
  height: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 64px;
`;

const ImageWrapper = styled.div<{ $imageUrl: string }>`
  width: 200px;
  height: 200px;
  aspect-ratio: 1/1;
  border-radius: 10px;
  background: ${({ $imageUrl }) =>
    `url(${$imageUrl}) lightgray 50% / cover no-repeat`};
`;

const TopWrapper = styled.div`
  display: flex;
  height: 112px;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
`;

const Info = styled.div`
  display: flex;
  width: 622px;
  justify-content: space-between;
  align-items: flex-start;
`;

const ArtistInfo = styled.div`
  display: flex;
  align-items: flex-start;
  height: 32px;
  gap: 16px;
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const Part = styled.div`
  display: flex;
  gap: 6px;
`;

const YearWrapper = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
  gap: 34px;
  flex-shrink: 0;
  align-self: stretch;
`;
