import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import { DateIcon } from '@/assets/icons/DateIcon';
import { theme } from '@/styles/theme';

export type Variant = 'default' | 'active';

export interface DateInputProps {
  value: string;
  onChange: (val: string) => void;
  variant?: Variant;
}

const DateInput = ({
  value,
  onChange,
  variant = 'default',
}: DateInputProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    if (typeof ref.current?.showPicker === 'function') {
      ref.current.showPicker();
    } else {
      ref.current?.focus();
    }
  };

  return (
    <Box variant={variant} onClick={openPicker}>
      <StyledInput
        ref={ref}
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <IconWrapper>
        <DateIcon />
      </IconWrapper>
    </Box>
  );
};

export default DateInput;

const Box = styled.div<{ variant: Variant }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  height: 40px;
  width: fit-content;
  border-radius: 10px;
  background: ${theme.palette.gray_0};
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: ${theme.palette.gray_600};
  cursor: pointer;

  ${({ variant }) =>
    variant === 'active'
      ? css`
          border: 1.5px solid ${theme.palette.primary_500};
          box-shadow: 0px 4px 4px rgba(159, 198, 255, 0.25);
        `
      : css`
          border: 1.5px solid ${theme.palette.primary_400};
        `}
`;

const StyledInput = styled.input`
  font: inherit;
  color: inherit;
  border: none;
  background: transparent;

  &::-webkit-calendar-picker-indicator {
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
    padding: 0;
    pointer-events: none;
  }

  &:focus {
    outline: none;
  }
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
