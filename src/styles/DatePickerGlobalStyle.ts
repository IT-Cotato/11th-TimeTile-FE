"use client";

import { createGlobalStyle } from "styled-components";
import { theme } from "@/styles/theme";

export const DatePickerGlobalStyle = createGlobalStyle`

  /* 모든 요소의 기본 margin 제거 */
.react-datepicker * {
  margin: 0 !important; 
   padding: 0; 
  box-sizing: border-box;
}

  /* 달력 전체 박스 */
  .react-datepicker {
     display: flex;
  flex-direction: column;
  height: auto !important;
    width: 306px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid ${theme.palette.primary_300};
    box-shadow: 0 4px 12px rgba(31, 61, 136, 0.15);
    font-family: "Pretendard-Regular";
  }

  /* 헤더 부분 */
  .react-datepicker__header {
    width: 266px;
    background: transparent;
    border-bottom: none;
    padding: 0;
  }

    /* 각 week 행 */
  .react-datepicker__week {
    display: flex;
    align-items: center;
    gap: 21px; 
    align-self: stretch;

  }

  /* day 셀 */
  .react-datepicker__day {
    width: 20px;
    height: 20px;
    padding: 1px 4px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--Gray-1000, #000);
    font-family: "Pretendard-Medium";
    font-size: 12px;
    font-weight: 500;
    line-height: 150%;
    border-radius: 10px;
  }

  .react-datepicker__day:hover {
    border-radius: 10px !important;
  }

  .react-datepicker__day--selected {
    background: ${theme.palette.primary_500};
    color: #fff;
    box-shadow: 0 0 8px rgba(128, 169, 242, 0.3);
  }

  .react-datepicker__day--selected:hover {
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
    border-radius: 10px !important;
  }

  .react-datepicker__day--today:hover {
    border-radius: 10px !important;
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
  }

    /* 오늘 날짜이지만 선택되지 않은 경우, 다른 날짜가 선택되어 있을 때 */
  .react-datepicker__day--today:not(.react-datepicker__day--selected):not(.react-datepicker__day--keyboard-selected) {
    background: transparent !important;
    color: #000 !important;
  }

    /* 오늘 날짜이지만 다른 날짜가 선택된 상태에서 hover하면 일반 hover로 처리 */
  .react-datepicker__day--today:not(.react-datepicker__day--selected):not(.react-datepicker__day--keyboard-selected):hover {
    background: #f0f0f0 !important;
    color: #000 !important;
  }

  .react-datepicker__day--keyboard-selected{
    background: ${theme.palette.primary_500};
    color: #fff;
    box-shadow: 0 0 8px rgba(128, 169, 242, 0.3);
  }

  .react-datepicker__day-names{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    color: var(--Gray-1000, #000);
    font-family: "Pretendard-Medium";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    padding-top: 24px;
    padding-bottom: 16px;
  }

  .react-datepicker__day-name{
    width: 11px;
    height: 8px;
    line-height: 0;
  }

  /* 이번 달이 아닌 날짜 (이전/다음 달 일부) */
  .react-datepicker__day--outside-month {
    color: ${theme.palette.gray_600} !important;
  }

  /* hover했을 때도 색상 유지 */
  .react-datepicker__day--outside-month:hover {
    background: transparent !important;
    color: ${theme.palette.gray_600} !important;
  }



  /* month 선택 모드 */
  .react-datepicker__month {
    display: flex;
  flex: 1 1 auto !important;
  height: auto !important;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    align-self: stretch;
  }

.react-datepicker__month-container {
  flex: 1 1 auto !important;
  height: auto !important;
  overflow: visible !important;
}

  .react-datepicker__month-text {
    width: 70px;
    height: 36px;
    line-height: 36px;
    border-radius: 8px;
    color: ${theme.palette.gray_700};
  }

  .react-datepicker__month-text:hover {
    background: ${theme.palette.primary_50};
  }

  .react-datepicker__month-text--selected {
    background: ${theme.palette.primary_500};
    color: white;
  }

  /* year 선택 모드 */
  .react-datepicker__year-text {
    width: 70px;
    height: 36px;
    line-height: 36px;
    border-radius: 8px;
    color: ${theme.palette.gray_700};
  }

  .react-datepicker__year-text:hover {
    background: ${theme.palette.primary_50};
  }

  .react-datepicker__year-text--selected {
    background: ${theme.palette.primary_500};
    color: white;
  }
`;
