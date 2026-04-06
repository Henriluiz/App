import React from "react";
import { useAuth } from "../context/AuthContext";
import Splash from "../page/splash";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  // const { user, loading } = useAuth();
  const user = true
  const loading = false

  if (loading) {
    return <Splash />;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}