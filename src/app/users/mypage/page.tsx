"use client";
import { Text } from "@/components/atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { MyProfile } from "@/components/mypage/MyProfile";
import { MyTimeLine } from "@/components/mypage/MyTimeLine";
import { theme } from "@/styles/theme";
import styled from "styled-components";

export default function Mypage() {
  return (
    <Container>
      <Wrapper>
        <FlexBox gap={24} direction="column">
          <MyProfile />
          <MyTimeLine />
          <Wrap>
            <Text typo="H3" children="좋아요" />
          </Wrap>
          <Wrap>
            <Text typo="H3" children="스크랩" />
          </Wrap>
          <Wrap>
            <Text typo="H3" children="내 등급 확인" />
          </Wrap>
          <Wrap>
            <Text typo="H3" children="설정" />
          </Wrap>
        </FlexBox>
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
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  padding-top: 24px;
  border-top: 1px solid ${theme.palette.primary_400};
`;
