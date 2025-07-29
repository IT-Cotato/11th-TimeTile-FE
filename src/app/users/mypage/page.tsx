"use client";
import { FlexBox } from "@/components/layouts/FlexBox";
import { MyProfile } from "@/components/mypage/MyProfile";
import styled from "styled-components";

export default function Mypage() {
  return (
    <Wrapper>
      <FlexBox>
        <MyProfile />
      </FlexBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
`;
