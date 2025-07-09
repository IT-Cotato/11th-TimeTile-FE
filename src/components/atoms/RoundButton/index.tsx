import { ClockIcon } from "@/assets/icons/ClockIcon";
import { EditIcon } from "@/assets/icons/EditIcon";
import { EyeTrueIcon } from "@/assets/icons/EyeTrueIcon";
import { FlexBox } from "@/components/layouts/FlexBox";
import {
  RoundButtonPropsType,
  RoundButtonVariantType,
} from "@/model/components/Button";
import styled from "styled-components";
import { theme } from "@/styles/theme";

type PropsType = Partial<RoundButtonPropsType<RoundButtonVariantType>>;
export const RoundButton = ({
  children,
  variant = "edit",
  width = 32,
  onClick,
  ...props
}: PropsType) => {
  const renderIcon = () => {
    switch (variant) {
      case "edit":
        return <EditIcon />;
      case "viewmode":
        return <EyeTrueIcon />;
      case "waiting":
        return <ClockIcon />;
      default:
        return null;
    }
  };

  return (
    <StyledRoundButton
      variant={variant}
      width={width}
      onClick={onClick}
      {...props}
    >
      <FlexBox>{renderIcon()}</FlexBox>
    </StyledRoundButton>
  );
};

const StyledRoundButton = styled.button<{
  variant: RoundButtonVariantType;
  width?: number;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  padding: 6px;
  width: ${({ width }) => (width ? `${width}px` : "32px")};
  height: ${({ width }) => (width ? `${width}px` : "32px")};
  border-radius: 50%;
  aspect-ratio: 1/1;
  border: 2px solid ${theme.palette.sub_600};
  background-color: ${theme.palette.gray_0};
  color: ${theme.palette.sub_600};
  cursor: pointer;
  &:disabled {
    color: ${theme.palette.gray_300};
    border: 2px solid ${theme.palette.gray_300};
  }
`;
