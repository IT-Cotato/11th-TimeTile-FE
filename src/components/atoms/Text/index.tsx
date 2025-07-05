import styled from "@emotion/styled";
import { theme, TextType } from "@/styles/theme";
import { TextPropsType } from "@/model/components/Text";

/**
 * @param typo Typo theme 선택
 * @param color Palette theme 선택
 **/

export const Text = ({ typo, color, children, ...props }: TextPropsType) => {
  return (
    <StyledText typoKey={typo} colorKey={color} {...props}>
      {children}
    </StyledText>
  );
};

const StyledText = styled.span<{
  typoKey: TextType["typo"];
  colorKey?: TextType["color"];
}>`
  white-space: pre-wrap;
  ${({ typoKey }) => theme.typo[typoKey]};
  color: ${({ colorKey }) => {
    return colorKey && theme.palette[colorKey];
  }};
`;
