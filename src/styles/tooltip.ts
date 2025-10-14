import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { ArrowIcon } from '@/assets/icons/ArrowIcon';

export const Container = styled.div<{ $noMargin: boolean }>`
  position: relative;
  margin-top: ${({ $noMargin }) => ($noMargin ? '0' : '80px')};
`;

export const Fixing = styled.div`
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

export const StyledTooltip = styled.div<{ variant: "edit" | "watch" | "clock" }>`
  width:max-content;
  white-space: nowrap;
  text-align: center;
  padding: 16px;
  background-color: ${theme.palette.gray_50};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
`;

export const StyledArrowIcon = styled(ArrowIcon)`
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.05));
`;