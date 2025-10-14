import { useState } from "react";
import styled from "styled-components";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { Text } from "@/components/atoms/Text";
import { theme } from "@/styles/theme";

interface YearScrollerProps {
  years: number[];
  yearSchedules: Record<number, string[]>;
  onYearSelect?: (year: number | null) => void;
}

export const YearScroller = ({
  years,
  yearSchedules,
  onYearSelect,
}: YearScrollerProps) => {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleCount = 7;
  const endIndex = Math.min(currentIndex + visibleCount, years.length);

  const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + 1, years.length - visibleCount));

  const handleYearClick = (year: number) => {
    const newSelected = selectedYear === year ? null : year;
    setSelectedYear(newSelected);
    onYearSelect?.(newSelected);
  };

  return (
    <Wrapper>
      <ScrollerWrapper>
        <IconWrapper onClick={handlePrev} disabled={currentIndex === 0}>
          <MoveLeftIcon
            color={
              currentIndex === 0
                ? theme.palette.gray_300
                : theme.palette.gray_1000
            }
          />
        </IconWrapper>

        <YearsContainer>
          {years.slice(currentIndex, endIndex).map((year) => (
            <YearItem
              key={year}
              onMouseEnter={() => setHoveredYear(year)}
              onMouseLeave={() => setHoveredYear(null)}
              onClick={() => handleYearClick(year)}
            >
              <Text
                typo={
                  selectedYear === year
                    ? "Body_1"
                    : hoveredYear === year
                    ? "H5"
                    : "Body_3"
                }
                color="gray_1000"
              >
                {year}
              </Text>
              {hoveredYear === year && yearSchedules[year] && (
                <Tooltip>
                  {yearSchedules[year].map((schedule, idx) => (
                    <Text key={idx} typo="Caption_4" color="gray_900">
                      {schedule}
                    </Text>
                  ))}
                </Tooltip>
              )}
            </YearItem>
          ))}
        </YearsContainer>

        <IconWrapper onClick={handleNext} disabled={endIndex >= years.length}>
          <MoveRightIcon
            color={
              endIndex >= years.length
                ? theme.palette.gray_300
                : theme.palette.gray_1000
            }
          />
        </IconWrapper>
      </ScrollerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ScrollerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const IconWrapper = styled.div<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  display: flex;
  align-items: center;
`;

const YearsContainer = styled.div`
  display: flex;
  width: 536px;
  gap: 32px;
`;

const YearItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 47.5px;
  height: 20px;
  justify-content: center;
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  margin-bottom: 8px;
  display: inline-flex;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  background-color: ${theme.palette.gray_0};
  border: 1px solid ${theme.palette.gray_200};
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
`;
