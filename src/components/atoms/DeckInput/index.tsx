import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { KeyOfTypo, theme } from "@/styles/theme";
import { Text } from "../Text";

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number;
  height?: number;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  showError?: boolean;
  variant?: "default" | "noCount";
}

export const DeckInput = ({
  maxLength = 50,
  height = 40,
  placeholder = "타일 이름을 입력해주세요.",
  value = "",
  onChange,
  showError = false,
  variant = "default",
  ...props
}: InputProps) => {
  const [isTouched, setIsTouched] = useState(false);
  const isOverLimit = value.length > maxLength;
  const isEmpty = value.trim() === "";

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e);
    if (!isTouched) setIsTouched(true);
  };

  let errorMessage: string | null = null;
  if (isEmpty && showError) {
    errorMessage = "타일 이름을 입력해주세요.";
  } else if (isOverLimit) {
    errorMessage = `${maxLength}자 이내로 입력해주세요.`;
  }

  const isError = (showError && (isEmpty || isOverLimit)) || isOverLimit;

  return (
    <InputContainer>
      <Input
        $height={height}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        $isError={isError}
        spellCheck={false}
        $variant={variant}
        {...props}
      />
      {variant === "default" && (
        <InfoRow>
          <div>
            {errorMessage && (
              <Text typo="Caption_4" color="warning">
                {errorMessage}
              </Text>
            )}
          </div>
          <CharCount>
            <Text
              typo="Caption_2"
              color={isOverLimit ? "warning" : "gray_1000"}
            >
              {value.length}&nbsp;
            </Text>
            <Text typo="Caption_2" color="gray_500">
              / {maxLength}자
            </Text>
          </CharCount>
        </InfoRow>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 480px;
`;

const Input = styled.textarea<{
  $height?: number;
  $isError?: boolean;
  $variant?: "default" | "noCount";
}>`
  display: flex;
  height: ${({ $height }) => ($height ? `${$height}px` : "40px")};
  padding: 8px 16px;
  align-items: center;
  align-self: stretch;
  border-radius: 10px;
  border: 1px solid
    ${({ $variant, $isError }) =>
      $variant === "noCount"
        ? theme.palette.primary_400
        : $isError
        ? theme.palette.warning
        : theme.palette.primary_400};
  background: ${theme.palette.gray_0};
  background: ${theme.palette.gray_0};

  &:focus {
    outline: none;
    border-color: ${({ $variant, $isError }) =>
      $variant === "noCount"
        ? theme.palette.primary_500
        : $isError
        ? theme.palette.warning
        : theme.palette.primary_500};
  }

  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  resize: none;
  overflow: auto;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const CharCount = styled.span``;
