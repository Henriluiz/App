import axios from "axios";
import { getToken, clearSession } from "./authStogare";
import { reset } from "./navigationService";
import { Platform } from "react-native";

const BASE_URL = "http://192.168.18.99:8000";

export { BASE_URL };

const api = axios.create({
  baseURL: "http://192.168.18.99:8000/api",
  // php artisan serve --host=0.0.0.0 --port=8000
  timeout: 70000,
  headers: {
    "Content-Type": "application/json",
  },
});

// | ambiente         | URL correta |
// | ---------------- | ----------- |
// | Expo Web         | localhost   |
// | celular físico   | IP do PC    |
// | emulador Android | 10.0.2.2    |
// | iOS simulator    | localhost   |
//                          +
//                      :8000/api

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
api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// 2) Intercepta 401 e tenta refresh
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      await clearSession();

      console.log("Sessão expirada");

      reset("login");
    }

    return Promise.reject(error);
  },
);

export default api;
