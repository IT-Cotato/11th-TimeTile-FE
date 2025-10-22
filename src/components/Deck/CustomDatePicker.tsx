import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { ko } from "date-fns/locale";
import { useState } from "react";
import { theme } from "@/styles/theme";
import { FlexBox } from "../layouts/FlexBox";
import { Text } from "../atoms/Text";
import { ChevronDown } from "@/assets/icons/ChevronDown";
import { LeftIcon } from "@/assets/icons/LeftIcon";
import { RightIcon } from "@/assets/icons/RightIcon";
import { LeftArrowIcon } from "@/assets/icons/LeftArrowIcon";

interface CustomDatePickerProps {
  value: string | null;
  onChange: (date: string) => void;
  placeholder?: string;
}

export const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "날짜를 선택하세요",
}: CustomDatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );
  const [viewMode, setViewMode] = useState<"day" | "month" | "year">("day");

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
        renderCustomHeader={
          ((props: any) => {
            const { date, decreaseMonth, increaseMonth } = props;
            return (
              <Header>
                <HeaderTitle>
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
                  {viewMode !== "year" && (
                    <div onClick={toggleMode}>
                      <ChevronDown size="16" />
                    </div>
                  )}
                </HeaderTitle>
                <FlexBox gap={16}>
                  <ArrowButton onClick={decreaseMonth}>
                    <LeftArrowIcon size={20} disabled={false} />
                  </ArrowButton>
                  <ArrowButton onClick={increaseMonth}>
                    <RightIcon size={20} />
                  </ArrowButton>
                </FlexBox>
              </Header>
            );
          }) as any
        }
        showMonthYearPicker={viewMode === "month"}
        showYearPicker={viewMode === "year"}
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
  border: 1px solid var(--Primary-400, #a6c6fa);
  background: var(--Gray-0, #fff);
  outline: none;
  cursor: pointer;

  color: var(--Gray-600, #87898c);

  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-style: normal;
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
