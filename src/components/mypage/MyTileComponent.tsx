import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { LeftIcon } from "@/assets/icons/LeftIcon";
import { RightIcon } from "@/assets/icons/RightIcon";
import { Text } from "../atoms/Text";
import { LinkIcon } from "@/assets/icons/LinkIcon";

interface MyTileComponentProps {
  groupId: string;
  name: string;
  description: string;
  startedAt: string;
  relatedMaterials: string[];
  contributorCount: number;
}

export const MyTileComponent = ({
  name,
  description,
  startedAt,
  relatedMaterials,
  contributorCount,
}: MyTileComponentProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const yy = String(date.getFullYear()).slice(2);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yy}/${mm}/${dd}`;
  };

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
        el.scrollLeft + el.clientWidth < el.scrollWidth - paddingRight
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
          <Text
            typo="Body_1"
            color="gray_700"
            children={formatDate(startedAt)}
          />
          <Text typo="H4" color="gray_1000" children={name} />
        </TopWrapper>
        <Text typo="Body_3" children={description} />
        {relatedMaterials.length > 0 && (
          <RelatedMaterials>
            <ScrollWrapper>
              <ScrollContainer ref={scrollRef}>
                {relatedMaterials.map((url, i) => (
                  <li key={i}>
                    <MaterialLink bgImage={undefined /* 이미지 넣기 */}>
                      <LinkIconWrapper
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(url, "_blank", "noopener noreferrer");
                        }}
                        aria-label={`Open link ${url}`}
                        title={url}
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
                aria-label="Scroll Left"
                disabled={!canScrollLeft}
              >
                <LeftIcon size={24} disabled={!canScrollLeft} />
              </IconButton>
              <IconButton
                onClick={() => scrollByAmount(150)}
                aria-label="Scroll Right"
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
  border: 1px solid var(--Primary-200, #e6f0ff);
  background: var(--Gray-0, #fff);
  box-shadow: 0 4px 12px 0 rgba(159, 198, 255, 0.25);

  &:hover {
    border: 1.5px solid var(--Primary-400, #a6c6fa);
    background: var(--Primary-100, #f2f7ff);
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
  border: 1px solid var(--Gray-400, #c2c3c6);
  background-color: lightgray;
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
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
  border: none;
  background: none;
  padding: 4px;
  cursor: pointer;

  &:hover {
    filter: brightness(0.8);
  }
`;

const ContributeDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;
