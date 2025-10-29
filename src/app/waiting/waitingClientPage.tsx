"use client";

import styled from "styled-components";

export default function WaitingClientPage() {
  return (
    <Container>
      <Wrapper>waiting</Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 0 119px;
  padding-bottom: 83px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 950px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;
