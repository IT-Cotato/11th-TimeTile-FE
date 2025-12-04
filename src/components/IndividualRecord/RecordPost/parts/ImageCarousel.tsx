import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LeftArrowIcon } from "@/assets/icons/LeftArrowIcon";
import { RightArrowIcon1 } from "@/assets/icons/RightArrowIcon1";

export type ImageCarouselProps = {
  images: string[];
  onImageClick: (index: number) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  onScrollLeft?: () => void;
  onScrollRight?: () => void;
};

export default function ImageCarousel({
  images,
  onImageClick,
  containerRef,
  onScrollLeft,
  onScrollRight,
}: ImageCarouselProps) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const atStart = scrollLeft <= 0;
      const atEnd = scrollLeft + clientWidth >= scrollWidth - 1; // -1은 부동소수 오차 보정
      setIsAtStart(atStart);
      setIsAtEnd(atEnd);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 상태 확인

    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  if (!images?.length) return null;

  return (
    <ImageContainer>
      <ImageWrapper>
        {!isAtStart && <BlurOverlay position="left" />}
        {!isAtEnd && <BlurOverlay position="right" />}

        <ImageGrid ref={containerRef}>
          {images.map((img, index) => (
            <PostImage
              key={`${img}-${index}`}
              src={img}
              alt={`post-image-${index}`}
              onClick={() => onImageClick(index)}
            />
          ))}
        </ImageGrid>
      </ImageWrapper>
      <ArrowGroup>
        <ArrowButton onClick={onScrollLeft} aria-label="왼쪽">
          <LeftArrowIcon />
        </ArrowButton>
        <ArrowButton onClick={onScrollRight} aria-label="오른쪽">
          <RightArrowIcon1 />
        </ArrowButton>
      </ArrowGroup>
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  flex-grow: 1;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  overflow: hidden;
  margin-bottom: 40px;
`;

const ImageGrid = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 8px 0;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PostImage = styled.img`
  width: 274px;
  height: 232px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
  cursor: pointer;
`;

const ArrowGroup = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-100%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 2;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
`;

const BlurOverlay = styled.div<{ position: "left" | "right" }>`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  ${({ position }) => position}: 0;
  background: linear-gradient(
    to ${({ position }) => (position === "left" ? "right" : "left")},
    white 0%,
    transparent 100%
  );
  pointer-events: none;
  z-index: 1;
`;
