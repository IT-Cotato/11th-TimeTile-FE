import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../Text";

export const BlankSearchTile = () => {
  return (
    <Container>
      <Text typo="Body_3" color="gray_1000">
        검색 결과가 없습니다.
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 1136px;
  height: 88px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 20px;
  background: ${theme.palette.primary_20};
`;
