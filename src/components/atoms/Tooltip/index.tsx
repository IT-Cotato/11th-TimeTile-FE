import styled from "styled-components";
import { Text } from "../Text";
import { theme } from "@/styles/theme";
import { FlexBox } from "@/components/layouts/FlexBox";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { AlertIcon } from "@/assets/icons/AlertIcon";
import { ReactNode, useState } from "react";

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
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

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
      <Container>
        {visible && (
          <Fixing>
            <StyledTooltip variant={variant}>
              <Text typo="Caption_2" color="gray_1000">
                {children}
              </Text>
            </StyledTooltip>
            <StyledArrowIcon />
          </Fixing>
        )}
        <FlexBox>
          <div
            style={{ cursor: "pointer" }}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          >
            {icon ?? <AlertIcon />}
          </div>
        </FlexBox>
      </Container>
    );
  };
  return <>{renderTooltip()}</>;
};

const Container = styled.div`
  position: relative;
  margin-top: 80px;
`;

const Fixing = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTooltip = styled.div<{ variant: "default" | "date" }>`
  white-space: nowrap;
  text-align: center;
  padding: ${({ variant }) => (variant === "date" ? "10px 13px" : "16px")};
  background-color: ${theme.palette.gray_50};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.05));
`;
