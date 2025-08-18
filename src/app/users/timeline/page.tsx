"use client";

import { Text } from "@/components/atoms/Text";
import { MyArtistTimeline } from "@/components/mypage/MyArtistTimeline";
import { theme } from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";
import { MyTimeLine } from "@/components/mypage/MyTimeLine";

export default function MyTimeLinePage() {
  const [selected, setSelected] = useState<"artist-timeline" | "my-timeline">(
    "artist-timeline"
  );
  return (
    <Container>
      <Wrapper>
        <SelectHeader>
          <SelectText
            onClick={() => setSelected("artist-timeline")}
            $selected={selected === "artist-timeline"}
          >
            <Text typo="H2" children="내가 기록한 아티스트 타임라인" />
          </SelectText>
          <SelectText
            onClick={() => setSelected("my-timeline")}
            $selected={selected === "my-timeline"}
          >
            <Text typo="H2" children="내 타임라인" />
          </SelectText>
        </SelectHeader>
        {selected === "artist-timeline" ? <MyArtistTimeline /> : <MyTimeLine />}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 100vh;
  padding: 0 119px;
`;

const Wrapper = styled.div`
  width: 962px;
  margin: 0 auto;
  margin-bottom: 150px;
  margin-top: 26px;
`;

const SelectHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
`;

const SelectText = styled.div<{ $selected: boolean }>`
  cursor: pointer;
  color: ${({ $selected }) =>
    $selected ? `${theme.palette.primary_800}` : `${theme.palette.gray_900}`};
`;
