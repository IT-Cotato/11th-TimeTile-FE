"use client";

import React from "react";
import styled from "styled-components";
import { ArtistProfileCard } from "@/components/atoms/ArtistProfileCard";
import DeckTabs from "@/components/DeckTabs/DeckTabs";
import TimelineSection from "@/components/TimeLineSection/TimeLineSection";
import MyTileSection, {
  Schedule,
} from "@/components/MyTileSection/MyTileSection";

import { TileCard } from "@/components/Timeline/TileCard";

export default function TimeTilePage() {
  // 상단 프로필 데이터 (예시)
  const artistName = "투모로우바이투게더(txt)";
  const followerCount = 21980;
  const imageUrl = "/images/txt.jpg";
  const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019] as const;
  const yearSchedules: Record<number, string[]> = {
    2025: ["뮤직뱅크 출연", "서울 콘서트"],
    2024: ["컴백 쇼케이스", "유럽 투어"],
  };

  // 타임라인/마이타일 스케줄 (예시)
  const base: Schedule = {
    title: "싱글 <Spicy> 발매",
    date: "2025.03.23",
    tags: ["deck", "tile", "song"],
    description: "200자 이내 일정 요약 텍스트가 들어갑니다.",
    thumbnails: ["/images/txt.jpg", "/images/txt.jpg", "/images/txt.jpg"],
    thumbnailLabels: ["썸네일1", "썸네일2", "썸네일3"],
    participants: 99,
  };

  const jan: Schedule[] = [
    { ...base, title: "싱글 <Spicy> 발매 (1월)", date: "2025.01.12" },
    { ...base, title: "컴백 티저 공개", date: "2025.01.20" },
  ];
  const feb: Schedule[] = [
    { ...base, title: "컴백 쇼케이스", date: "2025.02.03" },
    { ...base, title: "유럽 투어", date: "2025.02.18" },
  ];
  const marA: Schedule[] = [{ ...base }];
  const marB: Schedule[] = [
    { ...base, title: "스페셜 무대 공개", date: "2025.03.29" },
  ];

  return (
    <Page>
      {/* <ArtistProfileCard
        artistName={artistName}
        followerCount={followerCount}
        imageUrl={imageUrl}
        years={[...years]}
        yearSchedules={yearSchedules}
        role="watcher"
      /> */}

      <Gap16 />

      <DeckTabs
        timelineSlot={
          <>
            {/*  <TimelineSection month={1}>
              <TileCard selected={false} schedules={jan} />
            </TimelineSection>

            <TimelineSection month={2}>
              <TileCard selected={false} schedules={feb} />
            </TimelineSection>

            <TimelineSection month={3}>
              <TileCard selected schedules={marA} />
              <TileCard selected={false} schedules={marB} />
            </TimelineSection> */}
          </>
        }
        mytileSlot={
          <>
            {/* <MyTileSection month={1}>
              <TileCard selected={false} schedules={jan} />
            </MyTileSection>

            <MyTileSection month={2}>
              <TileCard selected={false} schedules={feb} />
            </MyTileSection> */}
          </>
        }
      />
    </Page>
  );
}

const Page = styled.div`
  margin: 0 auto;
  padding: 0 24px;
`;

const Gap16 = styled.div`
  height: 16px;
`;
