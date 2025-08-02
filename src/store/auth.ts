import { atom } from "jotai";

export type RegisterInfo = {
  email: string;
  password: string;
  nickname: string;
  intro: string | null;
  profileImage: File | null;
  imageKey: string | null;
  agreementIds: number[];
};

export const registerInfoAtom = atom<RegisterInfo>({
  email: "",
  password: "",
  nickname: "",
  intro: null,
  profileImage: null,
  imageKey: null,
  agreementIds: [],
});

export type SocialRegisterInfo = {
  temporaryToken: string;
  nickname: string;
  intro: string | null;
  profileImage: File | null;
  imageKey: string | null;
  agreementIds: number[];
};

export const socialRegisterInfoAtom = atom<SocialRegisterInfo>({
  temporaryToken: "",
  nickname: "",
  intro: null,
  profileImage: null,
  imageKey: null,
  agreementIds: [],
});

export const socialTokenAtom = atom<string>("");
export const agreementIdsAtom = atom<number[]>([]);
