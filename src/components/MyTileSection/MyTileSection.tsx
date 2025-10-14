"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Text } from "@/components/atoms/Text";
import { TileCard } from "@/components/Timeline/TileCard";

type TagVariant = "tile" | "deck" | "song";
export interface Schedule {
  title: string;
  date: string;
  tags: TagVariant[];
  description: string;
  thumbnails: string[];
  thumbnailLabels: string[];
  participants?: number;
}

export interface TimelineTile {
  selected?: boolean;
  schedules: Schedule[];
}

interface TimelineSectionProps {
  month: number;
  tiles: TimelineTile[];
}

export default function TimelineSection({
  month,
  tiles,
}: TimelineSectionProps) {
  return (
    <Row>
      <MonthCol>
        <Text typo="Body_1" color="gray_1000">
          {month}월
        </Text>
      </MonthCol>

      <ContentCol>
        <GroupCard>
          {tiles.map((tile, i) => (
            <TileCardRow key={i}>
              <TileCard selected={!!tile.selected} schedules={tile.schedules} />
            </TileCardRow>
          ))}
        </GroupCard>
      </ContentCol>
    </Row>
  );
}

const Row = styled.div``;

const MonthCol = styled.div``;

const ContentCol = styled.div``;

const GroupCard = styled.div``;

const TileCardRow = styled.div``;
