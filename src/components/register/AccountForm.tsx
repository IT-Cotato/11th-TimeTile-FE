import { useState } from "react";
import { authApi } from "@/apis/authApi";

export function AccountForm() {
  const [info, setInfo] = useState({
    email: "",
    checkcode: "",
    password: "",
    passwordCheck: "",
  });

  const [errorState, setErrorState] = useState({
    email: { isError: false, message: "" },
    checkcode: { isError: false, message: "" },
    password: { isError: false, message: "" },
    passwordCheck: { isError: false, message: "" },
  });

  const [isCheckCodeSuccess, setIsCheckCodeSuccess] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);
  const [successMessages, setSuccessMessages] = useState("");

  const setFieldError = (
    key: keyof typeof errorState,
    isError: boolean,
    message: string = ""
  ) => {
    setErrorState((prev) => ({
      ...prev,
      [key]: { isError, message },
    }));
  };

  const handleChange = (key: keyof typeof info, value: string) => {
    setInfo((prev) => ({ ...prev, [key]: value }));
    setFieldError(key as keyof typeof errorState, false);

    if (key === "email") {
      setIsCheckCodeSuccess(false);
      setSuccessMessages("");
    }
  };

  const handlePasswordCheck = () => {
    if (!info.passwordCheck) {
      setFieldError("passwordCheck", false);
      setIsPasswordCheck(false);
      return;
    }

    if (info.password !== info.passwordCheck) {
      setFieldError("passwordCheck", true, "비밀번호가 일치하지 않습니다.");
      setIsPasswordCheck(false);
    } else {
      setFieldError("passwordCheck", false);
      setIsPasswordCheck(true);
    }
  };

  const isPasswordValid = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>/?]).{6,19}$/;
    return regex.test(password);
  };

  const handlePasswordBlur = () => {
    if (!info.password) {
      setFieldError("password", false);
      return;
    }

    if (!isPasswordValid(info.password)) {
      setFieldError(
        "password",
        true,
        "비밀번호는 영문 대소문자, 숫자, 특수문자를 포함한 6자 이상 20자 미만으로 입력해주세요."
      );
    } else {
      setFieldError("password", false);
    }
  };

  const sendCode = async () => {
    if (!info.email) {
      setFieldError("email", true, "이메일을 입력해주세요.");
      return false;
    }

    setFieldError("email", false);
    setFieldError("checkcode", false);
    setIsCheckCodeSuccess(false);
    setSuccessMessages("");

    try {
      const { data: checkData } = await authApi.checkEmailAvailable(info.email);

      if (checkData.isSuccess && checkData.data?.isAvailable) {
        const { data: sendCodeData } = await authApi.sendCode(info.email);

        if (sendCodeData.isSuccess && sendCodeData.code === "COMMON002") {
          return true;
        } else {
          setFieldError("email", true, "인증코드 전송에 실패했습니다.");
          return false;
        }
      } else {
        setFieldError("email", true, "이미 등록된 이메일입니다.");
        return false;
      }
    } catch {
      setFieldError("email", true, "이메일 인증 요청에 실패했습니다.");
      return false;
    }
  };

  const checkCode = async () => {
    if (!info.checkcode) {
      setFieldError("checkcode", true, "인증번호를 입력해주세요.");
      return false;
    }

    setFieldError("checkcode", false);
    setIsCheckCodeSuccess(false);
    setSuccessMessages("");

    try {
      const { data } = await authApi.verifyCode(info.email, info.checkcode);

      if (data.isSuccess && data.code === "COMMON001") {
        setFieldError("checkcode", false);
        setSuccessMessages("인증이 완료되었습니다.");
        setIsCheckCodeSuccess(true);
        return true;
      } else {
        setFieldError("checkcode", true, "올바르지 않은 인증번호입니다.");
        setIsCheckCodeSuccess(false);
        return false;
      }
    } catch {
      setFieldError("checkcode", true, "인증번호 확인에 실패했습니다.");
      setIsCheckCodeSuccess(false);
      return false;
    }
  };

  return {
    info,
    errorState,
    successMessages,
    isCheckCodeSuccess,
    isPasswordCheck,
    setFieldError,
    handleChange,
    handlePasswordCheck,
    handlePasswordBlur,
    sendCode,
    checkCode,
    setInfo,
  };
}
