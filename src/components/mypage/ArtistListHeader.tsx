import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { theme } from "@/styles/theme";
import { NextIcon } from "@/assets/icons/NextIcon";
import { NextIconHover } from "@/assets/icons/NextIconHover";

interface Artist {
  id: string;
  name: string;
}

interface ArtistListHeaderProps {
  artists: Artist[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const ArtistListHeader = ({
  artists,
  selectedId,
  onSelect,
}: ArtistListHeaderProps) => {
  const [isHover, setIsHover] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleNextClick = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <Wrapper>
      <ScrollContainer ref={scrollRef}>
        {artists.map((artist) => (
          <TabButton
            key={artist.id}
            $isSelected={artist.id === selectedId}
            onClick={() => onSelect(artist.id)}
          >
            <Text
              typo="H4"
              color="gray_800"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {artist.name}
            </Text>
          </TabButton>
        ))}
        <Spacer />
      </ScrollContainer>
      <NextButton
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={handleNextClick}
      >
        {isHover ? <NextIconHover /> : <NextIcon />}
      </NextButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid ${theme.palette.gray_200};
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 56px;
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding-right: 48px;
`;

const Spacer = styled.div`
  flex: 0 0 48px;
`;

const TabButton = styled.button<{ $isSelected: boolean }>`
  position: relative;
  padding-bottom: 17px;
  background: none;
  border: none;
  font-size: 16px;
  white-space: nowrap;
  cursor: pointer;

  ${({ $isSelected }) =>
    $isSelected &&
    `
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 5px;
      border-radius: 5px 5px 0 0;
      background: var(--Primary-400, #A6C6FA);
    }
  `}
`;

const NextButton = styled.button`
  position: absolute;
  right: 0;
  top: 30%;
  height: 100%;
  transform: translateY(-50%);
  background: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
