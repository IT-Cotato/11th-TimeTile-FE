import styled from "styled-components";
import { theme } from "@/styles/theme";

interface TileToggleProps {
  value: "all" | "new" | "edited";
  onChange: (value: "all" | "new" | "edited") => void;
}

export const TileToggle = ({ value, onChange }: TileToggleProps) => {
  return (
    <Container>
      <ToggleButton $active={value === "all"} onClick={() => onChange("all")}>
        전체 타일
      </ToggleButton>
      <ToggleButton $active={value === "new"} onClick={() => onChange("new")}>
        신규 추가된 타일
      </ToggleButton>
      <ToggleButton
        $active={value === "edited"}
        onClick={() => onChange("edited")}
      >
        수정된 타일
      </ToggleButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  padding: 7px 8px;
  align-items: center;
  border-radius: 24px;
  border: 1px solid ${theme.palette.sub_400};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 4px 0 rgba(233, 230, 106, 0.15);
`;

const ToggleButton = styled.button<{ $active: boolean }>`
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
    $active ? `${theme.palette.sub_200}` : `${theme.palette.gray_0}`};
  color: ${({ $active }) =>
    $active ? `${theme.palette.sub_900}` : `${theme.palette.gray_1000}`};

  font-family: ${({ $active }) =>
    $active ? "Pretendard-Medium" : "Pretendard-Regular"};
  font-size: 14px;
  font-style: normal;
  font-weight: ${({ $active }) => ($active ? "500" : "400")};
  line-height: ${({ $active }) => ($active ? "130%" : "150%")};
`;
