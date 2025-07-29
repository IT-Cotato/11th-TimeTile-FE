"use client";

import { useFunnel } from "@/hooks/useFunnel";
import Account from "@/components/register/Account";
import Profile from "@/components/register/Profile";
import Terms from "@/components/register/Terms";
import { useAtom } from "jotai";
import { agreementIdsAtom, socialTokenAtom } from "@/store/auth";
import { useEffect, useState } from "react";
export default function Register() {
  const [socialToken] = useAtom(socialTokenAtom);
  const [agreementIds, setAgreementIds] = useAtom(agreementIdsAtom);

  const isSocial = !!socialToken;

  let steps = ["terms", "account", "profile"];
  let initialStep = "terms";

  if (isSocial) {
    if (agreementIds.length === 0) {
      steps = ["terms", "profile"];
      initialStep = "terms";
    } else {
      steps = ["profile"];
      initialStep = "profile";
    }
  }

  const { Funnel, Step, toNext, toPrev, currentStep } = useFunnel(
    steps,
    initialStep
  );

  const handleTermsNext = (ids: number[]) => {
    setAgreementIds(ids);
    toNext();
  };

  return (
    <Funnel>
      {steps.includes("terms") && (
        <Step name="terms">
          <Terms onNext={handleTermsNext} />
        </Step>
      )}
      {steps.includes("account") && (
        <Step name="account">
          <Account onNext={toNext} onPrev={toPrev} />
        </Step>
      )}
      {steps.includes("profile") && (
        <Step name="profile">
          <Profile temporaryToken={socialToken} onPrev={toPrev} />
        </Step>
      )}
    </Funnel>
  );
}
