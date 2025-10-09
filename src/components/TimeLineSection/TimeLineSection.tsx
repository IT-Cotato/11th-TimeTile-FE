"use client";

import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Text } from "@/components/atoms/Text";

interface TimelineSectionProps {
  month: number;
  children?: React.ReactNode;
}

export default function TimelineSection({
  month,
  children,
}: TimelineSectionProps) {
  return (
    <Row>
      <MonthCol>
        <Text typo="Body_1" color="gray_1000">
          {month}월
        </Text>
      </MonthCol>
      <ContentCol>
        <GroupCard>{children}</GroupCard>
      </ContentCol>
    </Row>
  );
}

/* ---------------- styled ---------------- */

const Row = styled.section`
  display: grid;
  grid-template-columns: 64px 1fr;
  align-items: start;
  gap: 24px; /* 월과 카드 사이 간격 늘림 */
  padding: 24px 0;
`;

const MonthCol = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding-top: 8px;
`;

const ContentCol = styled.div`
  width: 100%;
`;

const GroupCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px;
  border-radius: 16px;
`;
