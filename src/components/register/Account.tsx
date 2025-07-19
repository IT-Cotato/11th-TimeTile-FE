"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/Navigation";

import { BASE_URL } from "@/apis/axios";
import { CheckButton } from "@/components/atoms/CheckButton";
import { LargeButton } from "@/components/atoms/LargeButton";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import { Text } from "@/components/atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { theme } from "@/styles/theme";

import RegisterHeader from "@/components/register/RegisterHeader";

export default function Account({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
  const router = useRouter();

  const [info, setInfo] = useState({
    email: "",
    checkcode: "",
    password: "",
    passwordCheck: "",
  });

  const [errorState, setErrorState] = useState({
    email: { isError: false, message: "" },
    checkcode: { isError: false, message: "" },
    passwordCheck: { isError: false, message: "" },
  });

  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [isCheckCodeSuccess, setIsCheckCodeSuccess] = useState(false);
  const [successMessages, setSuccessMessages] = useState("");

  const handleChange = (key: keyof typeof info, value: string) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
    setFieldError(key as keyof typeof errorState, false);
  };

  const setFieldError = (
    key: keyof typeof errorState,
    isError: boolean,
    message: string = ""
  ) => {
    setErrorState((prev) => ({
      ...prev,
      [key]: { isError, message },
    }));
  };

  const handleSendCode = async () => {
    if (!info.email) {
      setFieldError("email", true, "이메일을 입력해주세요.");
      return;
    }

    setIsCheckCodeSuccess(false);
    setSuccessMessages("");
    setFieldError("checkcode", false);

    if (info.email === "test1@naver.com") {
      setTimerSeconds(180);
      setIsCounting(true);
      return;
    }

    try {
      const { data } = await axios.get(`${BASE_URL}/auth/email/check`, {
        params: { email: info.email },
      });

      if (data.isSuccess && data.data?.isAvailable) {
        setTimerSeconds(180);
        setIsCounting(true);
      } else {
        setFieldError("email", true, "이미 등록된 이메일입니다.");
        setIsCounting(false);
      }
    } catch {
      setFieldError("email", true, "이메일 중복 체크에 실패했습니다.");
      setIsCounting(false);
    }
  };

  const handleCheckCode = () => {
    if (info.checkcode !== "123456") {
      setFieldError("checkcode", true, "올바르지 않은 인증번호입니다.");
      setIsCheckCodeSuccess(false);
      setSuccessMessages("");
    } else {
      setFieldError("checkcode", false);
      setSuccessMessages("인증이 완료되었습니다.");
      setIsCheckCodeSuccess(true);
      setTimerSeconds(0);
      setIsCounting(false);
    }
  };

  const handlePasswordCheck = () => {
    if (!info.passwordCheck) {
      setFieldError("passwordCheck", false);
      setIsPasswordCheck(false);
      return;
    }

    if (info.password !== info.passwordCheck) {
      setFieldError("passwordCheck", true, "비밀번호가 일치하지 않습니다.");
      setIsPasswordCheck(false);
    } else {
      setFieldError("passwordCheck", false);
      setIsPasswordCheck(true);
    }
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
                isError={errorState.checkcode.isError}
                errormsg={errorState.checkcode.message}
                isCheck={isCheckCodeSuccess}
                successMsg={successMessages}
              />
              <CheckButton children="인증 확인" onClick={handleCheckCode} />
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
              onBlur={handlePasswordCheck}
              label="비밀번호 확인"
              isError={errorState.passwordCheck.isError}
              errormsg={errorState.passwordCheck.message}
              isCheck={isPasswordCheck}
            />
          </RegisterArea>
          <MarginBox height={4} />
          <LargeButton
            children="다음"
            variant="default"
            width={424}
            disabled={!isNextEnabled}
            onClick={onNext}
          />
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
  width: 100%;
  padding: 46px 0;
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
  align-items: flex-start;
  gap: 10px;
`;

const MarginBox = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
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
