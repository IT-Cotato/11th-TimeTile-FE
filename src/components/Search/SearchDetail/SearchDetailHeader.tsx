import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { Text } from "@/components/atoms/Text";
import { ToggleButton } from "@/components/atoms/ToggleButton";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useState } from "react";

interface SearchDetailHeaderProps {
  children: string;
  searchCount: number;
  isMyTile?: boolean;
}

export const SearchDetailHeader = ({
  children,
  searchCount,
  isMyTile,
}: SearchDetailHeaderProps) => {
  const router = useRouter();
  const [variant, setVariant] = useState<"default" | "images">("default");

  return (
    <TopContainer>
      <Container>
        <Wrapper>
          <div style={{ cursor: "pointer" }} onClick={() => router.back()}>
            <MoveLeftIcon />
          </div>
          <TextWrapper>
            <Text typo="H1" color="primary_700" children={children} />
            <Text typo="Body_3" color="gray_1000">
              {searchCount}개의 검색 결과가 있습니다.
            </Text>
          </TextWrapper>
        </Wrapper>
      </Container>
      {isMyTile && <ToggleButton variant={variant} onChange={setVariant} />}
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
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  align-self: stretch;
  padding-top: 26px;
  padding-bottom: 8px;
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
