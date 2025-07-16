import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../Text";

interface CheckButtonProps {
  children: string;
  onClick?: () => void;
  isDisabled?: boolean;
}
export const CheckButton = ({
  children,
  onClick,
  isDisabled = false,
  ...props
}: CheckButtonProps) => {
  return (
    <StyledButton onClick={onClick} isDisabled={isDisabled} {...props}>
      <Text
        typo="Caption_1"
        color={isDisabled ? "gray_600" : "primary_700"}
        children={children}
      />
    </StyledButton>
  );
};

const StyledButton = styled.button<{ isDisabled: boolean }>`
  outline: none;
  width: 64px;
  height: 56px;
  padding: 10px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${({ isDisabled }) =>
    isDisabled ? theme.palette.gray_70 : theme.palette.primary_200};
  border: 1px solid
    ${({ isDisabled }) =>
      isDisabled ? theme.palette.gray_300 : theme.palette.primary_400};
`;
