import { RightArrow } from "@/assets/icons/RightArrow";
import { BlankSearchTile } from "@/components/atoms/BlankSearchTile";
import { Text } from "@/components/atoms/Text";
import { TimeTileCard } from "@/components/atoms/TimeTileCard";
import { FlexBox } from "@/components/layouts/FlexBox";
import { SearchEvent } from "@/model/components/SearchType";
import { theme } from "@/styles/theme";
import styled from "styled-components";

interface TimeTileResultProps {
  eventCount: number;
  events: SearchEvent[];
  highlightWord?: string;
}

export const TimeTileResult = ({
  eventCount,
  events,
  highlightWord,
}: TimeTileResultProps) => {
  const displayEvents = events.slice(0, 5);

  return (
    <Container>
      <InfoText>
        <Text typo="H3" color="primary_800">
          타임타일({eventCount})
        </Text>
        <div style={{ cursor: "pointer" }}>
          <FlexBox gap={4}>
            <Text typo="Body_3" color="primary_800" children="전체보기" />
            <RightArrow />
          </FlexBox>
        </div>
      </InfoText>
      {events.length === 0 ? (
        <BlankSearchTile />
      ) : (
        <Wrapper>
          {displayEvents.map((event) => (
            <TimeTileCard
              key={event.groupId}
              event={event}
              highlightWord={highlightWord}
            />
          ))}
        </Wrapper>
      )}
    </Container>
  );
};

const InfoText = styled.div`
  display: flex;
  height: 24px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Container = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
