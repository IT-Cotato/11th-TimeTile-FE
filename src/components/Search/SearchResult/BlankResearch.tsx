import { Text } from "@/components/atoms/Text";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export const BlankResearch = () => {
  return (
    <Container>
      <Text typo="Body_3" children="검색 결과가 없습니다." />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 1200px;
  height: 400px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;
