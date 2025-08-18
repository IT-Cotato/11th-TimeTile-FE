"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import RegisterHeader from "./RegisterHeader";
import { ProfileImageUploader } from "./ProfileImageUploader";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import { CheckButton } from "../atoms/CheckButton";
import { LargeButton } from "@/components/atoms/LargeButton";
import { useRouter } from "next/navigation";
import { authApi } from "@/apis/authApi";
import { FlexBox } from "@/components/layouts/FlexBox";
import { useAtom } from "jotai";
import {
  agreementIdsAtom,
  registerInfoAtom,
  socialRegisterInfoAtom,
} from "@/store/auth";

export default function Profile({
  onPrev,
  temporaryToken,
}: {
  onPrev: () => void;
  temporaryToken?: string;
}) {
  const router = useRouter();
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessages, setSuccessMessages] = useState("");

  const [registerInfo, setRegisterInfo] = useAtom(registerInfoAtom);
  const [socialRegisterInfo, setSocialRegisterInfo] = useAtom(
    socialRegisterInfoAtom
  );
  const [agreementIds] = useAtom(agreementIdsAtom);

  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState<string | null>(null);

  useEffect(() => {
    if (temporaryToken) {
      const stored = sessionStorage.getItem("agreementIds");
      if (stored) {
        const ids = JSON.parse(stored);
        setSocialRegisterInfo((prev) => ({
          ...prev,
          agreementIds: ids,
        }));
      }
    } else {
      setRegisterInfo((prev) => ({
        ...prev,
        agreementIds,
      }));
    }
  }, [temporaryToken, agreementIds, setSocialRegisterInfo, setRegisterInfo]);

  useEffect(() => {
    const currentInfo = temporaryToken ? socialRegisterInfo : registerInfo;
    setNickname(currentInfo.nickname);
    setIntro(currentInfo.intro);
  }, [temporaryToken, registerInfo, socialRegisterInfo]);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsNicknameAvailable(false);
    setErrorMessage("");
    setSuccessMessages("");
  };

  const handleIntroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntro(e.target.value);
  };

  const handleNicknameBlur = () => {
    if (temporaryToken) {
      setSocialRegisterInfo((prev) => ({ ...prev, nickname }));
    } else {
      setRegisterInfo((prev) => ({ ...prev, nickname }));
    }
  };

  const handleIntroBlur = () => {
    if (temporaryToken) {
      setSocialRegisterInfo((prev) => ({ ...prev, intro }));
    } else {
      setRegisterInfo((prev) => ({ ...prev, intro }));
    }
  };

  const currentInfo = temporaryToken ? socialRegisterInfo : registerInfo;

  const validateNickname = (nickname: string) => {
    const regex = /^[가-힣a-z0-9]{2,15}$/;
    return regex.test(nickname);
  };

  const handleCheckNickname = async () => {
    if (!currentInfo.nickname.trim()) {
      setIsNicknameAvailable(false);
      setErrorMessage("닉네임을 입력해주세요.");
      setSuccessMessages("");
      return;
    }

    if (!validateNickname(currentInfo.nickname)) {
      setIsNicknameAvailable(false);
      setErrorMessage("닉네임은 2~15자, 한글/소문자/숫자만 가능합니다.");
      setSuccessMessages("");
      return;
    }

    try {
      const { data } = await authApi.checkNickname(currentInfo.nickname);
      if (data.isSuccess && data.data?.isAvailable) {
        setIsNicknameAvailable(true);
        setErrorMessage("");
        setSuccessMessages("사용 가능한 닉네임입니다.");
      } else {
        setIsNicknameAvailable(false);
        setErrorMessage("이미 존재하는 닉네임입니다.");
        setSuccessMessages("");
      }
    } catch {
      setIsNicknameAvailable(false);
      setErrorMessage("닉네임 중복 확인에 실패했습니다.");
      setSuccessMessages("");
    }
  };

  const handleRegister = async () => {
    try {
      const uploadedImageKey = currentInfo.imageKey || null;

      if (temporaryToken) {
        await authApi.socialRegister({
          temporaryToken,
          nickname: currentInfo.nickname,
          introduction: currentInfo.intro ? currentInfo.intro : null,
          imageKey: uploadedImageKey,
          agreementIds: currentInfo.agreementIds,
        });
      } else {
        await authApi.normalRegister({
          email: registerInfo.email,
          password: registerInfo.password,
          nickname: registerInfo.nickname,
          introduction: registerInfo.intro ? registerInfo.intro : null,
          imageKey: registerInfo.imageKey ? registerInfo.imageKey : null,
          agreementIds: registerInfo.agreementIds,
        });
      }

      sessionStorage.removeItem("agreementIds");
      router.replace("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24}>
          <RegisterHeader currentStep={3} onPrev={onPrev} />
          <RegisterArea>
            <ProfileImageUploader
              imageFile={currentInfo.profileImage}
              onChange={(file) => {
                if (temporaryToken) {
                  setSocialRegisterInfo((prev) => ({
                    ...prev,
                    profileImage: file,
                  }));
                } else {
                  setRegisterInfo((prev) => ({ ...prev, profileImage: file }));
                }
              }}
              onUploadComplete={(key) => {
                if (temporaryToken) {
                  setSocialRegisterInfo((prev) => ({ ...prev, imageKey: key }));
                } else {
                  setRegisterInfo((prev) => ({ ...prev, imageKey: key }));
                }
              }}
            />
            <Row>
              <OnboardingInput
                variant="default"
                value={nickname}
                onChange={handleNicknameChange}
                onBlur={handleNicknameBlur}
                width={350}
                label="닉네임"
                placeholder="닉네임을 입력해주세요."
                isError={!isNicknameAvailable && !!errorMessage}
                errormsg={errorMessage}
                isCheck={isNicknameAvailable}
                required
                successMsg={successMessages}
              />
              <CheckButton onClick={handleCheckNickname}>중복 확인</CheckButton>
            </Row>
            <OnboardingInput
              variant="count"
              value={intro ?? ""}
              onChange={handleIntroChange}
              onBlur={handleIntroBlur}
              label="한줄 소개"
              placeholder="자기소개를 입력해주세요."
            />
          </RegisterArea>
          <ButtonWrapper>
            <LargeButton
              variant="default"
              onClick={handleRegister}
              disabled={!isNicknameAvailable}
            >
              회원가입
            </LargeButton>
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
