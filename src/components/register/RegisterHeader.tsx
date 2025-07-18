"use client";
import { useRouter } from "next/Navigation";
import styled from "styled-components";
import { ProgressBar } from "@/components/atoms/ProgressBar";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import Svg from "@/components/atoms/Svg";
import { SymbolTextLogo } from "@/assets/images/SymbolTextLogo";

export default function RegisterHeader({
  currentStep,
}: {
  currentStep: number;
}) {
  const router = useRouter();

  return (
    <>
      <CloseIconWrapper onClick={() => router.back()}>
        <Svg children={<CloseIcon />} />
      </CloseIconWrapper>
      <ProgressBar currentStep={currentStep} totalStep={3} />
      <MarginBox height={30} />
      <Svg children={<SymbolTextLogo />} />
    </>
  );
}

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  cursor: pointer;
`;

const MarginBox = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;
