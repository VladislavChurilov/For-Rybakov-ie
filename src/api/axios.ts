import axios, { AxiosInstance } from "axios";
import { getCookie, deleteCookie, setCookie } from "cookies-next";

const ACCESS_TOKEN_KEY = process.env.ACCESS_KEY || "ourAccessToken";

export const setAuthToken = (token: string) => {
  if (!token) {
    return false;
  }
  return setCookie(ACCESS_TOKEN_KEY, token);
};

export const getAuthToken = () => getCookie(ACCESS_TOKEN_KEY);

export const removeAuthToken = () => deleteCookie(ACCESS_TOKEN_KEY);

const apiInstance: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.BASE_URL || "https://some.api.domain.com",
  timeout: 5000,
});

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error("Network error"));
    }
    // Если сайт мультиязычный сюда приходит код\хеш и ошибка сразу выводится в нужной локали
    if (error.response && error.response.status === 401) {
      removeAuthToken();
      window.location.href = "/login"; // понятно что в проекте было бы что то типа RoutesEnum.LOGIN
    }

    if (error.response.status === 409) {
      // представим что 409 падает только на запрос withdrawal =)
      return Promise.reject(new Error("Withdrawal already submitted"));
    }

    return Promise.reject(error);
  },
);
export default apiInstance;
