import React from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { theme } from '@/styles/theme';

interface Props {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  placeholder?: string;
}

const BorderBottomInput = ({
  value,
  onChange,
  maxLength = 50,
  placeholder = '타일 이름',
}: Props) => {
  const isError = value.length > maxLength;

  return (
    <Container>
      <StyledInput
        value={value}
        onChange={e => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      {isError && (
        <Text typo="Caption_4" color="warning">
          50자 이내로 입력해주세요.
        </Text>
      )}
    </Container>
  );
};

export default BorderBottomInput;

const Container = styled.div`
  width: 712px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding-bottom: 4px;
  background-color: transparent;
  color: ${theme.palette.gray_700};
  font: ${theme.typo.H3};

  border: 0;
  border-style: none;
  border-bottom: 1px solid ${theme.palette.primary_400};
  border-collapse: collapse;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.palette.primary_400};
  }
`;
