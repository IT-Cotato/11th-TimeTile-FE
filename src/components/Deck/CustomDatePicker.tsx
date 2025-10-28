import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { ko } from "date-fns/locale";
import { useEffect, useState } from "react";
import { theme } from "@/styles/theme";
import { FlexBox } from "../layouts/FlexBox";
import { Text } from "../atoms/Text";
import { ChevronDown } from "@/assets/icons/ChevronDown";
import { RightIcon } from "@/assets/icons/RightIcon";
import { LeftArrowIcon } from "@/assets/icons/LeftArrowIcon";
import { CustomDateInput } from "./CustomDateInput";

interface CustomDatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  placeholder?: string;
}

export const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
}: CustomDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  const [viewMode, setViewMode] = useState<"day" | "month" | "year">("day");

  useEffect(() => {
    if (!value) {
      setSelectedDate(null);
      return;
    }

    const parsed = value.includes("T")
      ? new Date(value)
      : new Date(value + "T00:00:00");

    setSelectedDate(parsed);
  }, [value]);

  const handleDaySelect = (date: Date | null) => {
    setSelectedDate(date);
    if (date) onChange(date.toISOString());
    setViewMode("day");
  };

  const handleSelect = (date: Date) => {
    if (viewMode === "year") {
      setSelectedDate(date);
      setViewMode("month");
    } else if (viewMode === "month") {
      setSelectedDate(date);
      setViewMode("day");
    } else {
      handleDaySelect(date);
    }
  };

  const toggleMode = () => {
    if (viewMode === "day") setViewMode("month");
    else if (viewMode === "month") setViewMode("year");
  };

  return (
    <PickerContainer>
      <StyledDatePicker
        locale={ko}
        selected={selectedDate}
        onSelect={(date: Date) => handleSelect(date)}
        onChange={(date: Date | null) => handleDaySelect(date)}
        shouldCloseOnSelect={false}
        dateFormat="yyyy-MM-dd"
        placeholderText={placeholder}
        renderCustomHeader={(props: any) => {
          const {
            date,
            decreaseMonth,
            increaseMonth,
            decreaseYear,
            increaseYear,
          } = props;

          const handlePrev = () => {
            if (viewMode === "month" || viewMode === "year") decreaseYear();
            else decreaseMonth();
          };

          const handleNext = () => {
            if (viewMode === "month" || viewMode === "year") increaseYear();
            else increaseMonth();
          };

          return (
            <Header>
              <HeaderTitle onClick={toggleMode}>
                {viewMode === "year" && (
                  <Text typo="Caption_1" color="gray_1000">
                    {`${Math.floor(date.getFullYear() / 10) * 10} - ${
                      Math.floor(date.getFullYear() / 10) * 10 + 9
                    }`}
                  </Text>
                )}
                {viewMode === "month" && (
                  <Text typo="Caption_1" color="gray_1000">
                    {`${date.getFullYear()}년`}
                  </Text>
                )}
                {viewMode === "day" && (
                  <Text typo="Caption_1" color="gray_1000">
                    {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
                  </Text>
                )}
                {viewMode !== "year" && <ChevronDown size="16" />}
              </HeaderTitle>
              <FlexBox gap={16}>
                <ArrowButton onClick={handlePrev}>
                  <LeftArrowIcon size={20} disabled={false} />
                </ArrowButton>
                <ArrowButton onClick={handleNext}>
                  <RightIcon size={20} />
                </ArrowButton>
              </FlexBox>
            </Header>
          );
        }}
        showMonthYearPicker={viewMode === "month"}
        showYearPicker={viewMode === "year"}
        customInput={<CustomDateInput placeholder={placeholder} />}
      />
    </PickerContainer>
  );
};

const PickerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
`;

const StyledDatePicker = styled(DatePicker as any)`
  display: flex;
  width: 160px;
  height: 40px;
  padding: 8px 16px;
  justify-content: center;
  align-items: flex-start;
  gap: 14px;
  border-radius: 10px;
  border: 1px solid ${theme.palette.primary_400};
  background: #fff;
  outline: none;
  cursor: pointer;
  color: ${theme.palette.gray_600};
  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  &:focus {
    border: 1.5px solid ${theme.palette.primary_500};
  }
`;

const Header = styled.div`
  display: flex;
  width: 256px;
  justify-content: space-between;
  align-items: flex-start;
`;

const HeaderTitle = styled.span`
  cursor: pointer;
  user-select: none;
  &:hover {
    color: ${theme.palette.primary_600};
  }
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: ${theme.palette.gray_700};
`;
