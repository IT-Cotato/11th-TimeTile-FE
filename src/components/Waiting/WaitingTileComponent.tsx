import { theme } from "@/styles/theme";
import styled from "styled-components";
import { WaitingTile } from "./WaitingTile";

export const WaitingTileComponent = () => {
  return (
    <Container>
      <WaitingTile />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.sub_300};
  background: ${theme.palette.sub_50};
`;
