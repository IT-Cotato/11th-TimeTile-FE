"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import TimelineSection from "@/components/TimeLineSection/TimeLineSection";
import MyTileSection, {
  Schedule,
} from "@/components/MyTileSection/MyTileSection";
import { TileCard } from "@/components/Timeline/TileCard";

type TabValue = "timeline" | "mytile";

interface DeckTabsProps {
  defaultValue?: TabValue;
  timelineData: Record<number, Schedule[]>; // month: schedules
  mytileData: Record<number, Schedule[]>;
}

export default function DeckTabs({
  defaultValue = "timeline",
  timelineData,
  mytileData,
}: DeckTabsProps) {
  const [value, setValue] = useState<TabValue>(defaultValue);
  const [cap, setCap] = useState<{ x: number; w: number }>({ x: 0, w: 0 });

  const wrapRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLButtonElement>(null);
  const rightRef = useRef<HTMLButtonElement>(null);

  const measure = () => {
    const target = value === "timeline" ? leftRef.current : rightRef.current;
    const parent = wrapRef.current;
    if (!target || !parent) return;
    const t = target.getBoundingClientRect();
    const p = parent.getBoundingClientRect();
    setCap({ x: t.left - p.left, w: t.width });
  };

  useLayoutEffect(() => {
    const raf = requestAnimationFrame(measure);
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window && wrapRef.current) {
      ro = new ResizeObserver(measure);
      ro.observe(wrapRef.current);
    }
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    (document as any).fonts?.ready?.then?.(measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      ro?.disconnect?.();
    };
  }, [value]);

  useEffect(() => {
    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, []);

  /** 내부에서 TimelineSection/TileCard 생성 */
  const renderTimeline = () =>
    Object.entries(timelineData).map(([month, schedules]) => (
      <TimelineSection key={month} month={Number(month)}>
        {schedules.map((s, i) => (
          <TileCard key={i} selected={false} schedules={[s]} />
        ))}
      </TimelineSection>
    ));

  const renderMyTile = () =>
    Object.entries(mytileData).map(([month, schedules]) => (
      <MyTileSection
        key={month}
        month={Number(month)}
        tiles={schedules.map((s) => ({ selected: false, schedules: [s] }))}
      />
    ));

  return (
    <Container>
      <HeaderWrap ref={wrapRef}>
        <ActiveCap
          style={{ width: cap.w || "50%", transform: `translateX(${cap.x}px)` }}
        />
        <TabButton
          ref={leftRef}
          $active={value === "timeline"}
          onClick={() => setValue("timeline")}
        >
          타임타일 데크
        </TabButton>
        <TabButton
          ref={rightRef}
          $active={value === "mytile"}
          onClick={() => setValue("mytile")}
        >
          마이타일 데크
        </TabButton>
      </HeaderWrap>

      <PanelArea>
        {value === "timeline" ? (
          <Panel>{renderTimeline()}</Panel>
        ) : (
          <Panel>{renderMyTile()}</Panel>
        )}
      </PanelArea>
    </Container>
  );
}

/* ================= styled ================= */

const Container = styled.section`
  margin: 0 120px;
`;

const HeaderWrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: ${theme.palette.primary_100};
  border-radius: 16px 16px 0 0;
  padding: 0;
  overflow: visible;
`;

const ActiveCap = styled.div`
  position: absolute;
  top: 0;
  bottom: -1px;
  left: 0;
  transform: translateX(0);
  border: 1px solid ${theme.palette.primary_200};
  border-bottom: none;
  border-radius: 16px 16px 0 0;
  background: ${theme.palette.primary_20};
  transition: transform 220ms ease, width 220ms ease;
  will-change: transform, width;
  z-index: 1;
`;

const TabButton = styled.button<{ $active?: boolean }>`
  position: relative;
  z-index: 2;
  height: 68px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  font-weight: ${({ $active }) => ($active ? 700 : 600)};
  color: ${({ $active }) =>
    $active ? theme.palette.primary_600 : theme.palette.primary_400};
  letter-spacing: -0.2px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ $active }) =>
      $active ? theme.palette.primary_300 : theme.palette.primary_400};
  }
`;

const PanelArea = styled.div`
  background: ${theme.palette.primary_20};
  border: 1px solid ${theme.palette.primary_100};
  border-top: none;
  border-radius: 0 0 16px 16px;
  margin-top: 0;
  padding: 24px;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
