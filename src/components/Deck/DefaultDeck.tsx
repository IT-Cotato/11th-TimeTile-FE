"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Text } from "@/components/atoms/Text";
import { FlexBox } from "../layouts/FlexBox";
import { ChevronDown } from "@/assets/icons/ChevronDown";

interface EventData {
  eventId: number;
  name: string;
}

interface DefaultDeckProps {
  events: EventData[];
  showMoreButton: boolean;
  onMoreClick: () => void;
}

export const DefaultDeck = ({
  events,
  showMoreButton,
  onMoreClick,
}: DefaultDeckProps) => {
  const visibleEvents = events.slice(0, 2);

  return (
    <DeckContainer>
      <Wrapper>
        <EventList>
          <TopWrapper>
            <Text typo="H4">대표 스케줄</Text>
            {showMoreButton && (
              <MoreButton onClick={onMoreClick}>
                <Text typo="Caption_2">{events.length}개의 타일 더보기</Text>
                <ChevronDown />
              </MoreButton>
            )}
          </TopWrapper>
          <FlexBox gap={10} justify="start">
            <Text typo="Body_3">
              {visibleEvents.map((event) => event.name).join(", ")}
            </Text>
          </FlexBox>
        </EventList>
      </Wrapper>
    </DeckContainer>
  );
};

const DeckContainer = styled.div`
  display: flex;
  width: 818px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_200};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 12px 0 rgba(159, 198, 255, 0.25);
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrapper = styled.div`
  display: flex;
  height: 64px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const EventList = styled.div`
  display: flex;
  width: 100%;
  height: 69px;
  flex-direction: column;
  justify-content: center;
  gap: 24px;
`;

const MoreButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;
