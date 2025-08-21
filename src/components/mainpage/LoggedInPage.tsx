// src/app/LoggedInPage.tsx
"use client";

import styled from "styled-components";
import { Text } from "@/components/atoms/Text";

export default function LoggedInPage() {
  return (
    <Wrapper>
      <Text typo="Body_1" color="primary_800">
        환영합니다!
      </Text>
      <Text typo="Body_1" color="gray_700">
        로그인한 사용자 전용 화면입니다.
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
