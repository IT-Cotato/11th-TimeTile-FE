"use client";

import { useAtom } from "jotai";
import styled from "styled-components";
import { userProfileAtom } from "@/store/UserProfileAtom";

export default function RolePage() {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  console.log(userProfile);

  return (
    <Container>
      <Wrapper></Wrapper>
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
