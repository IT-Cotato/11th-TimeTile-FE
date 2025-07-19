"use client";
import { useRouter } from "next/Navigation";
import styled from "styled-components";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import Svg from "@/components/atoms/Svg";
import { SymbolTextLogo } from "@/assets/images/SymbolTextLogo";
import { LeftIcon } from "@/assets/icons/LeftIcon";

export default function RegisterHeader({
  currentStep,
  onPrev,
}: {
  currentStep: number;
  onPrev: () => void;
}) {
  const router = useRouter();

  return (
    <>
      <BackIconWrapper onClick={onPrev}>
        <Svg children={<LeftIcon />} />
      </BackIconWrapper>
      <CloseIconWrapper onClick={() => router.back()}>
        <Svg children={<CloseIcon />} />
      </CloseIconWrapper>
      <ProgressBar currentStep={currentStep} totalStep={3} />
      <MarginBox />
      <Svg children={<SymbolTextLogo />} onClick={() => router.push("/")} />
    </>
  );
}

const BackIconWrapper = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  cursor: pointer;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  cursor: pointer;
`;

const MarginBox = styled.div`
  height: 54px;
`;
