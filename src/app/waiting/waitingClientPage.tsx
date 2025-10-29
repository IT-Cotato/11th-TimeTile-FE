"use client";

import { TileToggle } from "@/components/Waiting/TileToggle";
import { WaitingInfo } from "@/components/Waiting/WaitingInfo";
import { WaitingTileComponent } from "@/components/Waiting/WaitingTileComponent";
import { useState } from "react";
import styled from "styled-components";

export default function WaitingClientPage() {
  const [tileView, setTileView] = useState<"all" | "new" | "edited">("all");
  return (
    <Container>
      <Wrapper>
        <WaitingInfo />
        <TileToggle value={tileView} onChange={setTileView} />
        <WaitingTileComponent />
      </Wrapper>
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
