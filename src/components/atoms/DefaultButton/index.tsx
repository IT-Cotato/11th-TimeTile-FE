"use client";
import styled from "styled-components";
import {
  DefaultButtonVariantType,
  DefaultButtonPropsType,
} from "@/model/components/Button";
import {
  DEFAULT_BUTTON_COLOR_TYPE,
  DEFAULT_BUTTON_SHAPE_TYPE,
  DEFAULT_TEXT_COLOR_TYPE,
} from "@/constants/atoms/button";
import { FlexBox } from "@/components/layouts/FlexBox";
import { Text } from "../Text";

/**
 * @param variant 버튼의 종류: 'follow' | 'addTile' | 'editTile' | 'edit'
 * @param selected follow 버튼의 선택 상태: true | false (optional, follow에만 적용)
 * @param width 가로 길이를 명시적으로 작성 (단위 px) (optional)
 * @param isLoading 버튼이 로딩 중인지에 대한 state 설정: true | false (optional)
 * @param onClick 버튼을 클릭할 때 발생하는 event 명시 (optional)
 * @param editDescription edit 버튼의 설명 (optional, edit에만 적용)
 * @param editLeftChildren edit 버튼의 왼쪽 아이콘 (optional, edit에만 적용)
 */

type PropsType = Partial<DefaultButtonPropsType<DefaultButtonVariantType>>;

export const DefaultButton = ({
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
    if (variant === "edit" || "report") {
      return (
        <FlexBox style={{ alignItems: "center", gap: "9px" }}>
          {leftChildren && <>{leftChildren}</>}
          {children && (
            <Text typo={DEFAULT_BUTTON_SHAPE_TYPE[variant].typo}>
              {children}
            </Text>
          )}
        </FlexBox>
      );
    } else {
      return <FlexBox>{children}</FlexBox>;
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
  variant: DefaultButtonVariantType;
  selected?: boolean;
  width?: number;
  isLoading?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ variant }) =>
    `${DEFAULT_BUTTON_SHAPE_TYPE[variant].padding[0]}px ${DEFAULT_BUTTON_SHAPE_TYPE[variant].padding[1]}px`};
  border: none;
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  height: ${({ variant }) => `${DEFAULT_BUTTON_SHAPE_TYPE[variant].height}px`};
  background-color: ${({ variant }) =>
    DEFAULT_BUTTON_COLOR_TYPE.default[variant]};
  border-radius: 10px;
  box-shadow: ${({ variant }) => DEFAULT_BUTTON_SHAPE_TYPE[variant].boxShadow};
  color: ${({ variant }) => DEFAULT_TEXT_COLOR_TYPE.default[variant]};
`;
