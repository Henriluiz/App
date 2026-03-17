import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

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

export async function saveSession(token, user) {

  await setItem(TOKEN_KEY, token);
  await setItem(USER_KEY, JSON.stringify(user));

}

export async function getToken() {

  return await getItem(TOKEN_KEY);

}

export async function getUser() {

  const data = await getItem(USER_KEY);

  return data ? JSON.parse(data) : null;

}

export async function clearSession() {

  await deleteItem(TOKEN_KEY);
  await deleteItem(USER_KEY);

}