import { FlexBox } from "@/components/layouts/FlexBox";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../Text";
import { ButtonHTMLAttributes } from "react";

interface LargeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: number;
  children: string;
  disabled?: boolean;
}

export const LargeButton = ({
  width,
  children,
  disabled,
  ...props
}: LargeButtonProps) => {
  return (
    <FlexBox>
      <StyledButton width={width} disabled={disabled} {...props}>
        <Text
          typo="H4"
          color={disabled ? "primary_200" : "gray_0"}
          children={children}
        />
      </StyledButton>
    </FlexBox>
  );
};

const StyledButton = styled.button<{ width?: number }>`
  width: ${({ width }) => (width ? `${width}px` : "100%")};
  border: none;
  border-radius: 10px;
  background-color: ${({ disabled }) =>
    disabled ? theme.palette.primary_300 : theme.palette.primary_500};
  box-shadow: 0px 4px 4px 0px rgba(159, 198, 255, 0.25);
  padding: 21px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;
