"use client";

import { SymbolTextLogo } from "@/assets/images/SymbolTextLogo";
import { LargeButton } from "@/components/atoms/LargeButton";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import Svg from "@/components/atoms/Svg";
import { Text } from "@/components/atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { theme } from "@/styles/theme";
import { useState } from "react";
import styled from "styled-components";

export default function Onboarding() {
  const [info, setInfo] = useState({
    //이메일, 비번 저장 객체
    email: "",
    password: "",
  });
  const [isError, setIsError] = useState(false); //에러 여부
  const [errorMsg, setErrorMsg] = useState(""); //에러 메시지

  const handleChange = (key: "email" | "password", value: string) => {
    setInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
    setIsError(false);
    setErrorMsg("");
  };

  const handleLogin = () => {
    if (!info.email) {
      setIsError(true);
      setErrorMsg("이메일을 입력해주세요.");
      return;
    }
    if (!info.password) {
      setIsError(true);
      setErrorMsg("비밀번호를 입력해주세요.");
      return;
    }

    //실제 로그인 로직 추후 연결 예정
    const isLoginValid = mockLogin(info.email, info.password);
    if (!isLoginValid) {
      setIsError(true);
      setErrorMsg("이메일 혹은 비밀번호가 일치하지 않습니다.");
      return;
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24} style={{ height: "100%" }}>
          <Svg children={<SymbolTextLogo />} />
          <LoginArea>
            <OnboardingInput
              variant="default"
              value={info.email}
              onChange={(e) => handleChange("email", e.target.value)}
              label="이메일"
              placeholder="이메일을 입력해주세요"
            />
            <OnboardingInput
              variant="password"
              value={info.password}
              onChange={(e) => handleChange("password", e.target.value)}
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              isError={isError}
              errormsg={errorMsg}
            />
          </LoginArea>
          {!isError && <MarginBox />}
          <LargeButton
            variant="default"
            width={424}
            onClick={handleLogin}
            disabled={!info.email || !info.password}
            children="로그인"
          />
          <FlexBox gap={16}>
            <Line />
            <Text
              children="SNS로 로그인하기"
              typo="Caption_1"
              color="gray_600"
            />
            <Line />
          </FlexBox>
          <SocialLoginContainer>
            <LargeButton
              variant="google"
              width={424}
              children="Google로 로그인"
            />
            <LargeButton
              variant="kakao"
              width={424}
              children="Kakao로 로그인"
            />
          </SocialLoginContainer>
          <FlexBox gap={16}>
            <Line />
            <Text
              children="아직 계정이 없으신가요?"
              typo="Caption_1"
              color="gray_600"
            />
            <Line />
          </FlexBox>
          <RegistButton>
            {/* 추후 회원가입 페이지로 onClick 연결 예정 */}
            <Text typo="Body_2" color="gray_1000" children="회원가입" />
          </RegistButton>
        </FlexBox>
      </ContentWrapper>
    </Wrapper>
  );
}

// 임시로 테스트 위해 만들어둔 로그인 함수
const mockLogin = (email: string, password: string) => {
  return email === "cho1428hee@naver.com" && password === "1234";
};

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  //화면비율 위해 임의로 패딩설정
  width: 100%;
  padding: 40px 0;
`;

const LoginArea = styled.div`
  margin-top: 68px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MarginBox = styled.div`
  height: 4px;
`;

const Line = styled.div`
  width: 144px;
  height: 0;
  border: 1px solid ${theme.palette.gray_100};
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const RegistButton = styled.button`
  width: 100px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
