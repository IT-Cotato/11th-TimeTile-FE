import { Text } from "@/components/atoms/Text";
import { theme } from "@/styles/theme";
import styled from "styled-components";

interface SearchHeaderProps {
  searchCount: number;
}

export const SearchHeader = ({ searchCount }: SearchHeaderProps) => {
  return (
    <Container>
      <ResultText>
        <Text typo="H5" children="전체 검색 결과" />
      </ResultText>
      <SearchResultText>
        <Text typo="Body_1" color="primary_600" children={searchCount} />
        <Text
          typo="Body_3"
          color="gray_800"
          children="건의 검색 결과가 있습니다."
        />
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
  width: 1046px;
  height: 48px;
  padding: 9px 16px;
  align-items: center;
  border-radius: 10px;
  background: ${theme.palette.gray_50};
`;
