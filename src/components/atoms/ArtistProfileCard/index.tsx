import styled from "styled-components";
import { FollowButton } from "@/components/atoms/FollowButton";
import { theme } from "@/styles/theme";
import { Text } from "@/components/atoms/Text";
import { YearScroller } from "@/components/Deck/YearScroller";
import { UserRole } from "@/model/common/user";
import { Tooltip } from "../Tooltip";
import { EditButtonIcon } from "@/assets/icons/EditButtonIcon";
import { AlertIcon } from "@/assets/icons/AlertIcon";
import { EyeButtonIcon } from "@/assets/icons/EyeButtonIcon";
import { ClockButtonIcon } from "@/assets/icons/ClockButtonIcon";
import { useRouter } from "next/navigation";

interface ArtistProfileCardProps {
  artistName: string;
  followerCount: number;
  imageUrl: string;
  years?: number[];
  yearSchedules?: Record<number, string[]>;
  role?: UserRole | "ADMIN";
  mode: "view" | "edit" | "waiting";
  currentTab: "timeTile" | "myTile";
  isFollowing?: "follow" | "following" | "unfollow";
  followLoading?: boolean;
  setMode?: (mode: "view" | "edit" | "waiting") => void;
  onFollowClick?: () => void;
  onUnfollowClick?: () => void;
  onYearSelect?: (year: number | null) => void;
}

const roleColorMap: Record<UserRole | "ADMIN", string> = {
  WATCHER: theme.palette.gray_300,
  LINKER: theme.palette.sub_600,
  EDITOR: theme.palette.sub_600,
  ADMIN: theme.palette.sub_600,
};

export const ArtistProfileCard = ({
  artistName,
  followerCount,
  imageUrl,
  years = [],
  yearSchedules = {},
  role = "WATCHER",
  mode = "view",
  isFollowing,
  followLoading = false,
  currentTab,
  setMode,
  onFollowClick,
  onUnfollowClick,
  onYearSelect,
}: ArtistProfileCardProps) => {
  const router = useRouter();
  const iconColor = roleColorMap[role] ?? theme.palette.gray_300;

  const handleTooltipClick = () => {
    if (!setMode) return;
    if (mode === "view" && role !== "WATCHER") {
      setMode("edit");
    } else if (mode === "edit") {
      setMode("view");
    }
  };

  const handleClockClick = () => {
    router.push("/waiting");
  };

  return (
    <CardWrapper>
      <ImageWrapper $imageUrl={imageUrl} />
      <Container>
        <TopWrapper>
          <Info>
            <TopRow>
              <ArtistInfo $isEditMode={mode === "edit"}>
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
                  {mode === "edit" ? (
                    // <AlertIcon />
                    <></>
                  ) : (
                    <FollowButton
                      variant={isFollowing}
                      isLoading={followLoading}
                      onClick={onFollowClick}
                      onUnfollowClick={onUnfollowClick}
                      width={68}
                      height={36}
                    />
                  )}
                </div>
              </ArtistInfo>
              <Part>
                <Text typo="Caption_1">팔로워</Text>
                <Text typo="Caption_1">{followerCount.toLocaleString()}명</Text>
              </Part>
            </TopRow>
            {currentTab === "timeTile" &&
              (isFollowing === "following" || isFollowing === "unfollow") && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    width: 32,
                  }}
                >
                  <Tooltip
                    variant="default"
                    icon={
                      <div
                        onClick={handleTooltipClick}
                        style={{ cursor: "pointer" }}
                      >
                        {mode === "edit" ? (
                          <EyeButtonIcon color={theme.palette.sub_600} />
                        ) : (
                          <EditButtonIcon color={iconColor} />
                        )}
                      </div>
                    }
                  >
                    {mode === "edit"
                      ? "보기 모드로 전환하기"
                      : role === "WATCHER"
                      ? "Linker 등급부터 문서를 편집할 수 있어요"
                      : "편집 모드로 전환하기"}
                  </Tooltip>
                  {mode === "edit" && (
                    <Tooltip
                      variant="default"
                      icon={
                        <div
                          onClick={handleClockClick}
                          style={{ cursor: "pointer" }}
                        >
                          <ClockButtonIcon color={iconColor} />
                        </div>
                      }
                    >
                      업로드 대기 중인 타일 보기
                    </Tooltip>
                  )}
                </div>
              )}
          </Info>
        </TopWrapper>
        {years.length > 0 && (
          <YearWrapper>
            <YearScroller
              years={years}
              yearSchedules={yearSchedules}
              onYearSelect={onYearSelect}
            />
          </YearWrapper>
        )}
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

const ArtistInfo = styled.div<{ $isEditMode: boolean }>`
  display: flex;
  align-items: flex-start;
  height: 32px;
  gap: 16px;

  ${({ $isEditMode }) =>
    $isEditMode &&
    `
    justify-content: center;
    align-items: center;
    gap: 4px;
  `}
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
