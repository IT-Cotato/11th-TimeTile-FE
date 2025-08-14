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

  normalRegister: (body: {
    email: string;
    password: string;
    nickname: string;
    introduction: string | null;
    imageKey: string | null;
    agreementIds: number[];
  }) => axiosApi.post("/auth/signup", body),

  socialRegister: (body: {
    temporaryToken: string;
    nickname: string;
    introduction: string | null;
    imageKey: string | null;
    agreementIds: number[];
  }) => axiosApi.post("/auth/oauth2/signup", body),

  getPresignedUrl: (extension: "jpg" | "jpeg" | "png") =>
    axiosApi.post("/users/files", { extension }),

  getTerms: () => axiosApi.get("/terms"),

  logout: () => axiosApi.post("/auth/logout"),
};
