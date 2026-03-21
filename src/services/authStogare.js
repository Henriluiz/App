import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const AUTH_KEY = "auth";

async function setItem(key, value) {
  if (Platform.OS === "web") {
    localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

async function getItem(key) {
  if (Platform.OS === "web") {
    return localStorage.getItem(key);
  }

  return await SecureStore.getItemAsync(key);
}

async function deleteItem(key) {
  if (Platform.OS === "web") {
    localStorage.removeItem(key);
    return;
  }

  await SecureStore.deleteItemAsync(key);
}

// ✅ salva tudo junto
export async function saveSession(token, user) {
  const data = {
    token,
    user,
  };

  await setItem(AUTH_KEY, JSON.stringify(data));
}

// ✅ pega só o token
export async function getToken() {
  const data = await getItem(AUTH_KEY);
  if (!data) return null;

  return JSON.parse(data).token;
}

// ✅ pega só o user
export async function getUser() {
  const data = await getItem(AUTH_KEY);
  if (!data) return null;

  return JSON.parse(data).user;
}

// ✅ limpa tudo
export async function clearSession() {
  await deleteItem(AUTH_KEY);
}