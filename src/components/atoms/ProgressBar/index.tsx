import { theme } from "@/styles/theme";
import styled from "styled-components";

interface ProgressBarProps {
  currentStep: number;
  totalStep: number;
}

export const ProgressBar = ({ currentStep, totalStep }: ProgressBarProps) => {
  const widthPercent = (currentStep / totalStep) * 100;

  return (
    <BarWrapper>
      <BarFill style={{ width: `${widthPercent}%` }} />
    </BarWrapper>
  );
};

const BarWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: ${theme.palette.gray_100};

  @media (max-width: 480px) {
    display: none;
  }
`;

const BarFill = styled.div`
  position: absolute;
  height: 100%;
  border-radius: 2px;
  background-color: ${theme.palette.primary_400};
`;
