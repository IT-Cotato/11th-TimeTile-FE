"use client";
import styled from "styled-components";
import {
  ButtonsVariantType,
  ButtonsPropsType,
} from "@/model/components/Button";
import {
  BUTTONS_COLOR_TYPE,
  BUTTONS_SHAPE_TYPE,
  BUTTONS_TEXT_COLOR_TYPE,
} from "@/constants/atoms/button";
import { FlexBox } from "@/components/layouts/FlexBox";
import { Text } from "../Text";
import { theme } from "./../../../styles/theme";

/**
 * @param variant 버튼의 종류: 'addTile' | 'editTile' | 'edit | 'report'
 * @param width 가로 길이를 명시적으로 작성 (단위 px) (optional)
 * @param isLoading 버튼이 로딩 중인지에 대한 state 설정: true | false (optional)
 * @param onClick 버튼을 클릭할 때 발생하는 event 명시 (optional)
 * @param description 버튼의 설명 (optional, edit, report에만 적용)
 * @param leftChildren 버튼의 왼쪽 아이콘 (optional, edit, report에만 적용)
 **/

type PropsType = Partial<ButtonsPropsType<ButtonsVariantType>>;

export const Buttons = ({
  children,
  variant = "addTile",
  description,
  leftChildren,
  width,
  isLoading,
  onClick,
  ...props
}: PropsType) => {
  const renderButton = () => {
    if (variant === "edit" || variant === "report") {
      return (
        <FlexBox style={{ alignItems: "center", gap: "9px" }}>
          {leftChildren && <>{leftChildren}</>}
          {children && (
            <Text typo={BUTTONS_SHAPE_TYPE[variant].typo}>{children}</Text>
          )}
        </FlexBox>
      );
    } else {
      return (
        <FlexBox>
          <Text typo={BUTTONS_SHAPE_TYPE[variant].typo}>{children}</Text>
        </FlexBox>
      );
    }
  };

  return (
    <StyledButton
      variant={variant}
      width={width}
      isLoading={isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? "로딩 중..." : renderButton()}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  variant: ButtonsVariantType;
  selected?: boolean;
  width?: number;
  isLoading?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ variant }) =>
    `${BUTTONS_SHAPE_TYPE[variant].padding[0]}px ${BUTTONS_SHAPE_TYPE[variant].padding[1]}px`};
  border: none;
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  height: ${({ variant }) => `${BUTTONS_SHAPE_TYPE[variant].height}px`};
  background-color: ${({ variant }) => BUTTONS_COLOR_TYPE.default[variant]};
  border-radius: 10px;
  box-shadow: ${({ variant }) => BUTTONS_SHAPE_TYPE[variant].boxShadow};
  color: ${({ variant }) => BUTTONS_TEXT_COLOR_TYPE.default[variant]};
  cursor: pointer;
  &:disabled {
    color: ${({ variant }) =>
      variant === "addTile"
        ? `${theme.palette.primary_200}`
        : BUTTONS_TEXT_COLOR_TYPE.default[variant]};
    background-color: ${({ variant }) =>
      variant === "addTile"
        ? `${theme.palette.primary_300}`
        : BUTTONS_COLOR_TYPE.default[variant]};
    cursor: default;
  }
`;
