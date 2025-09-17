import styled from "styled-components";
import { theme } from "@/styles/theme";

interface Props {
  keyword: string;
  suggestions: string[];
  onTagClick: (keyword: string) => void;
}

export const SuggestDropdown = ({ suggestions, onTagClick }: Props) => {
  return (
    <DropdownWrapper>
      <Divider />
      <DropDiv>
        {suggestions.length > 0 ? (
          suggestions.map((item, idx) => (
            <DropdownItem key={idx} onClick={() => onTagClick(item)}>
              {item}
            </DropdownItem>
          ))
        ) : (
          <NoSuggestion>추천 검색어가 없습니다</NoSuggestion>
        )}
      </DropDiv>
    </DropdownWrapper>
  );
};

const Divider = styled.div`
  height: 1px;
  background: ${theme.palette.gray_200};
  margin: 0 0 12px 0;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${theme.palette.gray_200};
  border-top: none;
  border-radius: 0 0 24px 24px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
  padding: 0 16px 12px 16px;
`;

const DropDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const DropdownItem = styled.div`
  width: 100%;
  padding: 4px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    border-radius: 10px;
    background: ${theme.palette.gray_70};
  }
`;

const NoSuggestion = styled.div`
  width: 100%;
  color: ${theme.palette.gray_400};
`;
