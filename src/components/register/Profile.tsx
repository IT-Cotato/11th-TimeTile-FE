"use client";

import { FlexBox } from "@/components/layouts/FlexBox";
import styled from "styled-components";
import { LargeButton } from "@/components/atoms/LargeButton";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import { CheckButton } from "../atoms/CheckButton";
import { useState } from "react";
import RegisterHeader from "./RegisterHeader";
import { ProfileImageUploader } from "./ProfileImageUploader";
import { useRouter } from "next/navigation";
import { authApi } from "@/apis/authApi";

export default function Profile({ onPrev }: { onPrev: () => void }) {
  const router = useRouter();
  const [info, setInfo] = useState({
    nickname: "",
    intro: "",
    profileImage: null as File | null,
  });

  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessages, setSuccessMessages] = useState("");

  const handleChange = (
    key: keyof typeof info,
    value: string | File | null
  ) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
    if (key === "nickname") {
      setIsNicknameAvailable(false);
      setErrorMessage("");
      setSuccessMessages("");
    }
  };

  const validateNickname = (nickname: string) => {
    const regex = /^[가-힣a-z0-9]{2,15}$/;
    return regex.test(nickname);
  };

  const handleCheckNickname = async () => {
    if (!info.nickname.trim()) {
      setIsNicknameAvailable(false);
      setErrorMessage("닉네임을 입력해주세요.");
      setSuccessMessages("");
      return;
    }

    if (!validateNickname(info.nickname)) {
      setIsNicknameAvailable(false);
      setErrorMessage("닉네임은 2~15자, 한글/소문자/숫자만 가능합니다.");
      setSuccessMessages("");
      return;
    }

    try {
      const { data } = await authApi.checkNickname(info.nickname);
      if (data.isSuccess && data.data?.isAvailable) {
        setIsNicknameAvailable(true);
        setErrorMessage("");
        setSuccessMessages("사용 가능한 닉네임입니다.");
      } else {
        setIsNicknameAvailable(false);
        setErrorMessage("이미 사용중인 닉네임입니다.");
        setSuccessMessages("");
      }
    } catch {
      setIsNicknameAvailable(false);
      setErrorMessage("닉네임 중복 확인에 실패했습니다.");
      setSuccessMessages("");
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24}>
          <RegisterHeader currentStep={3} onPrev={onPrev} />
          <RegisterArea>
            <ProfileImageUploader
              imageFile={info.profileImage}
              onChange={(file) => handleChange("profileImage", file)}
            />
            <Row>
              <OnboardingInput
                variant="default"
                value={info.nickname}
                onChange={(e) => handleChange("nickname", e.target.value)}
                width={350}
                label="닉네임"
                placeholder="닉네임을 입력해주세요."
                isError={!isNicknameAvailable && !!errorMessage}
                errormsg={errorMessage}
                isCheck={isNicknameAvailable}
                required
                successMsg={successMessages}
              />
              <CheckButton children="중복 확인" onClick={handleCheckNickname} />
            </Row>
            <OnboardingInput
              variant="count"
              value={info.intro}
              onChange={(e) => handleChange("intro", e.target.value)}
              label="한줄 소개"
              placeholder="자기소개를 입력해주세요."
            />
          </RegisterArea>
          <ButtonWrapper>
            <LargeButton
              children="회원가입"
              variant="default"
              onClick={() => {
                router.push("/");
              }}
              disabled={!isNicknameAvailable}
            />
          </ButtonWrapper>
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
  gap: 23px;
  margin-top: 54px;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  margin-top: 34px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
`;
