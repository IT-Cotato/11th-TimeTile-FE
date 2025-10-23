"use client";

import { createGlobalStyle } from "styled-components";
import { theme } from "@/styles/theme";

export const DatePickerGlobalStyle = createGlobalStyle`

  .react-datepicker * {
    margin: 0 !important; 
    padding: 0; 
    box-sizing: border-box;
  }

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

  .react-datepicker__header {
    width: 266px;
    background: transparent;
    border-bottom: none;
    padding: 0;
  }

  .react-datepicker__week {
    display: flex;
    align-items: center;
    gap: 21px; 
    align-self: stretch;
  }

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

  .react-datepicker__day--today:not(.react-datepicker__day--selected):not(.react-datepicker__day--keyboard-selected) {
    background: transparent !important;
    color: #000 !important;
  }

  .react-datepicker__day--today:not(.react-datepicker__day--selected):not(.react-datepicker__day--keyboard-selected):hover {
    background: #f0f0f0 !important;
    color: #000 !important;
  }

  .react-datepicker__day--keyboard-selected{
    color: #000 !important;
    box-shadow: 0 0 8px rgba(128, 169, 242, 0.3);
  }

  .react-datepicker__day--today.react-datepicker__day--keyboard-selected {
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
    border-radius: 10px !important;
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

  .react-datepicker__day--outside-month {
    color: ${theme.palette.gray_600} !important;
  }

  .react-datepicker__day--outside-month:hover {
    background: transparent !important;
    color: ${theme.palette.gray_600} !important;
  }

  .react-datepicker__month {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex: 1 1 auto !important;
    height: auto !important;
  }

  .react-datepicker__monthPicker {
    display: grid !important;
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 16px 31px !important;
    padding-top: 24px;
  }

  .react-datepicker__month-wrapper {
    display: contents !important;
  }

  .react-datepicker__month-text {
    border-radius: 16px;
    color: ${theme.palette.gray_1000};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-family: "Pretendard-Regular";
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }

  .react-datepicker__month .react-datepicker__month-text {
    width: 43px;
    height: 32px;
    padding: 4px 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    cursor: pointer;
  }

  .react-datepicker__month-text:hover {
    background: #f0f0f0 !important;
    color: #000 !important;
    border-radius: 16px !important;
  }

  .react-datepicker__month-text--selected {
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
    border-radius: 16px !important;
  }
  
  .react-datepicker__month-text--today.react-datepicker__month-text--keyboard-selected {
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
    border-radius: 16px !important;
  }

  .react-datepicker__month-text--selected:hover {
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
    border-radius: 16px !important;
  }

  .react-datepicker__month-text--keyboard-selected{
    color: #000 !important;
    box-shadow: 0 0 8px rgba(128, 169, 242, 0.3);
  }

  .react-datepicker__month-text--today {
    font-weight: 400 !important;
  }

  .react-datepicker__year-wrapper {
    display: flex;
    max-width: 266px;
    padding-top: 24px;
    height: 156px;
    align-items: center;
    align-content: center;
    gap: 8px 36px;
    align-self: stretch;
    flex-wrap: wrap;
  }

  .react-datepicker__year-text {
    display: grid !important;
    place-items: center;
    width: 64px;
    height: 33px;
    border-radius: 16px;
    color: ${theme.palette.gray_1000};
    cursor: pointer;
    font-family: "Pretendard-Regular";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }


  .react-datepicker__year-text:hover {
    background: #f0f0f0 !important;
    color: #000 !important;
    border-radius: 16px !important;
  }

  .react-datepicker__year-text--today {
    font-weight: 400 !important;
  }

    .react-datepicker__year-text--keyboard-selected {
    background: transparent !important;
    color: ${theme.palette.gray_1000} !important;
    box-shadow: none !important;
  }

  .react-datepicker__year-text--today.react-datepicker__year-text--keyboard-selected {
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
    border-radius: 16px !important;
  } 

  .react-datepicker__year-text--selected {
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
    border-radius: 16px !important;
  }

  .react-datepicker__year-text--selected:hover {
    background: ${theme.palette.primary_500} !important;
    color: #fff !important;
    border-radius: 16px !important;
  }

`;
