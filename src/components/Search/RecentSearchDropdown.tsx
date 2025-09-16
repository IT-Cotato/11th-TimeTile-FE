import { Text } from "../atoms/Text";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { SmallCloseIcon } from "@/assets/icons/SmallCloseIcon";

interface Props {
  keywords: string[];
  onTagClick: (keyword: string) => void;
  onDelete: (keyword: string) => void;
}

export const RecentSearchDropdown = ({
  keywords,
  onTagClick,
  onDelete,
}: Props) => {
  return (
    <DropdownWrapper>
      <Divider />
      <Text typo="Body_3">최근 검색어</Text>
      {keywords.length > 0 ? (
        <TagList>
          {keywords.map((word) => (
            <Tag key={word}>
              <span onClick={() => onTagClick(word)}>
                <Text typo="Body_3" color="gray_800">
                  {word}
                </Text>
              </span>
              <DeleteButton onClick={() => onDelete(word)}>
                <SmallCloseIcon />
              </DeleteButton>
            </Tag>
          ))}
        </TagList>
      ) : (
        <NoSuggestion>최근 검색어가 없습니다</NoSuggestion>
      )}
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

  .title {
    font-size: 14px;
    color: ${theme.palette.gray_500};
    margin-bottom: 8px;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  margin-top: 12px;
  align-items: flex-start;
  align-content: flex-start;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 16px;
  background: ${theme.palette.gray_70};
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const NoSuggestion = styled.div`
  width: 100%;
  color: ${theme.palette.gray_400};
`;
