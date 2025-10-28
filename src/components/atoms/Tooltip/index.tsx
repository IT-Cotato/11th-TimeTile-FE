import ReactDOM from "react-dom";
import styled from "styled-components";
import { Text } from "../Text";
import { theme } from "@/styles/theme";
import { FlexBox } from "@/components/layouts/FlexBox";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { AlertIcon } from "@/assets/icons/AlertIcon";
import { ReactNode, useState, useEffect } from "react";
import { DateText } from "../DateText";

interface PropsType {
  variant: "default" | "date";
  children?: ReactNode;
  icon?: ReactNode;
  startDate?: string;
  endDate?: string;
  isWaiting?: boolean;
}

export const Tooltip = ({
  variant,
  children,
  icon,
  startDate = "2025-07-09",
  endDate = "2025-07-09",
  isWaiting = false,
}: PropsType) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);

  const showTooltip = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setCoords({
      x: rect.left + rect.width / 2,
      y: rect.top - 8,
    });
    setVisible(true);
  };

  const hideTooltip = () => setVisible(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const tooltipContent =
    variant === "date" ? (
      <StyledTooltip variant={variant}>
        <Text typo="Caption_1" color="gray_1000">
          {formatDate(startDate)} ~ {formatDate(endDate)}
        </Text>
      </StyledTooltip>
    ) : (
      <>
        <StyledTooltip variant={variant}>
          <Text typo="Caption_2" color="gray_1000">
            {children}
          </Text>
        </StyledTooltip>
        <StyledArrowIcon />
      </>
    );

  return (
    <>
      <Container>
        <FlexBox>
          <div
            style={{ cursor: "pointer" }}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
          >
            {variant === "date" ? (
              <DateText
                startDate={startDate}
                endDate={endDate}
                isWaiting={isWaiting}
              />
            ) : (
              icon ?? <AlertIcon size="20" />
            )}
          </div>
        </FlexBox>
      </Container>
      {mounted &&
        visible &&
        coords &&
        ReactDOM.createPortal(
          <PortalWrapper
            style={{
              position: "fixed",
              top: coords.y,
              left: coords.x,
              transform: "translate(-50%, -100%)",
              zIndex: 9999,
            }}
          >
            {tooltipContent}
          </PortalWrapper>,
          document.body
        )}
    </>
  );
};

const Container = styled.div`
  display: inline-block;
  position: relative;
`;

const PortalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTooltip = styled.div<{ variant: "default" | "date" }>`
  width: max-content;
  white-space: nowrap;
  text-align: center;
  padding: ${({ variant }) => (variant === "date" ? "10px 13px" : "16px")};
  background-color: ${theme.palette.gray_50};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

const StyledArrowIcon = styled(ArrowIcon)`
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.05));
`;
