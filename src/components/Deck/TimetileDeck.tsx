import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";

interface RelatedArtist {
  id: string;
  name: string;
  imageUrl: string;
}

interface EventData {
  eventId?: number;
  groupId?: string;
  name?: string;
  description?: string;
  source?: string;
  relatedEvents?: string[];
  relatedArtists?: RelatedArtist[];
  activityTypes?: string[];
  relatedMaterials?: string[];
  startedAt?: string;
  endedAt?: string;
  contributorCount?: number;
}

interface Event {
  month: number;
  eventId?: number;
  groupId?: string;
  name?: string;
  description?: string;
  source?: string;
  relatedEvents: string[];
  relatedArtists: RelatedArtist[];
  activityTypes: string[];
  relatedMaterials: string[];
  startedAt: string;
  endedAt: string;
  contributorCount: number;
}

interface TimetileDeckProps {
  year: number;
  artistId: string;
  mode: "view" | "edit" | "waiting";
}

export const TimetileDeck = ({ year, artistId, mode }: TimetileDeckProps) => {
  return <Container $mode={mode}>타임타일 데크</Container>;
};

const Container = styled.div<{ $mode: "view" | "edit" | "waiting" }>`
  display: flex;
  padding: 24px;
  width: 950px;
  flex-direction: column;
  gap: 12px;
  align-self: stretch;
  border-radius: ${({ $mode }) =>
    $mode === "edit" ? "20px" : "0 0 20px 20px"};
  border-top: ${({ $mode }) =>
    $mode === "edit" ? `1px solid ${theme.palette.primary_300}` : "none"};
  border-right: 1px solid ${theme.palette.primary_300};
  border-bottom: 1px solid ${theme.palette.primary_300};
  border-left: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;
