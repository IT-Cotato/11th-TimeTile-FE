"use client";

import { SymbolTextLogo } from "@/assets/images/SymbolTextLogo";
import { CheckButton } from "@/components/atoms/CheckButton";
import { LargeButton } from "@/components/atoms/LargeButton";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import Svg from "@/components/atoms/Svg";
import { Text } from "@/components/atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Register() {
  const [info, setInfo] = useState({
    //이메일, 비번 저장 객체
    email: "",
    checkcode: "",
    password: "",
    passwordCheck: "",
  });
  const [isError, setIsError] = useState(false); //에러 여부
  const [errorMsg, setErrorMsg] = useState(""); //에러 메시지
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [codeValue, setCodeValue] = useState("");

  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  const handleChange = (
    key: "email" | "checkcode" | "password" | "passwordCheck",
    value: string
  ) => {
    setInfo((prev) => ({
      ...prev,
      [key]: value,
    }));
    setIsError(false);
    setErrorMsg("");
  };

  const handleSendCode = () => {
    setTimerSeconds(180); // 3분
    setIsCounting(true);
  };

  useEffect(() => {
    if (!isCounting) return;

    if (timerSeconds <= 0) {
      setIsCounting(false);
      return;
    }

    const timerId = setInterval(() => {
      setTimerSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timerSeconds, isCounting]);

  useEffect(() => {
    if (!info.passwordCheck) {
      setIsError(false);
      setIsPasswordCheck(false);
      return;
    }

    if (info.password !== info.passwordCheck) {
      setIsError(true);
      setIsPasswordCheck(false);
      setErrorMsg("비밀번호가 일치하지 않습니다.");
    } else {
      setIsError(false);
      setIsPasswordCheck(true);
      setErrorMsg("");
    }
  }, [info.password, info.passwordCheck]);

  return (
    <Wrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24}>
          <Svg children={<SymbolTextLogo />} />
          <RegisterArea>
            <Row>
              <OnboardingInput
                variant="default"
                value={info.email}
                onChange={(e) => handleChange("email", e.target.value)}
                width={350}
                label="이메일"
                placeholder="이메일을 입력해주세요."
              />
              <CheckButton
                children={isCounting ? "다시 보내기" : "이메일인증"}
                onClick={handleSendCode}
                isDisabled={isCounting}
              />
            </Row>
            <Row>
              <OnboardingInput
                variant="checkcode"
                value={info.checkcode}
                onChange={(e) => handleChange("checkcode", e.target.value)}
                timerSeconds={timerSeconds}
                width={350}
                label="인증번호"
                placeholder="이메일로 전송된 인증번호를 입력해주세요."
              />
              <CheckButton children="인증 확인" />
            </Row>
            <OnboardingInput
              variant="password"
              value={info.password}
              onChange={(e) => handleChange("password", e.target.value)}
              label="비밀번호"
            />
            <OnboardingInput
              variant="password"
              value={info.passwordCheck}
              onChange={(e) => handleChange("passwordCheck", e.target.value)}
              label="비밀번호 확인"
              isError={isError}
              errormsg={errorMsg}
              isCheck={isPasswordCheck}
            />
          </RegisterArea>
          {!isError && <MarginBox />}
          <LargeButton children="다음" variant="default" width={424} />
          <FlexBox gap={16}>
            <Line />
            <Text children="SNS로 가입하기" typo="Caption_1" color="gray_600" />
            <Line />
          </FlexBox>
          <SocialLoginContainer>
            <LargeButton
              variant="google"
              width={424}
              children="Google로 시작하기"
            />
            <LargeButton
              variant="kakao"
              width={424}
              children="Kakao로 시작하기"
            />
          </SocialLoginContainer>
        </FlexBox>
      </ContentWrapper>
    </Wrapper>
  );
}

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

const RegisterArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 54px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
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
