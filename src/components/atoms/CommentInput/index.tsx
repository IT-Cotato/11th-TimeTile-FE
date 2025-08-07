import React from 'react';
import styled from 'styled-components';

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onSubmit: () => void;
  disabled: boolean;
  isFocused: boolean;
}

const CommentInput = ({
  value,
  onChange,
  onFocus,
  onBlur,
  onSubmit,
  disabled,
  isFocused,
}: Props) => {
  return (
    <Wrapper $focused={isFocused}>
      <Input
        placeholder="댓글을 입력해보세요."
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <Button onClick={onSubmit} disabled={disabled}>
        등록
      </Button>
    </Wrapper>
  );
};

export default CommentInput;

const Wrapper = styled.div<{ $focused: boolean }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1.5px solid ${({ $focused }) => ($focused ? '#A6C6FA' : '#D2D4D6')};
  border-radius: 12px;
  background-color: #fff;
  gap: 12px;
  width: 100%;
`;

const Input = styled.textarea`
  flex: 1;
  resize: none;
  border: none;
  font-size: 14px;
  outline: none;
  color: #000;
  min-height: 44px;
  max-height: 100px;
  line-height: 1.4;
  background: transparent;

  &::placeholder {
    color: #c2c3c6;
  }
`;

const Button = styled.button`
  background-color: ${({ disabled }) => (disabled ? '#BFD5F7' : '#3A5CAA')};
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  border: none;
  height: 32px;
  min-width: 50px;
`;
