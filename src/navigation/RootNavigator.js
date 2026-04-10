import React from "react";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Splash />;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}