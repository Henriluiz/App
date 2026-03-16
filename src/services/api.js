import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  saveSession,
  clearSession,
  getStoredUser,
} from "./auth-stogare";
import { authEvents } from "./auth-events";

const api = axios.create({
  baseURL: "http://10.0.2.2:8000", // troque conforme seu ambiente
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
}

// 1) Adiciona access token em toda requisição
api.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 2) Intercepta 401 e tenta refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response) {
      return Promise.reject(error);
    }

    const status = error.response.status;

    const isRefreshRequest =
      originalRequest?.url?.includes("/auth/refresh");

    if (status !== 401 || isRefreshRequest) {
      return Promise.reject(error);
    }

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject,
        });
      })
        .then((newAccessToken) => {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const refreshToken = await getRefreshToken();

      if (!refreshToken) {
        throw new Error("Refresh token não encontrado");
      }

      const refreshResponse = await axios.post(
        "http://10.0.2.2:8000/auth/refresh",
        {
          refresh_token: refreshToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;

      const storedUser = await getStoredUser();

      await saveSession({
        accessToken,
        refreshToken: newRefreshToken ?? refreshToken,
        user: storedUser,
      });

      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      processQueue(null, accessToken);

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      await clearSession();
      authEvents.emit("logout");
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;