import { theme } from "@/styles/theme";
import styled from "styled-components";

export const MyTileDeck = () => {
  return <Container>마이타일 데크</Container>;
};

const Container = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
  border-radius: 0 0 20px 20px;
  border-top: none;
  border-right: 1px solid ${theme.palette.primary_300};
  border-bottom: 1px solid ${theme.palette.primary_300};
  border-left: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;
