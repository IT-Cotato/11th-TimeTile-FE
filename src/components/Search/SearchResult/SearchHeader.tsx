import { Text } from "@/components/atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { theme } from "@/styles/theme";
import styled from "styled-components";

interface SearchHeaderProps {
  searchCount: number;
  suggestion?: string;
  onClickSuggestion?: (keyword: string) => void;
}

export const SearchHeader = ({
  searchCount,
  suggestion,
  onClickSuggestion,
}: SearchHeaderProps) => {
  return (
    <Container>
      <ResultText>
        <Text typo="H5">전체 검색 결과</Text>
      </ResultText>
      <SearchResultText>
        <FlexBox>
          <Text typo="Body_1" color="primary_600">
            {searchCount}
          </Text>
          <Text typo="Body_3" color="gray_800">
            건의 검색 결과가 있습니다.
          </Text>
        </FlexBox>
        {searchCount === 0 && suggestion && (
          <div>
            <SuggestDiv>
              <SuggestText>
                <Text typo="Caption_1" color="gray_600" children="제안" />
              </SuggestText>
              <SuggestDetailDiv>
                <SuggestionText onClick={() => onClickSuggestion?.(suggestion)}>
                  <Text
                    typo="Body_1"
                    color="primary_600"
                    children={suggestion}
                  />
                </SuggestionText>
                <Text typo="Body_3" color="gray_800">
                  의 검색 결과를 보시겠어요?
                </Text>
              </SuggestDetailDiv>
            </SuggestDiv>
          </div>
        )}
      </SearchResultText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ResultText = styled.div`
  display: flex;
  height: 48px;
  padding: 11px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const SearchResultText = styled.div`
  display: flex;
  align-items: center;
  width: 1046px;
  height: 48px;
  padding: 9px 16px;
  border-radius: 10px;
  background: ${theme.palette.gray_50};
  gap: 16px;
`;

const SuggestionText = styled.div`
  color: ${theme.palette.primary_600};
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const SuggestDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SuggestText = styled.div`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 15px;
  border: 1px solid ${theme.palette.gray_600};
`;

const SuggestDetailDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
