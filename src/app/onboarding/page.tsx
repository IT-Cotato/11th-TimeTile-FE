"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { SymbolTextLogo } from "@/assets/images/SymbolTextLogo";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import { FlexBox } from "@/components/layouts/FlexBox";
import styled from "styled-components";
import { CheckButton } from "@/components/atoms/CheckButton";
import Svg from "@/components/atoms/Svg";

export default function OnboardingPage() {
  const [emailValue, setEmailValue] = useState("");
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [codeValue, setCodeValue] = useState("");
  const [value, setValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  const [isValueError, setIsValueError] = useState(false);

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    if (input.length > 30) {
      setIsValueError(true);
      return;
    }
    setIsValueError(false);
    setValue(input);
  }; //30자 제한을 위해

  // 타이머 초기화 (추후 인증코드 보내는 기능도 추가)
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

  return (
    <FlexBox
      style={{ height: "100vh" }}
      justify="center"
      align="center"
      direction="column"
      gap={20}
    >
      <StyledLogo>
        <Svg children={<SymbolTextLogo />} />
      </StyledLogo>
      <Container>
        <Row>
          <OnboardingInput
            variant="default"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            label="이메일"
            width={350}
          />
          <CheckButton onClick={handleSendCode} isDisabled={isCounting}>
            {isCounting ? "다시 보내기" : "이메일 인증"}
          </CheckButton>
        </Row>
        <Row>
          <OnboardingInput
            variant="checkcode"
            value={codeValue}
            onChange={(e) => setCodeValue(e.target.value)}
            timerSeconds={timerSeconds}
            label="인증번호"
            width={350}
          />
          <CheckButton children="인증 하기" />
        </Row>

        <OnboardingInput
          variant="password"
          value={pwValue}
          onChange={(e) => setPwValue(e.target.value)}
          label="비밀번호"
          isCheck={true}
        />
        <OnboardingInput
          variant="count"
          value={value}
          onChange={handleValueChange}
          label="한 줄 소개"
          required={true}
          isError={isValueError}
          errormsg="30자를 넘길 수 없습니다."
        />
      </Container>
    </FlexBox>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 78px;
  justify-content: center;
  align-items: center;
`;

const StyledLogo = styled.div`
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;
