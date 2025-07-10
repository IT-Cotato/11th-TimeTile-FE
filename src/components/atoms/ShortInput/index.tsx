import React from 'react';
import styled, { css } from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { theme } from '@/styles/theme';

interface ShortInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'tag' | 'active' | 'error' | 'notified';
  errorMessage?: string;
}

const ShortInput = ({
  value,
  onChange,
  placeholder = '',
  variant = 'default',
  errorMessage,
}: ShortInputProps) => {
  const showErrorText = variant === 'error' || variant === 'notified';

  return (
    <Outer>
      <Wrapper variant={variant}>
        <Input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </Wrapper>
      {showErrorText && errorMessage && (
        <Text typo="Caption_4" color="warning">
          {errorMessage}
        </Text>
      )}
    </Outer>
  );
};

export default ShortInput;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 480px;
`;

const Wrapper = styled.div<{ variant: ShortInputProps['variant'] }>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background: ${theme.palette.gray_0};

  ${({ variant }) => {
    switch (variant) {
      case 'tag':
        return css`
          padding: 7px 8px;
          border: 1px solid ${theme.palette.primary_400};
          gap: 10px;
        `;
      case 'active':
        return css`
          padding: 8px 208px 8px 16px;
          border: 1.5px solid ${theme.palette.primary_500};
          box-shadow: 0px 4px 4px rgba(159, 198, 255, 0.25);
        `;
      case 'notified':
        return css`
          padding: 8px 208px 8px 16px;
          border: 1.5px solid ${theme.palette.warning};
          box-shadow: 0px 4px 4px rgba(255, 86, 82, 0.25);
        `;
      case 'error':
        return css`
          padding: 8px 208px 8px 16px;
          border: 1px solid ${theme.palette.primary_400};
          gap: 6px;
        `;
      case 'default':
      default:
        return css`
          padding: 8px 208px 8px 16px;
          border: 1px solid ${theme.palette.primary_400};
        `;
    }
  }}
`;

const Input = styled.input`
  width: 100%;
  border: none;
  background: transparent;
  outline: none;
  font: ${theme.typo.Body_3};
  color: ${theme.palette.gray_700};

  &::placeholder {
    color: ${theme.palette.gray_600};
  }
`;
