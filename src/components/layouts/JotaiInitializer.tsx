"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { userProfileAtom } from "@/store/UserProfileAtom";
import { usersApi } from "@/apis/usersApi";

export function JotaiInitializer() {
  const setUserProfile = useSetAtom(userProfileAtom);

  useEffect(() => {
    if (localStorage.getItem("loggedOut")) {
      setUserProfile(null);
      return;
    }

    usersApi
      .getMyProfile()
      .then((res) => setUserProfile(res.data))
      .catch(() => setUserProfile(null));
  }, [setUserProfile]);

  return null;
}
