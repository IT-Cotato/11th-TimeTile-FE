import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { LeftIcon } from "@/assets/icons/LeftIcon";
import { RightIcon } from "@/assets/icons/RightIcon";
import { Text } from "../atoms/Text";
import { LinkIcon } from "@/assets/icons/LinkIcon";
import { Tag } from "../atoms/Tag";
import { TagCategory } from "../atoms/TagCategory";
import { TagCategoryName } from "@/model/common/tagcategory";
import { theme } from "@/styles/theme";

interface RelatedArtist {
  id: string;
  name: string;
  imageUrl: string;
}

interface RelatedEvent {
  groupId: string;
  name: string;
}

interface MyTileComponentProps {
  groupId: string;
  name: string;
  description: string;
  startedAt: string;
  relatedMaterials: string[];
  contributorCount: number;
  activityTypes: string[];
  relatedArtists: RelatedArtist[];
  relatedEvents: RelatedEvent[];
}

export const MyTileComponent = ({
  name,
  description,
  startedAt,
  relatedMaterials,
  contributorCount,
  activityTypes,
  relatedArtists,
  relatedEvents,
}: MyTileComponentProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yy}/${mm}/${dd}`;
  };

  /**태그 스크롤**/
  const tagsRef = useRef<HTMLDivElement>(null);
  const [canScrollTagsLeft, setCanScrollTagsLeft] = useState(false);
  const [canScrollTagsRight, setCanScrollTagsRight] = useState(false);

  useEffect(() => {
    const el = tagsRef.current;
    if (!el) return;

    const paddingRight = 30;

    const checkScroll = () => {
      if (!tagsRef.current) return;
      const el = tagsRef.current;

      setCanScrollTagsLeft(el.scrollLeft > 0);
      setCanScrollTagsRight(
        el.scrollLeft + el.clientWidth < el.scrollWidth - paddingRight - 1
      );
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [activityTypes, relatedArtists, relatedEvents]);

  const scrollTagsBy = (amount: number) => {
    if (!tagsRef.current) return;
    tagsRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  /**RelatedMaterials 스크롤**/
  const scrollRef = useRef<HTMLUListElement>(null);
  const [showFade, setShowFade] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const paddingRight = 50;

    const checkScroll = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(
        el.scrollLeft < el.scrollWidth - el.clientWidth - paddingRight - 1
      );
    };

    checkScroll();
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [relatedMaterials]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const checkOverflow = () => {
      setShowFade(el.scrollWidth > el.clientWidth);
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [relatedMaterials]);

  const scrollByAmount = (amount: number) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <Container>
      <Wrapper>
        <TopWrapper>
          <Text typo="Body_1" color="gray_700">
            {formatDate(startedAt)}
          </Text>
          <Text typo="H4" color="gray_1000">
            {name}
          </Text>
        </TopWrapper>
        {(activityTypes.length > 0 ||
          relatedArtists.length > 0 ||
          relatedEvents.length > 0) && (
          <TagsScrollWrapper>
            <TagsScrollContainer ref={tagsRef}>
              {activityTypes.map((type, idx) => (
                <TagWrapper key={`type-${idx}`}>
                  <TagCategory
                    category={type as TagCategoryName}
                    variant="default"
                  />
                </TagWrapper>
              ))}
              {relatedArtists.map((artist) => (
                <TagWrapper key={artist.id}>
                  <Tag variant="deck">{artist.name}</Tag>
                </TagWrapper>
              ))}
              {relatedEvents.map((event) => (
                <TagWrapper key={event.groupId}>
                  <Tag variant="tile">{event.name}</Tag>
                </TagWrapper>
              ))}
            </TagsScrollContainer>
            <TagsIconControls>
              <IconButton
                onClick={() => scrollTagsBy(-150)}
                disabled={!canScrollTagsLeft}
              >
                <LeftIcon size={16} disabled={!canScrollTagsLeft} />
              </IconButton>
              <IconButton
                onClick={() => scrollTagsBy(150)}
                disabled={!canScrollTagsRight}
              >
                <RightIcon size={16} disabled={!canScrollTagsRight} />
              </IconButton>
            </TagsIconControls>
          </TagsScrollWrapper>
        )}
        <Text typo="Body_3">{description}</Text>
        {relatedMaterials.length > 0 && (
          <RelatedMaterials>
            <ScrollWrapper>
              <ScrollContainer ref={scrollRef}>
                {relatedMaterials.map((url, i) => (
                  <li key={i}>
                    <MaterialLink>
                      <LinkIconWrapper
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(url, "_blank", "noopener noreferrer");
                        }}
                      >
                        <LinkIcon />
                      </LinkIconWrapper>
                    </MaterialLink>
                  </li>
                ))}
              </ScrollContainer>
              {showFade && <FadeOverlay />}
            </ScrollWrapper>
            <IconControls>
              <IconButton
                onClick={() => scrollByAmount(-150)}
                disabled={!canScrollLeft}
              >
                <LeftIcon size={24} disabled={!canScrollLeft} />
              </IconButton>
              <IconButton
                onClick={() => scrollByAmount(150)}
                disabled={!canScrollRight}
              >
                <RightIcon size={24} disabled={!canScrollRight} />
              </IconButton>
            </IconControls>
          </RelatedMaterials>
        )}
        <ContributeDiv>
          <Text typo="Caption_2">{contributorCount}명 참여했어요</Text>
        </ContributeDiv>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 902px;
  padding: 24px 24px 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_200};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 12px 0 rgba(159, 198, 255, 0.25);

  &:hover {
    border: 1.5px solid ${theme.palette.primary_400};
    background: ${theme.palette.primary_100};
    box-shadow: 0 4px 12px 0 rgba(159, 198, 255, 0.25);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
  align-self: stretch;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  align-items: center;
`;

const RelatedMaterials = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ScrollWrapper = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`;

const ScrollContainer = styled.ul`
  display: flex;
  gap: 8px;
  padding-right: 50px;
  margin: 0;
  list-style: none;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FadeOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 142px;
  pointer-events: none;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 61.54%);

  ${Container}:hover & {
    background: linear-gradient(
      90deg,
      rgba(242, 247, 255, 0) 0%,
      #f2f7ff 61.54%
    );
  }
`;

const MaterialLink = styled.div<{ bgImage?: string }>`
  position: relative;
  flex-shrink: 0;
  width: 168px;
  height: 142px;
  border-radius: 10px;
  border: 1px solid ${theme.palette.gray_400};
  background-color: ${theme.palette.gray_300};
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.palette.gray_300};
  font-size: 24px;
  text-decoration: none;
  overflow: hidden;

  background-image: ${({ bgImage }) => (bgImage ? `url(${bgImage})` : "none")};
`;

const LinkIconWrapper = styled.button`
  all: unset;
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  border-radius: 50%;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconControls = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const IconButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const ContributeDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const TagsScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 43px;
  width: 100%;
  position: relative;
`;

const TagsScrollContainer = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-right: 30px;
  flex-wrap: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
  flex: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagsIconControls = styled.div`
  display: inline-flex;
`;

const TagWrapper = styled.div`
  flex-shrink: 0;
`;
