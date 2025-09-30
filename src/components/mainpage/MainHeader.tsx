import { useEffect, useRef, useState } from "react";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { MainImage } from "@/assets/images/MainImage";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { MainImage2 } from "@/assets/images/MainImage2";
import { MainImage3 } from "@/assets/images/MainImage3";
import { MainImage4 } from "@/assets/images/MainImage4";
import { MainImage5 } from "@/assets/images/MainImage5";

const images = [
  <MainImage key={0} />,
  <MainImage2 key={1} />,
  <MainImage3 key={2} />,
  <MainImage4 key={3} />,
  <MainImage5 key={4} />,
];

export const MainHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    }, 5000);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    startAutoSlide();
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1);
    startAutoSlide();
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Wrapper>
      <Container>
        <ArrowButton onClick={handlePrev} disabled={currentIndex === 0}>
          <MoveLeftIcon />
        </ArrowButton>
        <SliderWrapper>
          <Slider currentindex={currentIndex}>
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
        <Progress $currentIndex={currentIndex} total={images.length} />
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

const Slider = styled.div<{ currentindex: number }>`
  flex: 0 0 100%;
  display: flex;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${({ currentindex }) => -currentindex * 100}%);
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

const Progress = styled.div<{ $currentIndex: number; total: number }>`
  position: absolute;
  top: 0;
  left: ${({ $currentIndex, total }) => ($currentIndex * 100) / total}%;
  width: ${({ total }) => 100 / total}%;
  height: 3px;
  background: ${theme.palette.gray_800};
  border-radius: 2px;
  transition: left 0.3s ease-in-out;
`;
