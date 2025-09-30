import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { Text } from "@/components/atoms/Text";
import styled from "styled-components";

interface SearchDetailHeaderProps {
  children: string;
  searchCount: number;
}
export const SearchDetailHeader = ({
  children,
  searchCount,
}: SearchDetailHeaderProps) => {
  return (
    <Container>
      <Wrapper>
        <MoveLeftIcon />
        <TextWrapper>
          <Text typo="H1" color="primary_700" children={children} />
          <Text typo="Body_3" color="gray_1000">
            {searchCount}개의 검색 결과가 있습니다.
          </Text>
        </TextWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  padding-top: 26px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
