"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userProfileAtom } from "@/store/UserProfileAtom";
import { usersApi } from "@/apis/usersApi";

export function JotaiInitializer() {
  const setUserProfile = useSetAtom(userProfileAtom);

  useEffect(() => {
    usersApi
      .getMyProfile()
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch(() => {
        setUserProfile(null); // 로그인 안 된 경우
      });
  }, [setUserProfile]);

  return null;
}
