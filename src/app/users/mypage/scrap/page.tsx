"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { MyScrapComponent } from "@/components/mypage/MyScrapComponent";

export default function MyScrapPage() {
  const router = useRouter();

  return (
    <Container>
      <Wrapper>
        <SelectHeader>
          <SelectText onClick={() => router.push("/users/mypage/like")}>
            <Text typo="H2" children="좋아요" color="gray_900" />
          </SelectText>
          <SelectText>
            <Text typo="H2" children="스크랩" color="primary_800" />
          </SelectText>
        </SelectHeader>
        <Line />
        <MyScrapComponent />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 100vh;
  padding: 0 119px;
`;

const Wrapper = styled.div`
  width: 962px;
  margin: 0 auto;
  margin-bottom: 150px;
  margin-top: 26px;
`;

const SelectHeader = styled.div`
  width: 100%;
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
`;

const SelectText = styled.div`
  cursor: pointer;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background: rgba(209, 211, 212, 0.5);
`;
