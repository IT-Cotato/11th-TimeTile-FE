"use client";

import styled from "styled-components";
import { Text } from "../atoms/Text";
import { LinkIcon } from "@/assets/icons/LinkIcon";
import { Tag } from "../atoms/Tag";
import { TagCategory } from "../atoms/TagCategory";
import { TagCategoryName } from "@/model/common/tagcategory";
import { theme } from "@/styles/theme";
import { EventData } from "@/model/components/Event";
import { ChevronDown } from "@/assets/icons/ChevronDown";
import { KebabIcon } from "@/assets/icons/KebabIcon";
import { Tooltip } from "../atoms/Tooltip";

interface ExpandDeckProps {
  events: EventData[];
  onClose: () => void;
}

export const ExpandDeck = ({ events, onClose }: ExpandDeckProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();
    return `${day}일`;
  };

  return (
    <ExpandContainer>
      <EventList>
        {events.map((event) => (
          <EventCard key={event.eventId}>
            <TopWrapper>
              <Text typo="Body_1" color="gray_700">
                {/* {event.startedAt !== event.endedAt ? (
                  <Tooltip
                    variant="date"
                    startDate={event.startedAt}
                    endDate={event.endedAt}
                  />
                ) : (
                  formatDate(event.startedAt)
                )} */}
                <Tooltip
                  variant="date"
                  startDate={event.startedAt}
                  endDate={event.endedAt}
                />
              </Text>
              <ReportDiv>
                <Text typo="H4" color="gray_1000">
                  {event.name}
                </Text>
                <KebabIcon />
              </ReportDiv>
            </TopWrapper>
            {(event.activityTypes.length > 0 ||
              event.relatedArtists.length > 0 ||
              event.relatedEvents.length > 0) && (
              <TagsScrollWrapper>
                <TagsScrollContainer>
                  {event.activityTypes.map((type, idx) => (
                    <TagWrapper key={`type-${idx}`}>
                      <TagCategory
                        category={type as TagCategoryName}
                        variant="default"
                      />
                    </TagWrapper>
                  ))}
                  {event.relatedArtists.map((artist) => (
                    <TagWrapper key={artist.id}>
                      <Tag variant="deck">{artist.name}</Tag>
                    </TagWrapper>
                  ))}
                  {event.relatedEvents.map((re) => (
                    <TagWrapper key={re.groupId}>
                      <Tag variant="tile">{re.name}</Tag>
                    </TagWrapper>
                  ))}
                </TagsScrollContainer>
              </TagsScrollWrapper>
            )}
            <Text typo="Body_3">{event.description}</Text>
            {event.relatedMaterials.length > 0 && (
              <MaterialsWrapper>
                <ScrollContainer>
                  {event.relatedMaterials.map((url, i) => (
                    <MaterialLink
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(url, "_blank", "noopener noreferrer");
                      }}
                    >
                      <LinkIconWrapper>
                        <LinkIcon />
                      </LinkIconWrapper>
                    </MaterialLink>
                  ))}
                </ScrollContainer>
              </MaterialsWrapper>
            )}
            <ContributeDiv>
              <Text typo="Caption_2" color="gray_600">
                {event.contributorCount}명 참여했어요
              </Text>
            </ContributeDiv>
          </EventCard>
        ))}
      </EventList>
      <TextWrap>
        <CloseButton onClick={onClose}>
          <Text typo="Caption_2">타일 접기</Text> <ChevronDown />
        </CloseButton>
      </TextWrap>
    </ExpandContainer>
  );
};

const ExpandContainer = styled.div``;

const CloseButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-height: 640px;
  overflow-y: auto;
  padding-bottom: 12px;

  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ReportDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  background: ${theme.palette.primary_20};
  border: 1px solid ${theme.palette.primary_200};
  box-shadow: 0 4px 12px 0 rgba(159, 198, 255, 0.25);
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TagsScrollWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TagsScrollContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  flex-wrap: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagWrapper = styled.div`
  flex-shrink: 0;
`;

const MaterialsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MaterialLink = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 160px;
  height: 120px;
  border-radius: 8px;
  background: ${theme.palette.gray_200};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const LinkIconWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

const ContributeDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const TextWrap = styled.div`
  display: flex;
  padding: 12px;
  justify-content: flex-end;
  align-self: stretch;
`;
