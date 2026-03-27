import axios from "axios";
import { getToken, clearSession } from "./authStogare";

const api = axios.create({
  baseURL: "http://10.0.2.2:8000/api", // ! Seguir a tabela abaixo http://192.168.18.99:8000/api
  timeout: 10000,
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

  return config;

});

// 2) Intercepta 401 e tenta refresh
api.interceptors.response.use(
  response => response,

  async error => {

    if (error.response?.status === 401) {

      await clearSession();

      console.log("Sessão expirada");

    }

    return Promise.reject(error);
  }
);

export default api;