"use client";

import styled, { keyframes } from "styled-components";
import { theme } from "@/styles/theme";
import { Sticker } from "../atoms/Sticker";
import { RelatedMaterialPreview } from "../Deck/RelatedMaterialPreview";
import { Tag } from "../atoms/Tag";
import { TagCategory } from "../atoms/TagCategory";
import { TagCategoryName } from "@/model/common/tagcategory";
import { DeckDateTooltip } from "../Deck/DeckDateTooltip";
import { RightIcon } from "@/assets/icons/RightIcon";
import { LeftArrowIcon } from "@/assets/icons/LeftArrowIcon";
import { useRef, useState, useEffect } from "react";
import { SmallVector } from "@/assets/icons/SmallVector";
import { Tooltip } from "../atoms/Tooltip";
import { ReportTileButton } from "../atoms/ReportTileButton";
import { deckApi } from "@/apis/deckApi";
import { Text } from "@/components/atoms/Text";

interface DiffChunk {
  operation: string;
  text: string;
}

interface WaitingTileProps {
  data: {
    eventId: number;
    changeType: "NEW" | "EDITED";
    name: DiffChunk[];
    description: DiffChunk[];
    startedAt?: DiffChunk[];
    endedAt?: DiffChunk[];
    source?: DiffChunk[];
    addedRelatedMaterials: string[];
    addedRelatedEvents?: { groupId: string; title: string }[];
    addedRelatedArtists?: { id: string; name: string }[];
    addedActivityTypes?: string[];
    editedAt?: string;
  };
}

