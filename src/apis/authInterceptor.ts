import { AxiosInstance, AxiosError } from 'axios';

export const authInterceptor = (
  authAxios: AxiosInstance,
  axiosApi: AxiosInstance,
) => {
  // 요청 시 쿠키 전송 설정
  authAxios.interceptors.request.use(config => {
    config.withCredentials = true;
    return config;
  });

  authAxios.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // accessToken이 만료되어 401 발생시
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          await axiosApi.post('/auth/reissue', {}, { withCredentials: true });
          return authAxios(originalRequest);
        } catch (refreshError) {
          // 재발급 실패 (refreshToken 만료)
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    },
  );
};
