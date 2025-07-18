"use client";

import { FlexBox } from "@/components/layouts/FlexBox";
import styled from "styled-components";
import { LargeButton } from "@/components/atoms/LargeButton";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import { CheckButton } from "../atoms/CheckButton";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/apis/axios";
import RegisterHeader from "./RegisterHeader";
import axios from "axios";
import { ProfileImageUploader } from "./ProfileImageUploader";

export default function Profile({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev: () => void;
}) {
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

  const handleCheckNickname = async () => {
    if (!info.nickname.trim()) {
      setIsNicknameAvailable(false);
      setErrorMessage("닉네임을 입력해주세요.");
      return;
    }

    if (info.nickname === "초연") {
      setIsNicknameAvailable(true);
      setErrorMessage("");
      setSuccessMessages("사용 가능한 닉네임입니다.");
      return;
    }

    try {
      const { data } = await axios.get(
        `${BASE_URL}/users/profile/nickname/check`,
        { params: { nickname: info.nickname } }
      );

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

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <Wrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24}>
          <RegisterHeader currentStep={2} />
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
          <LargeButton
            children="회원가입"
            variant="default"
            width={424}
            onClick={onNext}
            disabled={!isNicknameAvailable}
          />
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
  gap: 23px;
  margin-top: 54px;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  margin-top: 34px;
`;
