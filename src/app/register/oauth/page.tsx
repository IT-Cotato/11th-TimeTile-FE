"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { socialRegisterInfoAtom, socialTokenAtom } from "@/store/auth";

export default function OAuthRegisterPage() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const setSocialToken = useSetAtom(socialTokenAtom);
  const setSocialRegisterInfo = useSetAtom(socialRegisterInfoAtom);

  useEffect(() => {
    if (!token) {
      // router.replace("/");
      console.log("소셜 로그인 실패");
    } else {
      setSocialToken(token);
      setSocialRegisterInfo((prev) => ({
        ...prev,
        temporaryToken: token,
      }));
      router.replace(`/register`);
    }
  }, [token, router, setSocialToken, setSocialRegisterInfo]);

  return null;
}
