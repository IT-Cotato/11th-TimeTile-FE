"use client";

import styled from "styled-components";
import { Text } from "../atoms/Text";
import { Tag } from "../atoms/Tag";
import { TagCategory } from "../atoms/TagCategory";
import { TagCategoryName } from "@/model/common/tagcategory";
import { theme } from "@/styles/theme";
import { CommentIcon } from "@/assets/icons/CommentIcon";
import { ChevronDown } from "@/assets/icons/ChevronDown";
import RecordCardSmall from "../IndividualRecord/RecordCardSmall";
import { UserRole } from "@/model/common/user";
import { useRouter } from "next/navigation";
import { DeckEventData } from "@/model/components/DeckEvent";
import { RightBlueIcon } from "@/assets/icons/RightBlueIcon";

interface MyExpandDeckProps {
  events: DeckEventData[];
  onClose: () => void;
  role: UserRole;
}

export const MyExpandDeck = ({ events, onClose, role }: MyExpandDeckProps) => {
  const router = useRouter();

  return (
    <ExpandContainer>
      {events.map((event) => (
        <EventCard key={event.eventId}>
          <Header>
            <HeaderLeft>
              <Text typo="Body_1" color="gray_700">
                {new Date(event.startedAt).getDate()}일
              </Text>

              <Text typo="H4" color="gray_1000">
                {event.name}
              </Text>
              <AddTileButton
                onClick={() =>
                  router.push(`/record-add?groupId=${event.groupId}`)
                }
              >
                <CommentIcon />
              </AddTileButton>
            </HeaderLeft>
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
                    <TagWrapper
                      key={artist.id}
                      onClick={() => router.push(`/timetile/${artist.id}`)}
                      style={{ cursor: "pointer" }}
                    >
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
          </Header>
          <CardList>
            {event.relatedMaterials.map((m) => (
              <RecordCardSmall
                key={m.postId}
                imageSrc={m.imageUrl || "/images/default_thumbnail.png"}
                title={m.title || event.name}
                description={m.description || event.description}
                likes={m.likes}
                comments={m.comments}
                onClick={() => router.push(`/record-post/${post.postId}`)}
              />
            ))}
          </CardList>
          <BottomBar>
            <Text typo="Caption_2" color="gray_1000">
              +{event.contributorCount}명 참여했어요
            </Text>
            <Text typo="Caption_2" color="gray_1000">
              ·
            </Text>
            <ViewAllButton
              onClick={() =>
                router.push(`/record-list?groupId=${event.groupId}`)
              }
            >
              <RightBlueIcon />
            </ViewAllButton>
          </BottomBar>
        </EventCard>
      ))}
      <CollapseWrapper onClick={onClose}>
        <Text typo="Caption_2">타일 접기</Text>
        <ChevronDown />
      </CollapseWrapper>
    </ExpandContainer>
  );
};

const ExpandContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
  border-radius: 12px;
  background: ${theme.palette.gray_0};
  border: 1px solid ${theme.palette.primary_200};
  box-shadow: 0 4px 12px rgba(159, 198, 255, 0.25);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 8px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddTileButton = styled.button`
  border: none;
  background: none;
  color: ${theme.palette.primary_600};
  cursor: pointer;
`;

const TagsScrollWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TagsScrollContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagWrapper = styled.div`
  flex-shrink: 0;
`;

const CardList = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const ViewAllButton = styled.button`
  border: none;
  background: none;
  color: ${theme.palette.primary_700};
  font-size: 12px;
  cursor: pointer;
`;

const CollapseWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  margin-top: 12px;
`;
