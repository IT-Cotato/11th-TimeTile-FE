'use client';

import { axiosApi } from '@/apis/axios';
import { usersApi } from '@/apis/usersApi';
import { CloseIcon } from '@/assets/icons/CloseIcon';
import { SymbolTextLogo } from '@/assets/images/SymbolTextLogo';
import { LargeButton } from '@/components/atoms/LargeButton';
import { OnboardingInput } from '@/components/atoms/OnboardingInput';
import Svg from '@/components/atoms/Svg';
import { Text } from '@/components/atoms/Text';
import { FlexBox } from '@/components/layouts/FlexBox';
import { userProfileAtom } from '@/store/UserProfileAtom';
import { theme } from '@/styles/theme';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styled from 'styled-components';

export default function Login() {
  const router = useRouter();
  const setUserProfile = useSetAtom(userProfileAtom);

  const gotoRegister = () => {
    router.push('/register');
  };

  const [info, setInfo] = useState({
    email: '',
    password: '',
  });
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (key: 'email' | 'password', value: string) => {
    setInfo(prev => ({
      ...prev,
      [key]: value,
    }));
    setIsError(false);
    setErrorMsg('');
  };

  const handleLogin = async () => {
    if (!info.email) {
      setIsError(true);
      setErrorMsg('이메일을 입력해주세요.');
      return;
    }
    if (!info.password) {
      setIsError(true);
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }
    try {
      const response = await axiosApi.post('/auth/login', {
        email: info.email,
        password: info.password,
      });

      if (response.status === 200) {
        const profileRes = await usersApi.getMyProfile();
        setUserProfile(profileRes.data);
        router.push('/');
        console.log('로그인 성공');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setIsError(true);
        setErrorMsg('존재하지 않는 유저입니다.');
      } else {
        setIsError(true);
        setErrorMsg('로그인에 실패했습니다.');
      }
    }
  };

  const kakaoLogin = () => {
    window.location.href =
      'https://timetile-api.click/oauth2/authorization/kakao';
  };

  const googleLogin = () => {
    window.location.href =
      'https://timetile-api.click/oauth2/authorization/google';
  };

  return (
    <Wrapper>
      <CloseIconWrapper onClick={() => router.back()}>
        <Svg children={<CloseIcon />} />
      </CloseIconWrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24} style={{ height: '100%' }}>
          <Svg children={<SymbolTextLogo />} onClick={() => router.push('/')} />
          <LoginArea>
            <OnboardingInput
              variant="default"
              value={info.email}
              onChange={e => handleChange('email', e.target.value)}
              label="이메일"
              placeholder="이메일을 입력해주세요"
            />
            <OnboardingInput
              variant="password"
              value={info.password}
              onChange={e => handleChange('password', e.target.value)}
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              isError={isError}
              errormsg={errorMsg}
            />
          </LoginArea>
          {!isError && <MarginBox />}
          <ButtonWrapper>
            <LargeButton
              variant="default"
              width={424}
              onClick={handleLogin}
              disabled={!info.email || !info.password}
              children="로그인"
            />
          </ButtonWrapper>
          <FlexBox gap={16} style={{ width: '100%' }}>
            <Line />
            <Text
              children="SNS로 로그인하기"
              typo="Caption_1"
              color="gray_600"
              style={{ whiteSpace: 'nowrap' }}
            />
            <Line />
          </FlexBox>
          <SocialLoginContainer>
            <LargeButton
              variant="google"
              width={424}
              children="Google로 로그인"
              onClick={googleLogin}
            />
            <LargeButton
              variant="kakao"
              width={424}
              children="Kakao로 로그인"
              onClick={kakaoLogin}
            />
          </SocialLoginContainer>
          <FlexBox gap={16} style={{ width: '100%' }}>
            <Line />
            <Text
              children="아직 계정이 없으신가요?"
              typo="Caption_1"
              color="gray_600"
              style={{ whiteSpace: 'nowrap' }}
            />
            <Line />
          </FlexBox>
          <RegistButton onClick={gotoRegister}>
            <Text typo="Body_2" color="gray_1000" children="회원가입" />
          </RegistButton>
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

  @media (max-width: 480px) {
    padding: 0px 10px;
  }
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 424px;
  padding: 128px 0;
`;

const LoginArea = styled.div`
  margin-top: 68px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
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
  width: 100%;
`;

const RegistButton = styled.button`
  width: 100px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;
