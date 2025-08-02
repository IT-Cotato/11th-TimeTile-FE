import { EyeFalseIcon } from "@/assets/icons/EyeFalseIcon";
import { EyeVisibleIcon } from "@/assets/icons/EyeVisibleIcon";
import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Text } from "../Text";
import { KeyOfTypo, theme } from "@/styles/theme";
import { CheckIcon } from "@/assets/icons/CheckIcon";

type InputVariant = "default" | "password" | "checkcode" | "count";

interface OnboardingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  width?: number;
  variant: InputVariant;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  timerSeconds?: number;
  label: string;
  isError?: boolean;
  errormsg?: string;
  placeholder?: string;
  isCheck?: boolean;
  required?: boolean;
  successMsg?: string;
}

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const OnboardingInput = ({
  width,
  variant,
  value,
  onChange,
  timerSeconds = 180,
  label,
  isError = false,
  errormsg,
  placeholder,
  isCheck,
  required = false,
  successMsg,
  ...props
}: OnboardingInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const renderRightContent = () => {
    if (variant === "password") {
      return (
        <>
          <EyeButton type="button" onClick={toggleShowPassword}>
            {showPassword ? <EyeVisibleIcon /> : <EyeFalseIcon />}
          </EyeButton>
          {isCheck && <CheckIcon />}
        </>
      );
    }
    if (variant === "checkcode") {
      return (
        <>
          {timerSeconds > 0 && (
            <Text color="gray_600" typo="Caption_2">
              {formatTime(timerSeconds)}
            </Text>
          )}
          {isCheck && <CheckIcon />}
        </>
      );
    }
    return null;
  };

  return (
    <Wrapper style={{ width }}>
      <InputWrapper>
        <LabelCountWrapper>
          <span>
            <Text color="gray_600" typo="Caption_3" children={label} />
            {required && (
              <Text color="primary_600" typo="Caption_3" children={"*"} />
            )}
          </span>
          {variant === "count" && (
            <CountText>
              <Text
                color="primary_600"
                typo="Caption_3"
                children={(value || "").length}
              />
              <Text color="gray_600" typo="Caption_3" children="/30" />
            </CountText>
          )}
        </LabelCountWrapper>
        <Input
          type={variant === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          typo="Caption_1"
          onChange={onChange}
          hasRightIcon={
            variant === "password" ||
            variant === "checkcode" ||
            variant === "count"
          }
          isNarrow={width === 350}
          variant={variant}
          {...props}
        />
        <RightWrapper>{renderRightContent()}</RightWrapper>
      </InputWrapper>
      {isError ? (
        <Error>
          <Text color="warning" typo="Caption_4">
            {errormsg}
          </Text>
        </Error>
      ) : successMsg ? (
        <Error>
          <Text color="gray_800" typo="Caption_4">
            {successMsg}
          </Text>
        </Error>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
`;

const InputWrapper = styled.div`
  position: relative;
`;

const LabelCountWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CountText = styled.span`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const Input = styled.input<{
  hasRightIcon?: boolean;
  typo: KeyOfTypo;
  isNarrow?: boolean;
  variant?: InputVariant;
}>`
  width: 100%;
  padding-top: 28px;
  padding-bottom: ${({ isNarrow }) => (isNarrow ? "8px" : "10px")};
  padding-left: 16px;
  padding-right: ${({ variant, hasRightIcon }) =>
    variant === "count" ? "16px" : hasRightIcon ? "66px" : "16px"};
  border-radius: 10px;
  border: 1px solid ${theme.palette.primary_400};
  ${({ typo }) => theme.typo[typo]};

  &:focus {
    outline: none;
    border: 1.5px solid ${theme.palette.primary_500};
    box-shadow: 0px 4px 4px 0px rgba(159, 198, 255, 0.25);
  }
`;

const RightWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const EyeButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Error = styled.div`
  display: flex;
  margin-top: 8px;
  padding: 1px 17px;
  align-items: center;
`;
