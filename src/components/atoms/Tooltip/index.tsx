import styled from "styled-components";
import { Text } from "../Text";
import { theme } from "@/styles/theme";
import { FlexBox } from "@/components/layouts/FlexBox";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { AlertIcon } from "@/assets/icons/AlertIcon";
import { ReactNode } from "react";

interface PropsType {
  variant: "default" | "date";
  children?: string;
  icon?: ReactNode; // 아이콘 컴포넌트
  startDate?: string;
  endDate?: string;
}

export const Tooltip = ({
  variant,
  children,
  icon,
  startDate = "2025-07-09",
  endDate = "2025-07-09",
  ...props
}: PropsType) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const renderTooltip = () => {
    if (variant === "date") {
      return (
        <FlexBox>
          <StyledTooltip variant={variant}>
            <Text typo="Caption_1" color="gray_1000">
              {formatDate(startDate)} ~ {formatDate(endDate)}
            </Text>
          </StyledTooltip>
        </FlexBox>
      );
    }
    return (
      <FlexBox justify="center" align="center" direction="column">
        <StyledTooltip variant={variant}>
          <Text typo="Caption_2" color="gray_1000">
            {children}
          </Text>
        </StyledTooltip>
        <StyledArrowIcon />
        <div style={{ cursor: "pointer" }}>{icon ?? <AlertIcon />}</div>
      </FlexBox>
    );
  };
  return <>{renderTooltip()}</>;
};

const StyledTooltip = styled.div<{
  variant: "default" | "date";
}>`
  display: inline-flex;
  padding: ${({ variant }) => (variant === "date" ? "10px 13px" : "16px")};
  text-align: center;
  gap: 10px;
  background-color: ${theme.palette.gray_50};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;
const StyledArrowIcon = styled(ArrowIcon)`
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.05));
`;
