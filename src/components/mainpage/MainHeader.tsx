import { useState } from "react";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { MainImage } from "@/assets/images/MainImage";
import styled from "styled-components";
import { theme } from "@/styles/theme";

const images = [
  <MainImage key={0} />,
  <MainImage key={1} />,
  <MainImage key={2} />,
];

export const MainHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <Wrapper>
      <Container>
        <ArrowButton onClick={handlePrev} disabled={currentIndex === 0}>
          <MoveLeftIcon />
        </ArrowButton>
        <SliderWrapper>
          <Slider currentIndex={currentIndex}>
            {images.map((img, idx) => (
              <Slide key={idx}>{img}</Slide>
            ))}
          </Slider>
        </SliderWrapper>
        <ArrowButton
          onClick={handleNext}
          disabled={currentIndex === images.length - 1}
        >
          <MoveRightIcon />
        </ArrowButton>
      </Container>
      <Bar>
        <Progress $currentIndex={currentIndex} />
      </Bar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  align-self: stretch;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const SliderWrapper = styled.div`
  width: 1128px;
  height: 258px;
  overflow: hidden;
`;

const Slider = styled.div<{ currentIndex: number }>`
  flex: 0 0 100%;
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ currentIndex }) => -currentIndex * 100}%);
`;

const Slide = styled.div`
  min-width: 1128px;
  height: 258px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowButton = styled.button<{ disabled?: boolean }>`
  all: unset;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  color: ${({ disabled }) =>
    disabled ? theme.palette.gray_300 : theme.palette.gray_800};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bar = styled.div`
  position: relative;
  width: 150px;
  height: 3px;
  background: ${theme.palette.gray_100};
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled.div<{ $currentIndex: number }>`
  position: absolute;
  top: 0;
  left: ${({ $currentIndex }) => $currentIndex * 50}px;
  width: 50px;
  height: 3px;
  background: ${theme.palette.gray_800};
  border-radius: 2px;
  transition: left 0.3s ease-in-out;
`;
