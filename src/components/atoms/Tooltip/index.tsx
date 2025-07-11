import styled from "styled-components";
import { Text } from "../Text";
import { theme } from "@/styles/theme";
import { FlexBox } from "@/components/layouts/FlexBox";
import { ArrowIcon } from "@/assets/icons/ArrowIcon";
import { AlertIcon } from "@/assets/icons/AlertIcon";
import { ReactNode, useState } from "react";
import { DateText } from "../DateText";
import { EditIcon } from "@/assets/icons/EditIcon";

interface PropsType {
  variant: "default" | "date" | "edit";
  role?: 'watcher' | 'linker' | 'editor';
  children?: string;
  icon?: ReactNode; // 아이콘 컴포넌트
  startDate?: string;
  endDate?: string;
  isEditMode?: boolean; // 편집모드인지 여부
  isWaiting?: boolean; //업로드 대기 상태이면 true
  noMargin?: boolean; // 툴팁 상위 컨테이너에 margin-top을 적용하지 않으려면 true
}

export const Tooltip = ({
  variant,
  role,
  children,
  icon,
  startDate = "2025-07-09",
  endDate = "2025-07-09",
  isEditMode = false,
  isWaiting = false,
  noMargin = false,
  ...props
}: PropsType & { role?: 'watcher' | 'linker' | 'editor'; selected?: boolean }) => {
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

   const getEditTooltipText = () => {
    if (isEditMode) return '타일 편집하기';
    if (role === 'watcher') return 'Linker 등급부터 문서를 편집할 수 있어요';
    return '편집모드로 전환하기';
  };

  const getEditIconColor = () => {
    if (isEditMode) return theme.palette.gray_1000;
    if (role === 'watcher') return theme.palette.gray_300;
    return theme.palette.sub_600;
  };

  if (variant === "date") {
    return (
      <Container noMargin={noMargin}>
        {visible && (
          <Fixing>
            <StyledTooltip variant={variant}>
              <Text typo="Caption_1" color="gray_1000">
                {formatDate(startDate)} ~ {formatDate(endDate)}
              </Text>
            </StyledTooltip>
          </Fixing>
        )}
        <FlexBox>
          <div onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            <DateText
              startDate={startDate}
              endDate={endDate}
              isWaiting={isWaiting}
            />
          </div>
        </FlexBox>
      </Container>
    );
  }

  return (
    <Container noMargin={noMargin}>
      {visible && (
        <Fixing>
          <StyledTooltip variant={variant}>
            <Text typo="Caption_2" color="gray_1000">
              {variant === "edit" ? getEditTooltipText() : children}
            </Text>
          </StyledTooltip>
          <StyledArrowIcon />
        </Fixing>
      )}
      <FlexBox>
        <div
          style={{ cursor: "pointer", color: variant === "edit" ? getEditIconColor() : undefined }}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {icon ?? (variant === "edit" ? <EditIcon /> : <AlertIcon />)}
        </div>
      </FlexBox>
    </Container>
  );
};

const Container = styled.div<{ noMargin: boolean }>`
  position: relative;
  margin-top: ${({ noMargin }) => (noMargin ? '0' : '80px')};
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
  margin-bottom: 8px;
`;

const StyledTooltip = styled.div<{ variant: "default" | "date" | "edit"}>`
  width:max-content;
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
