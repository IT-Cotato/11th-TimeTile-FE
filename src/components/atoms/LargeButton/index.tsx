import { FlexBox } from "@/components/layouts/FlexBox";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../Text";
import { ButtonHTMLAttributes } from "react";
import Svg from "../Svg";
import { KakaoIcon } from "@/assets/icons/KakaoIcon";
import { GoogleIcon } from "@/assets/icons/GoogleIcon";

interface LargeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "default" | "kakao" | "google";
  width?: number;
  children?: string;
  disabled?: boolean;
}

export const LargeButton = ({
  variant,
  width,
  children,
  disabled,
  ...props
}: LargeButtonProps) => {
  if (variant === "default") {
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
  }

  if (variant === "kakao") {
    return (
      <FlexBox>
        <KakaoButton width={width} disabled={disabled} {...props}>
          <Svg children={<KakaoIcon />} />
          <Text typo="H5" color="gray_800" children={children} />
        </KakaoButton>
      </FlexBox>
    );
  }

  if (variant === "google") {
    return (
      <FlexBox>
        <GoogleButton width={width} disabled={disabled} {...props}>
          <Svg children={<GoogleIcon />} />
          <Text typo="H5" color="gray_800" children={children} />
        </GoogleButton>
      </FlexBox>
    );
  }
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

const KakaoButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: rgba(250, 224, 76, 1);
  box-shadow: none;
`;

const GoogleButton = styled(StyledButton)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-color: ${theme.palette.gray_20};
  border: 1px solid ${theme.palette.gray_200};
  box-shadow: none;
`;
