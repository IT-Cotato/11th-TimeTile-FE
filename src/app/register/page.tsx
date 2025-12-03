"use client";

import { useFunnel } from "@/hooks/useFunnel";
import Account from "@/components/register/Account";
import Profile from "@/components/register/Profile";
import Terms from "@/components/register/Terms";
import { useAtom } from "jotai";
import { agreementIdsAtom, socialTokenAtom } from "@/store/auth";

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

  const { Funnel, toNext, toPrev } = useFunnel(steps, initialStep);

  const handleTermsNext = (ids: number[]) => {
    setAgreementIds(ids);
    toNext();
  };

  return (
    <Funnel>
      <Funnel.Step name="terms">
        <Terms onNext={handleTermsNext} />
      </Funnel.Step>
      <Funnel.Step name="account">
        <Account onNext={toNext} onPrev={toPrev} />
      </Funnel.Step>
      <Funnel.Step name="profile">
        <Profile temporaryToken={socialToken} onPrev={toPrev} />
      </Funnel.Step>
    </Funnel>
  );
}
