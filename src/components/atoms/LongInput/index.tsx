import React from 'react';
import styled, { css } from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { theme } from '@/styles/theme';

type VariantType = 'default' | 'active' | 'notified' | 'error';

interface LongInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
  variant?: VariantType;
  errorMessage?: string;
}

const LongInput = ({
  value,
  onChange,
  maxLength = 200,
  placeholder = '',
  variant = 'default',
  errorMessage,
}: LongInputProps) => {
  const isOverLimit = value.length > maxLength;
  const resolvedVariant: VariantType = isOverLimit ? 'error' : variant;

  const finalErrorMessage =
    resolvedVariant === 'error'
      ? '200자 내로 입력해주세요.'
      : resolvedVariant === 'notified'
        ? errorMessage
        : undefined;

  return (
    <Outer>
      <Wrapper variant={resolvedVariant}>
        <Textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </Wrapper>
      {finalErrorMessage && (
        <ErrorText>
          <Text typo="Caption_4" color="warning">
            {finalErrorMessage}
          </Text>
        </ErrorText>
      )}
    </Outer>
  );
};

export default LongInput;

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Wrapper = styled.div<{ variant: VariantType }>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  height: 166px;
  width: 480px;
  background: ${theme.palette.gray_0};

  ${({ variant }) => {
    switch (variant) {
      case 'active':
        return css`
          padding: 11px 16px;
          border: 1.5px solid ${theme.palette.primary_500};
          box-shadow: 0px 4px 4px rgba(159, 198, 255, 0.25);
        `;
      case 'notified':
        return css`
          padding: 11px 16px;
          border: 1.5px solid ${theme.palette.warning};
          box-shadow: 0px 4px 4px rgba(255, 86, 82, 0.25);
        `;
      case 'error':
        return css`
          padding: 11px 16px;
          border: 1px solid ${theme.palette.primary_400};
        `;
      case 'default':
      default:
        return css`
          padding: 11px 16px;
          border: 1px solid ${theme.palette.primary_400};
        `;
    }
  }}
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  background: transparent;
  outline: none;
  font: ${theme.typo.Body_3};
  color: ${theme.palette.gray_700};

  &::placeholder {
    color: ${theme.palette.gray_600};
  }
`;

const ErrorText = styled.div`
  padding-left: 16px;
`;
