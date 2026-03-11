import React, { createContext, useContext, useEffect, useState } from "react";
import { login as loginService, getMe } from "../services/auth-service";
import {
  saveSession,
  clearSession,
  getAccessToken,
  getStoredUser,
} from "../services/auth-stogare";
import { authEvents } from "../services/auth-events";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signIn(email, password) {
    const data = await loginService(email, password);

    const accessToken = data.accessToken || data.token;
    const refreshToken = data.refreshToken;
    const userData = data.user;

    await saveSession({
      accessToken,
      refreshToken,
      user: userData,
    });

    setUser(userData);
  }

  async function signOut() {
    await clearSession();
    setUser(null);
  }

  async function bootstrap() {
    try {
      const token = await getAccessToken();
      const storedUser = await getStoredUser();

      if (!token) {
        setUser(null);
        return;
      }

      if (storedUser) {
        setUser(storedUser);
      }

      try {
        const freshUser = await getMe();
        setUser(freshUser);
      } catch (error) {
        await clearSession();
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    bootstrap();
  }, []);

  useEffect(() => {
    const handleLogout = async () => {
      await clearSession();
      setUser(null);
    };

    authEvents.on("logout", handleLogout);

    return () => {
      authEvents.off("logout", handleLogout);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}