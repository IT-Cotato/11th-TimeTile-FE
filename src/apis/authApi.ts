import { axiosApi } from "@/apis/axios";

export const authApi = {
  checkEmailAvailable: (email: string) =>
    axiosApi.get("/auth/email/check", { params: { email } }),

  sendCode: (email: string) =>
    axiosApi.post("/auth/email/send-code", { email }),

  verifyCode: (email: string, verificationCode: string) =>
    axiosApi.post("/auth/email/verify", { email, verificationCode }),

  checkNickname: (nickname: string) =>
    axiosApi.get("/users/profile/nickname/check", { params: { nickname } }),
};
