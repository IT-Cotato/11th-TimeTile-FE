import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../atoms/Text";
import { Buttons } from "../atoms/Buttons";

interface EmptyDeckProps {
  onAddTileClick: () => void;
}

export const EmptyDeck = ({ onAddTileClick }: EmptyDeckProps) => {
  return (
    <Container>
      <Text typo="Body_3">첫 번째 타일을 추가해보세요.</Text>
      <Buttons
        variant="addTile"
        children="타일 추가"
        width={86}
        onClick={onAddTileClick}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 400px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;
