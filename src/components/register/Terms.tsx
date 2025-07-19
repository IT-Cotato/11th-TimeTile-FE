"use client";

import { FlexBox } from "@/components/layouts/FlexBox";
import styled from "styled-components";
import RegisterHeader from "./RegisterHeader";
import { Buttons } from "../atoms/Buttons";
import { CheckBox } from "../atoms/CheckBox";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Terms({ onNext }: { onNext: () => void }) {
  const router = useRouter();
  const [agreement, setAgreement] = useState({
    service: false,
    community: false,
    privacy: false,
    marketing: false,
  });

  const handleCheckBox = (key: keyof typeof agreement) => {
    setAgreement((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checkAll = Object.values(agreement).every(Boolean);

  const handleAllAgree = () => {
    const isCheckAll = !checkAll;
    setAgreement({
      service: isCheckAll,
      community: isCheckAll,
      privacy: isCheckAll,
      marketing: isCheckAll,
    });
  };

  const isRequiredCheckedAll =
    agreement.service && agreement.community && agreement.privacy;

  return (
    <Wrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24}>
          <RegisterHeader
            currentStep={1}
            onPrev={() => router.push("/login")}
          />
          <RegisterArea>
            <CheckBox
              title="서비스 이용약관 동의"
              required={true}
              body="서비스 이용약관 서비스 이용약관서비스 이용약관서비스 이용약관"
              checked={agreement.service}
              onClick={() => handleCheckBox("service")}
            />
            <CheckBox
              title="커뮤니티 이용 규칙 확인"
              required={true}
              body="서비스 이용약관 서비스 이용약관서비스 이용약관서비스 이용약관"
              checked={agreement.community}
              onClick={() => handleCheckBox("community")}
            />
            <CheckBox
              title="개인정보 수집 및 이용 동의"
              required={true}
              body="서비스 이용약관 서비스 이용약관서비스 이용약관서비스 이용약관"
              checked={agreement.privacy}
              onClick={() => handleCheckBox("privacy")}
            />
            <CheckBox
              title="마케팅 정보 수신"
              required={false}
              body="서비스 이용약관 서비스 이용약관서비스 이용약관서비스 이용약관"
              checked={agreement.marketing}
              onClick={() => handleCheckBox("marketing")}
            />
            <AllCheckWrapper>
              <CheckBox
                title="위 약관에 모두 동의합니다."
                allAgree={true}
                checked={checkAll}
                onClick={handleAllAgree}
              />
            </AllCheckWrapper>
            <ButtonWrapper>
              <Buttons
                children="다음"
                variant="addTile"
                onClick={onNext}
                disabled={!isRequiredCheckedAll}
              />
            </ButtonWrapper>
          </RegisterArea>
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
  gap: 24px;
  margin-top: 54px;
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
  margin-top: -12px;
`;

const AllCheckWrapper = styled.div`
  align-self: flex-start;
`;
