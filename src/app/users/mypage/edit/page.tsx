"use client";

import { useAtom } from "jotai";
import { userProfileAtom } from "@/store/UserProfileAtom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { LargeButton } from "@/components/atoms/LargeButton";
import { usersApi } from "@/apis/usersApi";
import { useRouter } from "next/navigation";
import { OnboardingInput } from "@/components/atoms/OnboardingInput";
import { CheckButton } from "@/components/atoms/CheckButton";
import { authApi } from "@/apis/authApi";
import { ProfileEditUploader } from "@/components/mypage/ProfileEditUploader";

export default function EditProfile() {
  const [profile, setProfile] = useAtom(userProfileAtom);
  const [nickname, setNickname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (profile) {
      setNickname(profile.nickname || "");
      setIntroduction(profile.introduction || "");
      setPreview(profile.profileImageUrl || null);
      setProfileImage(null); // 초기엔 새 파일 없음
      setIsNicknameAvailable(true);
      setErrorMessage("");
      setSuccessMessage("");
    }
  }, [profile]);

  if (!profile) return <div>잘못된 접근입니다</div>;

  const isNicknameChanged = nickname !== profile.nickname;
  const isProfileImageChanged = !!profileImage;
  const isIntroChanged = introduction !== profile.introduction;
  const isModified =
    isNicknameChanged || isIntroChanged || isProfileImageChanged;

  // 닉네임 중복확인 버튼 비활성 조건
  const isCheckButtonDisabled =
    !isNicknameChanged || // 닉네임이 안바뀌었으면 중복확인 불필요
    !nickname.trim() ||
    !/^[가-힣a-z0-9]{2,15}$/.test(nickname) ||
    (errorMessage !== "" && !isNicknameAvailable);

  // 저장 버튼 활성
  const isSaveEnabled = isModified && isNicknameAvailable;

  const handleImageChange = (file: File | null) => {
    setProfileImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNickname = e.target.value;
    setNickname(newNickname);

    if (newNickname === profile.nickname) {
      setIsNicknameAvailable(true);
      setErrorMessage("");
      setSuccessMessage("현재 닉네임입니다.");
    } else {
      setIsNicknameAvailable(false);
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  // 닉네임 정규식
  const validateNickname = (nickname: string) => {
    const regex = /^[가-힣a-z0-9]{2,15}$/;
    return regex.test(nickname);
  };

  // 닉네임 중복 확인
  const handleCheckNickname = async () => {
    if (!nickname.trim()) {
      setErrorMessage("닉네임을 입력해주세요.");
      setSuccessMessage("");
      setIsNicknameAvailable(false);
      return;
    }

    if (!validateNickname(nickname)) {
      setErrorMessage("닉네임은 2~15자, 한글/소문자/숫자만 가능합니다.");
      setSuccessMessage("");
      setIsNicknameAvailable(false);
      return;
    }

    try {
      const { data } = await authApi.checkNickname(nickname);
      if (data.isSuccess && data.data?.isAvailable) {
        setSuccessMessage("사용 가능한 닉네임입니다.");
        setErrorMessage("");
        setIsNicknameAvailable(true);
      } else {
        setErrorMessage("이미 존재하는 닉네임입니다.");
        setSuccessMessage("");
        setIsNicknameAvailable(false);
      }
    } catch {
      setErrorMessage("닉네임 중복 확인에 실패했습니다.");
      setSuccessMessage("");
      setIsNicknameAvailable(false);
    }
  };

  const handleSave = async () => {
    if (!isNicknameAvailable) {
      alert("닉네임 중복 확인을 해주세요.");
      return;
    }

    try {
      await usersApi.updateProfile({
        nickname,
        introduction,
        profileImage,
      });

      const updated = await usersApi.getMyProfile();
      setProfile(updated);

      router.push("/users/mypage");
    } catch (err) {
      console.error("프로필 업데이트 실패", err);
      alert("프로필 수정에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <EditHeader>
          <IconDiv onClick={() => router.push("/users/mypage")}>
            <MoveLeftIcon />
          </IconDiv>
          프로필 수정
        </EditHeader>
        <Content>
          <EditContainer>
            <ProfileEditUploader
              imageFile={profileImage}
              previewUrl={preview}
              onChange={handleImageChange}
            />
            <Row>
              <OnboardingInput
                variant="default"
                value={nickname}
                onChange={handleNicknameChange}
                width={350}
                label="닉네임"
                placeholder="닉네임을 입력해주세요."
                isError={!isNicknameAvailable && !!errorMessage}
                errormsg={errorMessage}
                isCheck={isNicknameAvailable}
                successMsg={successMessage}
                required
              />
              <CheckButton
                onClick={handleCheckNickname}
                disabled={isCheckButtonDisabled}
              >
                중복 확인
              </CheckButton>
            </Row>
            <OnboardingInput
              variant="count"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
              label="한줄 소개"
              placeholder="자기소개를 입력해주세요."
            />
            <ButtonWrapper>
              <LargeButton
                variant="default"
                onClick={handleSave}
                disabled={!isSaveEnabled}
              >
                수정 완료
              </LargeButton>
            </ButtonWrapper>
          </EditContainer>
        </Content>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 100vh;
  padding: 0 119px;
  margin-top: 26px;
`;

const Wrapper = styled.div`
  width: 950px;
  margin: 0 auto;
  margin-bottom: 150px;
`;

const IconDiv = styled.div`
  cursor: pointer;
`;

const EditHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 100%;
`;

const EditContainer = styled.div`
  display: flex;
  width: 424px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  margin-top: 56px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
