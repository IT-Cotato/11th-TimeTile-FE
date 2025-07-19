"use client";

import { useFunnel } from "@/hooks/useFunnel";
import Account from "@/components/register/Account";
import Profile from "@/components/register/Profile";
import Terms from "@/components/register/Terms";

export default function Register() {
  const { Funnel, Step, toNext, toPrev } = useFunnel([
    "terms",
    "account",
    "profile",
  ]);

  return (
    <Funnel>
      <Step name="terms">
        <Terms onNext={toNext} />
      </Step>
      <Step name="account">
        <Account onNext={toNext} onPrev={toPrev} />
      </Step>
      <Step name="profile">
        <Profile onPrev={toPrev} />
      </Step>
    </Funnel>
  );
}
