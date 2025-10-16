import styled, { css } from "styled-components";
import { Text } from "../atoms/Text";
import { theme } from "@/styles/theme";
import { AddTileButton } from "../atoms/AddTileButton";
import { UserRole } from "@/model/common/user";

interface DeckTabProps {
  activeTab: "timeTile" | "myTile";
  artistName?: string;
  role?: UserRole;
  onTabChange: (tab: "timeTile" | "myTile") => void;
  mode: "view" | "edit" | "waiting";
}

export const DeckTab = ({
  activeTab,
  artistName,
  role,
  onTabChange,
  mode,
}: DeckTabProps) => {
  const currentTab = mode === "edit" ? "timeTile" : activeTab;
  const buttonVariant = role === "LINKER" ? "disable" : "able";

  if (mode === "edit")
    return (
      <ButtonWrapper>
        <AddTileButton variant={buttonVariant} children={artistName} />
      </ButtonWrapper>
    );

  return (
    <TabWrapper>
      <Tab
        selected={currentTab === "timeTile"}
        onClick={() => onTabChange("timeTile")}
        $isLeft={true}
      >
        <Text typo="H4">타임타일 데크</Text>
      </Tab>
      <Tab
        selected={currentTab === "myTile"}
        onClick={() => onTabChange("myTile")}
        $isLeft={false}
      >
        <Text typo="H4">마이타일 데크</Text>
      </Tab>
    </TabWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 24px;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 950px;
  position: relative;
`;

const Tab = styled.div<{ selected: boolean; $isLeft?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 490px;
  gap: 10px;
  border-radius: 20px 20px 0 0;
  position: relative;
  cursor: pointer;

  ${({ selected, $isLeft }) =>
    selected
      ? css`
          height: 68px;
          padding: 0 183px;
          border-top: 1px solid ${theme.palette.primary_300};
          border-left: 1px solid ${theme.palette.primary_300};
          border-right: 1px solid ${theme.palette.primary_300};
          background: ${theme.palette.primary_20};
          z-index: 2;
          color: ${theme.palette.primary_600};
        `
      : css`
          height: 68px;
          padding: 0 183px;
          border: 1px solid ${theme.palette.primary_300};
          background: ${theme.palette.primary_100};
          z-index: 1;
          color: ${theme.palette.primary_400};
          ${$isLeft ? "margin-right: -30px;" : "margin-left: -30px;"}
        `}
`;
