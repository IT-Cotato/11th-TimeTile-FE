import { forwardRef } from "react";
import styled from "styled-components";
import { CalendarIcon } from "@/assets/icons/CalendarIcon";
import { theme } from "@/styles/theme";

interface CustomDateInputProps {
  value?: string;
  onClick?: () => void;
  placeholder?: string;
}

export const CustomDateInput = forwardRef<
  HTMLInputElement,
  CustomDateInputProps
>(({ value, onClick, placeholder }, ref) => (
  <InputWrapper onClick={onClick}>
    <StyledInput
      ref={ref}
      value={value || ""}
      placeholder={placeholder}
      readOnly
    />
    <IconWrapper>
      <CalendarIcon />
    </IconWrapper>
  </InputWrapper>
));

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 160px;
  height: 40px;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${theme.palette.primary_400};
  background: #fff;
  cursor: pointer;
`;

const StyledInput = styled.input`
  width: 100%;
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-weight: 400;
  line-height: 150%;
  font-style: normal;
  color: ${theme.palette.gray_600};
  &::placeholder {
    color: ${theme.palette.gray_600};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
