import { FlexBox } from "@/components/layouts/FlexBox";
import Svg from "../Svg";
import { MusicIcon } from "@/assets/icons/MusicIcon";
import { Text } from "../Text";
import styled from "styled-components";
import { TAG_COLOR_TYPE, TAG_TEXT_COLOR_TYPE } from "@/constants/atoms/tag";

interface PropsType {
  variant: "tile" | "deck" | "song";
  children?: string;
  onClick?: () => void;
}

export const Tag = ({ variant, onClick, children, ...props }: PropsType) => {
  const renderTag = () => {
    if (variant === "song") {
      return (
        <FlexBox justify="center" align="center" gap={6}>
          <Svg children={<MusicIcon />} />
          <Text typo="Caption_4" color="primary_600" children={children} />
        </FlexBox>
      );
    }
    return (
      <FlexBox>
        <StyledTag variant={variant}>
          <Text typo="Caption_1">{children}</Text>
        </StyledTag>
      </FlexBox>
    );
  };
  return <div style={{ cursor: "pointer" }}>{renderTag()}</div>;
};

const StyledTag = styled.div<{
  variant: "tile" | "deck";
}>`
  padding: 4px 12px;
  background-color: ${({ variant }) => TAG_COLOR_TYPE[variant]};
  border-radius: 13px;
  color: ${({ variant }) => TAG_TEXT_COLOR_TYPE[variant]};
`;
