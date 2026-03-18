import React, { createContext, useContext, useEffect, useState } from "react";
import { login, getPerfil, logout, deleteConta } from "../services/authService";
import {
  saveSession,
  clearSession,
  getToken,
  getUser,
} from "../services/authStogare";
import { authEvents } from "../services/authEvents";

const AuthContext = createContext({});

// * SEMPRE QUE FOR ADD UMA FUNCÃO NOVA, ADD ELE NO AuthContext.Provider

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function signIn(loginInput, senha) {

    const data = await login(loginInput, senha);

    const token = data.access_token;
    const user = data.user;

    await saveSession(token, user);

    setUser(user);

  }

  async function signOut() {

    try {
      await logout();
    } catch (e) {}

    await clearSession();

    setUser(null);

  }

  // Deletar a conta
  async function removeAccount() {

    try {
      await deleteConta();
    } catch (e) {
      console.log("Erro ao deletar conta", e);
    }

    await clearSession();
    setUser(null);

  }

  const bootstrap = async () => {

    try {

      const token = await getToken();

      if (!token) {
        setUser(null);
        return;
      }

      const user = await getUser();
      setUser(user);

    } catch (error) {

      console.log("Erro no bootstrap", error);
      setUser(null);

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
        removeAccount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}