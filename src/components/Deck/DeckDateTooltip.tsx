import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Text } from "../atoms/Text";
import { theme } from "@/styles/theme";
import { DateText } from "../atoms/DateText";

interface PropsType {
  startDate?: string;
  endDate?: string;
  isWaiting?: boolean;
}

export const DeckDateTooltip = ({
  startDate = "2025-07-09",
  endDate = "2025-07-09",
  isWaiting = false,
}: PropsType) => {
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const showTooltip = () => {
    if (startDate === endDate) return;
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;

    const top = triggerRect.top + window.scrollY - tooltipHeight - 8;
    const left =
      triggerRect.left +
      window.scrollX +
      triggerRect.width / 2 -
      tooltipWidth / 2;

    setPosition({ top, left });
    setVisible(true);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;
  };

  const TooltipContent = (
    <Fixing
      ref={tooltipRef}
      style={{
        top: position.top,
        left: position.left,
        opacity: visible ? 1 : 0,
        visibility: visible ? "visible" : "hidden",
      }}
    >
      <StyledTooltip>
        <Text typo="Caption_1" color="gray_1000">
          {formatDate(startDate)} ~ {formatDate(endDate)}
        </Text>
      </StyledTooltip>
    </Fixing>
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ display: "inline-block", cursor: "pointer" }}
      >
        <DateText
          startDate={startDate}
          endDate={endDate}
          isWaiting={isWaiting}
        />
      </div>
      {isBrowser &&
        ReactDOM.createPortal(
          TooltipContent,
          document.getElementById("tooltip-portal")!
        )}
    </>
  );
};

const Fixing = styled.div`
  position: absolute;
  z-index: 9999;
  pointer-events: none;
  white-space: nowrap;
`;

const StyledTooltip = styled.div`
  width: max-content;
  text-align: center;
  padding: 10px 13px;
  background-color: ${theme.palette.gray_50};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;
