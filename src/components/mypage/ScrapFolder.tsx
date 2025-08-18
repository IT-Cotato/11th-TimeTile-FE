import styled from "styled-components";
import { BookmarkIcon } from "@/assets/icons/BookmarkIcon";
import { theme } from "@/styles/theme";
import { Text } from "../atoms/Text";

interface FolderCardProps {
  name: string;
  count: number;
  onClick?: () => void;
}

export const ScrapFolder = ({ name, count, onClick }: FolderCardProps) => {
  const displayCount = count > 99 ? "99+" : count;

  return (
    <BlueContainer onClick={onClick}>
      <LeftTab />
      <WhiteOverlay>
        <BookmarkArea>
          <BookmarkIcon />
          {/* <Text typo="Body_3" color="primary_400" children={displayCount} /> */}
        </BookmarkArea>
        <Content>
          <Title>
            <Text typo="H4_2" color="primary_900" children={name} />
          </Title>
        </Content>
      </WhiteOverlay>
    </BlueContainer>
  );
};

const BlueContainer = styled.div`
  width: 140px;
  height: 104px;
  border-radius: 13px;
  background-color: ${theme.palette.primary_400};
  position: relative;
  cursor: pointer;
`;

const LeftTab = styled.div`
  position: absolute;
  top: -7px;
  left: 0;
  width: 44px;
  height: 93px;
  background-color: ${theme.palette.primary_400};
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
`;

const WhiteOverlay = styled.div`
  position: absolute;
  top: 18.45px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding: 7.565px 8px 8px 8px;
  width: 100%;
  height: 104px;
  background-color: white;
  border-radius: 13px;
  border: 2px solid ${theme.palette.primary_400};
  z-index: 1;
`;

const Content = styled.div`
  padding: 0 6px;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BookmarkArea = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 5px;
`;

const Title = styled.div`
  text-align: center;
  color: ${theme.palette.primary_900};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
