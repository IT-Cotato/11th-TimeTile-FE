import { Text } from "../Text";
import { theme } from "@/styles/theme";
import { FlexBox } from "@/components/layouts/FlexBox";
import { Container, Fixing, StyledTooltip, StyledArrowIcon } from "@/styles/tooltip";
import { AlertIcon } from "@/assets/icons/AlertIcon";
import { ReactNode, useState } from "react";
import { EditIcon } from "@/assets/icons/EditIcon";
import { EyeTrueIcon } from "@/assets/icons/EyeTrueIcon";
import { ClockIcon } from "@/assets/icons/ClockIcon";

export type Variant = 'edit' | 'watch' | 'clock';
export type Role = 'watcher' | 'linker' | 'editor';
export type Mode = 'view' | 'edit' | 'waiting';

interface BaseProps {
  icon?: ReactNode;
  children?: string;
  noMargin?: boolean;
}

export interface EditTooltipProps extends BaseProps {
  variant: 'edit';
  role: Role;
  mode?: 'view'; // only view allowed
}

export interface WatchTooltipProps extends BaseProps {
  variant: 'watch';
  role: Exclude<Role, 'watcher'>; // linker, editor only
  mode: Exclude<Mode, 'view'>;    // edit or waiting only
}

export interface ClockTooltipProps extends BaseProps {
  variant: 'clock';
  role: Exclude<Role, 'watcher'>;
  mode: Exclude<Mode, 'view'>;
}

export type TooltipProps =
  | EditTooltipProps
  | WatchTooltipProps
  | ClockTooltipProps;

export const TimeLineTooltip = ({
  variant,
  role,
  mode,
  children,
  icon,
  noMargin = false,
  ...props
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

   const getEditTooltipText = () => {
    if (role === 'watcher') return 'Linker 등급부터 문서를 편집할 수 있어요';
    if (mode === 'view') return '타일 편집하기';
    return '편집모드로 전환하기';
  };

  const getWatchTooltipText = () => {
    if (mode == 'edit') return '보기모드로 전환하기';
    if (mode =='waiting') return '편집모드로 전환하기'

  };
  const getEditIconColor = () => {
    if (role === 'watcher') return theme.palette.gray_300;
    return theme.palette.sub_600;
  };

  return (
    <Container $noMargin = {noMargin}>
      {visible && (
        <Fixing>
          <StyledTooltip variant={variant}>
            <Text typo="Caption_2" color="gray_1000">
              {variant === "edit" ? getEditTooltipText() : variant === "watch"
        ? getWatchTooltipText() : variant === "clock" ? "업로드 대기 중인 타일 보기" : children}
            </Text>
          </StyledTooltip>
          <StyledArrowIcon />
        </Fixing>
      )}
      <FlexBox>
        <div
          style={{ cursor: "pointer", color: variant === "edit" ? getEditIconColor() : variant === "watch" || "clock"
            ? theme.palette.sub_600 : undefined }}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
        >
          {icon ?? (variant === "edit" ? <EditIcon /> : variant === "watch" ? <EyeTrueIcon /> : variant === "clock" ? <ClockIcon /> : <AlertIcon />)}
        </div>
      </FlexBox>
    </Container>
  );
};