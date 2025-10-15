import { FlexBox } from "@/components/layouts/FlexBox";
import {
  ReportTileButtonPropsType,
  ReportTileButtonVariantType,
} from "@/model/components/Button";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import Svg from "../Svg";
import { Text } from "../Text";
import { Frown } from "@/assets/icons/Frown";

type PropsType = Partial<
  ReportTileButtonPropsType<ReportTileButtonVariantType>
>;
export const ReportTileButton = ({
  variant = "default",
  children,
  width,
  rightChildren = 10,
  onClick,
  ...props
}: PropsType) => {
  const renderButton = () => {
    if (variant === "default") {
      return (
        <FlexBox gap={4}>
          <Svg children={<Frown />} />
          <Text typo="Caption_2">{children}</Text>
        </FlexBox>
      );
    } else {
      return (
        <FlexBox gap={8}>
          <Text typo="Caption_2" children="부적절해요" />
          <StyledText>{rightChildren}</StyledText>
        </FlexBox>
      );
    }
  };
  return (
    <>
      <StyledButton
        variant={variant}
        width={width}
        onClick={onClick}
        {...props}
      >
        {renderButton()}
      </StyledButton>
    </>
  );
};

const StyledButton = styled.button<{
  variant: ReportTileButtonVariantType;
  width?: number;
}>`
  width: ${({ width }) => (width ? `${width}px` : 109)};
  height: 44px;
  padding: 8px 12px;
  background-color: ${theme.palette.warning_2};
  color: ${theme.palette.warning};
  border-radius: 10px;
  border: none;
  z-index: 999;
`;

const StyledText = styled.div`
  font-family: "Pretendard-SemiBold", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
`;
