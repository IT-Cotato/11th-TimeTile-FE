"use client";

import styled from "styled-components";
import { Text } from "../atoms/Text";
import { Tag } from "../atoms/Tag";
import { TagCategory } from "../atoms/TagCategory";
import { TagCategoryName } from "@/model/common/tagcategory";
import { theme } from "@/styles/theme";
import { CommentIcon } from "@/assets/icons/CommentIcon";
import { EventData } from "@/model/components/Event";
import { ChevronDown } from "@/assets/icons/ChevronDown";
import RecordCardSmall from "../IndividualRecord/RecordCardSmall";
import { UserRole } from "@/model/common/user";
import { useRouter } from "next/navigation";

interface MyExpandDeckProps {
  mode: "view" | "edit" | "waiting";
  events: EventData[];
  onClose: () => void;
  role: UserRole;
}

export const MyExpandDeck = ({
  mode,
  events,
  onClose,
  role,
}: MyExpandDeckProps) => {
  const router = useRouter();

  return (
    <ExpandContainer>
      {events.map((event) => (
        <EventCard key={event.eventId}>
          {/* 상단 헤더 */}
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
                  router.push(`/record-add?groupId=${event.groupId || ""}`)
                }
              >
                <CommentIcon />
              </AddTileButton>
            </HeaderLeft>

            {/* 태그 목록 */}
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

          {/* 카드 리스트 */}
          <CardList>
            {event.relatedMaterials?.length ? (
              event.relatedMaterials.map((m, idx) => (
                <RecordCardSmall
                  key={idx}
                  imageSrc={m.imageUrl || "/images/default_thumbnail.png"}
                  title={m.title || event.name}
                  description={m.description || event.description}
                  likes={m.likes ?? 0}
                  comments={m.comments ?? 0}
                />
              ))
            ) : (
              <RecordCardSmall
                imageSrc={event.source || "/images/default_thumbnail.png"}
                title={event.name}
                description={event.description}
                likes={event.contributorCount ?? 0}
                comments={0}
              />
            )}
          </CardList>

          {/* 참여자 + 전체보기 */}
          <BottomBar>
            <Text typo="Caption_2" color="gray_600">
              +{event.contributorCount ?? 0}명 참여했어요
            </Text>
            <ViewAllButton
              onClick={() =>
                router.push(`/record-list?groupId=${event.groupId || ""}`)
              }
            >
              전체 보기 &gt;
            </ViewAllButton>
          </BottomBar>
        </EventCard>
      ))}

      {/* 타일 접기 */}
      <CollapseWrapper onClick={onClose}>
        <Text typo="Caption_2">타일 접기</Text>
        <ChevronDown />
      </CollapseWrapper>
    </ExpandContainer>
  );
};

/* 💅 스타일 */
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
  background: ${theme.palette.primary_20};
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
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
`;

const TagsScrollWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const TagsScrollContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
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
  gap: 12px;
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
