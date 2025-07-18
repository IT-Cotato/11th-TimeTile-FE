"use client";

import { useFunnel } from "@/hooks/useFunnel";
import Account from "@/components/register/Account";
import Profile from "@/components/register/Profile";
import Terms from "@/components/register/Terms";

export default function Register() {
  const { Funnel, Step, toNext, toPrev } = useFunnel([
    "account",
    "profile",
    "terms",
  ]);

  return (
    <Funnel>
      <Step name="account">
        <Account onNext={toNext} />
      </Step>
      <Step name="profile">
        <Profile onNext={toNext} onPrev={toPrev} />
      </Step>
      <Step name="terms">
        <Terms />
      </Step>
    </Funnel>
  );
}
