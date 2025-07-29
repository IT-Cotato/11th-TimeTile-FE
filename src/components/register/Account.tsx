"use client";

import { useState } from "react";
import styled from "styled-components";
import RegisterHeader from "./RegisterHeader";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import { CheckButton } from "@/components/atoms/CheckButton";
import { LargeButton } from "@/components/atoms/LargeButton";
import { FlexBox } from "@/components/layouts/FlexBox";
import { Text } from "@/components/atoms/Text";
import { theme } from "@/styles/theme";
import { useTimer } from "@/hooks/useTimer";
import { AccountForm } from "./AccountForm";
import { registerInfoAtom } from "@/store/auth";
import { useAtom } from "jotai";

export default function Account({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const {
    info,
    errorState,
    successMessages,
    isCheckCodeSuccess,
    isPasswordCheck,
    handleChange,
    handlePasswordCheck,
    handlePasswordBlur,
    sendCode,
    checkCode,
  } = AccountForm();

  const { seconds, isCounting, startTimer, stopTimer } = useTimer(0);
  const [registerInfo, setRegisterInfo] = useAtom(registerInfoAtom);

  const handleSendCodeClick = async () => {
    const success = await sendCode();
    if (success) startTimer(180);
  };

  const handleCheckCodeClick = async () => {
    const success = await checkCode();
    if (success) stopTimer();
  };

  const isNextEnabled =
    info.email &&
    info.checkcode &&
    info.password &&
    info.passwordCheck &&
    !errorState.email.isError &&
    !errorState.checkcode.isError &&
    !errorState.passwordCheck.isError &&
    isCheckCodeSuccess &&
    isPasswordCheck;

  const handleNextClick = () => {
    setRegisterInfo((prev) => ({
      ...prev,
      email: info.email,
      password: info.password,
    }));
    onNext();
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24}>
          <RegisterHeader currentStep={2} onPrev={onPrev} />
          <RegisterArea>
            <Row>
              <OnboardingInput
                variant="default"
                value={info.email}
                onChange={(e) => handleChange("email", e.target.value)}
                width={350}
                label="이메일"
                placeholder="이메일을 입력해주세요."
                isError={errorState.email.isError}
                errormsg={errorState.email.message}
              />
              <CheckButton
                children={isCounting ? "다시 보내기" : "이메일인증"}
                onClick={handleSendCodeClick}
                isDisabled={isCounting}
              />
            </Row>
            <Row>
              <OnboardingInput
                variant="checkcode"
                value={info.checkcode}
                onChange={(e) => handleChange("checkcode", e.target.value)}
                timerSeconds={isCheckCodeSuccess ? 0 : seconds}
                width={350}
                label="인증번호"
                placeholder="이메일로 전송된 인증번호를 입력해주세요."
                isError={errorState.checkcode.isError}
                errormsg={errorState.checkcode.message}
                isCheck={isCheckCodeSuccess}
                successMsg={successMessages}
              />
              <CheckButton
                children="인증 확인"
                onClick={handleCheckCodeClick}
              />
            </Row>
            <OnboardingInput
              variant="password"
              value={info.password}
              onBlur={handlePasswordBlur}
              onChange={(e) => handleChange("password", e.target.value)}
              label="비밀번호"
              placeholder="영문 대소문자, 숫자, 특수문자를 포함해 6~20자 이내로 입력해주세요."
              isError={errorState.password.isError}
              errormsg={errorState.password.message}
            />
            <OnboardingInput
              variant="password"
              value={info.passwordCheck}
              onChange={(e) => handleChange("passwordCheck", e.target.value)}
              onBlur={handlePasswordCheck}
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요."
              isError={errorState.passwordCheck.isError}
              errormsg={errorState.passwordCheck.message}
              isCheck={isPasswordCheck}
            />
          </RegisterArea>
          <MarginBox height={4} />
          <ButtonWrapper>
            <LargeButton
              children="다음"
              variant="default"
              disabled={!isNextEnabled}
              onClick={handleNextClick}
            />
          </ButtonWrapper>

          <FlexBox gap={16} style={{ width: "100%" }}>
            <Line />
            <Text
              children="SNS로 가입하기"
              typo="Caption_1"
              color="gray_600"
              style={{ whiteSpace: "nowrap" }}
            />
            <Line />
          </FlexBox>

          <SocialLoginContainer>
            <LargeButton
              variant="google"
              children="Google로 시작하기"
              onClick={() =>
                (window.location.href =
                  "https://timetile-api.click/oauth2/authorization/google")
              }
            />
            <LargeButton
              variant="kakao"
              children="Kakao로 시작하기"
              onClick={() =>
                (window.location.href =
                  "https://timetile-api.click/oauth2/authorization/kakao")
              }
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
  width: 100%;
  max-width: 424px;
  padding: 46px 0;

  @media (max-width: 480px) {
    padding: 46px 10px;
  }
`;

const RegisterArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 54px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;

const MarginBox = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;

const Line = styled.div`
  width: 144px;
  height: 0;
  border: 1px solid ${theme.palette.gray_100};
`;

const SocialLoginContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 17px;
`;
