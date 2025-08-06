import styled from "styled-components";
import { ScrapFolder } from "./ScrapFolder";

export const MyScrapComponent = () => {
  return (
    <Container>
      <ScrapFolder name="에스파" count={105} />
      <ScrapFolder name="투모로우바이투게더" count={105} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 16px;
`;
