"use client";

import { useEffect, useState } from "react";
import LoggedOutPage from "@/components/mainpage/LoggedOutPage";
import LoggedInPage from "@/components/mainpage/LoggedInPage";
import { useAtom } from "jotai";
import { userProfileAtom } from "@/store/UserProfileAtom";
import { usersApi } from "@/apis/usersApi";
import styled from "styled-components";
import { MainHeader } from "@/components/mainpage/MainHeader";
import { CommonPage } from "@/components/mainpage/CommonPage";
import { FlexBox } from "@/components/layouts/FlexBox";
import { theme } from "@/styles/theme";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);

  useEffect(() => {
    const loggedOut = localStorage.getItem("loggedOut");
    if (loggedOut) {
      setIsLoggedIn(false);
      setUserProfile(null);
      return;
    }

    usersApi
      .getMyProfile()
      .then((res) => {
        setUserProfile(res.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setUserProfile(null);
        setIsLoggedIn(false);
      });
  }, [setUserProfile]);

  if (isLoggedIn === null) return <div>Loading...</div>;

  return (
    <Container>
      <Wrapper>
        <FlexBox gap={32} direction="column">
          <MainHeader />
          <CommonPage />
          <Divider />
          {isLoggedIn ? <LoggedInPage /> : <LoggedOutPage />}
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
  margin: 0 auto;
  margin-bottom: 150px;
  margin-top: 26px;
`;

const Divider = styled.div`
  width: 1144px;
  height: 1px;
  background-color: ${theme.palette.gray_100};
`;
