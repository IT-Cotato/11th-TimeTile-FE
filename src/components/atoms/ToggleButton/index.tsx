import { theme } from "@/styles/theme";
import styled from "styled-components";

interface ToggleButtonProps {
  variant: "default" | "images";
  onChange: (value: "default" | "images") => void;
}

export const ToggleButton = ({ variant, onChange }: ToggleButtonProps) => {
  return (
    <TopContainer>
      <Container>
        <TogButton
          $active={variant === "default"}
          onClick={() => onChange("default")}
        >
          전체 보기
        </TogButton>
        <TogButton
          $active={variant === "images"}
          onClick={() => onChange("images")}
        >
          이미지 모아보기
        </TogButton>
      </Container>
    </TopContainer>
  );
};

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Container = styled.div`
  display: flex;
  padding: 7px 8px;
  align-items: center;
  border-radius: 24px;
  border: 1px solid ${theme.palette.primary_500};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 4px 0 rgba(159, 198, 255, 0.15);
`;

const TogButton = styled.button<{ $active: boolean }>`
  display: flex;
  height: 32px;
  padding: 9px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: none;
  cursor: pointer;

  background: ${({ $active }) =>
    $active ? `${theme.palette.primary_300}` : `${theme.palette.gray_0}`};
  color: ${({ $active }) =>
    $active ? `${theme.palette.primary_900}` : `${theme.palette.gray_1000}`};

  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-style: normal;
  font-weight: ${({ $active }) => ($active ? "500" : "400")};
  line-height: ${({ $active }) => ($active ? "130%" : "150%")};
`;
