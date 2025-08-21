"use client";

import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { useRouter } from "next/navigation";
import { theme } from "@/styles/theme";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";

export default function LoggedOutPage() {
  const router = useRouter();

  return (
    <Wrapper>
      <TextWrapper>
        <Text typo="H3_2" color="primary_700">
          팔로우한 데크의 새로운 타임타일
        </Text>
      </TextWrapper>
      <LoginComponent>
        <MoveLeftIcon />
        <CheckTimeTile>
          <Text typo="H5" color="primary_600">
            로그인하고 새로운 타임타일을 확인해보세요!
          </Text>
        </CheckTimeTile>
        <MoveRightIcon />
      </LoginComponent>
      <Divider />
      <TextWrapper>
        <Text typo="H3_2" color="primary_700">
          팔로우한 유저의 새로운 마이타일
        </Text>
      </TextWrapper>
      <LoginComponent>
        <MoveLeftIcon />
        <CheckTimeTile>
          <Text typo="H5" color="primary_600">
            로그인하고 새로운 마이타일을 확인해보세요!
          </Text>
        </CheckTimeTile>
        <MoveRightIcon />
      </LoginComponent>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  width: 1128px;
`;

const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const LoginComponent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${theme.palette.gray_300};
`;

const CheckTimeTile = styled.div`
  display: flex;
  width: 1128px;
  height: 120px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  border-radius: 16px;
  border: 1px solid var(--Primary-300, #c3dbff);
  background: var(--Primary-20, #fbfdff);
`;

const Divider = styled.div`
  width: 1144px;
  height: 1px;
  background-color: ${theme.palette.gray_100};
`;