export const WaitingTile = ({ data }: WaitingTileProps) => {
  const {
    changeType,
    name,
    description,
    startedAt = [],
    endedAt = [],
    source = [],
    addedRelatedMaterials,
    addedRelatedEvents = [],
    addedRelatedArtists = [],
    addedActivityTypes = [],
    editedAt,
  } = data;

  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const isNew = changeType === "NEW";

  const getDiffColor = (op: string): string => {
    if (op === "INSERT") {
      return isNew ? theme.palette.gray_1000 : theme.palette.warning;
    }
    return theme.palette.gray_1000;
  };

  const renderDiffText = (chunks: { operation: string; text: string }[]) =>
    chunks
      .filter((part) => part.operation !== "DELETE")
      .map((part, idx) => (
        <span key={idx} style={{ color: getDiffColor(part.operation) }}>
          {part.text}
        </span>
      ));

  const mergeDateDiff = (chunks: { operation: string; text: string }[]) => {
    if (!chunks.length) return "";
    return chunks
      .filter((c) => c.operation === "EQUAL" || c.operation === "INSERT")
      .map((c) => c.text)
      .join("");
  };

  const normalizeDate = (raw: string) => {
    if (!raw) return "";
    const cleaned = raw.replace(/[^0-9-]/g, "");
    const parts = cleaned.split("-");
    if (parts.length >= 3) {
      const [y, m, d] = parts;
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
    return cleaned;
  };

  const mergeSourceDiff = (chunks: DiffChunk[]) =>
    chunks
      .filter((c) => c.operation === "EQUAL" || c.operation === "INSERT")
      .map((c) => c.text)
      .join("")
      .trim();

  const tagListRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = () => {
    const el = tagListRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const el = tagListRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [addedActivityTypes, addedRelatedArtists, addedRelatedEvents]);

  const scrollStep = 120;
  const scrollLeft = () =>
    tagListRef.current?.scrollBy({ left: -scrollStep, behavior: "smooth" });
  const scrollRight = () =>
    tagListRef.current?.scrollBy({ left: scrollStep, behavior: "smooth" });

  const sourceUrl = mergeSourceDiff(source);

  const getRemainingMinutes = (editedAt?: string) => {
    if (!editedAt) return "";
    const editedTime = new Date(editedAt).getTime();
    const uploadTime = editedTime + 6 * 60 * 60 * 1000;
    const diff = uploadTime - Date.now();
    const minutesLeft = Math.max(0, Math.floor(diff / 1000 / 60));
    return minutesLeft;
  };

  const handleReport = async () => {
    try {
      const res = await deckApi.reportPendingEvent(data.eventId);
      if (res.isSuccess) {
        setModalMessage("신고가 접수되었어요!");
      }
    } catch (err: any) {
      if (err.response?.status === 429) {
        setModalMessage("부적절해요 버튼은 하루에 5회만 클릭할 수 있어요!");
      } else {
        setModalMessage("신고 처리 중 오류가 발생했어요.");
      }
    } finally {
      setTimeout(() => setModalMessage(null), 3000);
    }
  };

  return (
    <TileContainer>
      <Sticker variant={isNew ? "new" : "edited"} />
      <ContentWrapper>
        <TopWrapper>
          <DateWrapper>
            <DeckDateTooltip
              startDate={normalizeDate(mergeDateDiff(startedAt))}
              endDate={normalizeDate(mergeDateDiff(endedAt))}
              isWaiting
            />
          </DateWrapper>
          <Text typo="H4">{renderDiffText(name)}</Text>
        </TopWrapper>
        {(addedActivityTypes.length > 0 ||
          addedRelatedArtists.length > 0 ||
          addedRelatedEvents.length > 0) && (
          <TagScrollArea>
            <TagsScrollWrapper ref={tagListRef}>
              {addedActivityTypes.map((type, idx) => (
                <TagWrapper key={`type-${idx}`}>
                  <TagCategory
                    category={type as TagCategoryName}
                    variant="default"
                  />
                </TagWrapper>
              ))}
              {addedRelatedArtists.map((artist) => (
                <TagWrapper key={artist.id}>
                  <Tag variant="deck">{artist.name}</Tag>
                </TagWrapper>
              ))}
              {addedRelatedEvents.map((event) => (
                <TagWrapper key={event.groupId}>
                  <Tag variant="tile">{event.title}</Tag>
                </TagWrapper>
              ))}
            </TagsScrollWrapper>
            <RightFade />
            <LeftButton onClick={scrollLeft} disabled={!canScrollLeft}>
              <LeftArrowIcon size={16} disabled={!canScrollLeft} />
            </LeftButton>
            <RightButton onClick={scrollRight} disabled={!canScrollRight}>
              <RightIcon size={16} disabled={!canScrollRight} />
            </RightButton>
          </TagScrollArea>
        )}
        {sourceUrl && (
          <SourceWrapper>
            <Text typo="Caption_2" color="gray_700">
              출처
            </Text>
            <SmallVector />
            <SourceLink
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Text typo="Caption_2" color="gray_700">
                {sourceUrl}
              </Text>
            </SourceLink>
          </SourceWrapper>
        )}
        <DescriptionText typo="Body_3">
          {renderDiffText(description)}
        </DescriptionText>
        {addedRelatedMaterials?.length > 0 && (
          <MaterialWrapper>
            <RelatedMaterialPreview materials={addedRelatedMaterials} />
          </MaterialWrapper>
        )}
        <BottomWrapper>
          <Text typo="Caption_2" color="gray_600">
            {getRemainingMinutes(editedAt)}분 후 업로드
          </Text>
          <ReportWrapper>
            <Tooltip variant="default">
              사실과 다르거나 부적절한 내용은 ‘부적절해요' 버튼으로
              신고해주세요. <br />
              여러분의 신고가 타임라인 신뢰성 향상에 도움이 됩니다.
            </Tooltip>
            <ReportTileButton
              variant="count"
              height={36}
              onClick={handleReport}
            />
          </ReportWrapper>
        </BottomWrapper>
        {modalMessage && (
          <ModalOverlay>
            <ModalBox>
              <Text typo="Body_3">{modalMessage}</Text>
            </ModalBox>
          </ModalOverlay>
        )}
      </ContentWrapper>
    </TileContainer>
  );
};

const TileContainer = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 818px;
  padding: 24px 24px 20px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.sub_200};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 12px 0 rgba(232, 232, 79, 0.25);
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  height: 20px;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  margin-top: -2px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const MaterialWrapper = styled.div`
  margin-top: 8px;
  width: 100%;
`;

const TagScrollArea = styled.div`
  position: relative;
  width: 100%;
  height: 26px;
`;

const TagsScrollWrapper = styled.div`
  display: inline-flex;
  gap: 8px;
  overflow-x: auto;
  width: 100%;
  padding-right: 50px;
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

const DescriptionText = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-word;
`;

const RightFade = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 70px;
  height: 26px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 54.86%);
  pointer-events: none;
`;

const ButtonBase = styled.button<{ disabled?: boolean }>`
  position: absolute;
  top: 0;
  border: none;
  background: transparent;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 26px;
  padding: 0 6px;
`;

const LeftButton = styled(ButtonBase)`
  right: 16px;
`;

const RightButton = styled(ButtonBase)`
  right: 0;
`;

const SourceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const SourceLink = styled.a`
  text-decoration: none;
  color: ${theme.palette.gray_700};
  font-family: "Pretendard-Regular";
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ReportWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3000;
  background: rgba(0, 0, 0, 0.2);
`;

const ModalBox = styled.div`
  display: inline-flex;
  padding: 80px 170px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
`;
