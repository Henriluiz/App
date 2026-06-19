import AppNavigator from "./AppNavigator";
import AuthNavigator from "./AuthNavigator";
import Splash from "../page/splash";
import { useAuth } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./../../src/services/navigationService";

<NavigationContainer ref={navigationRef}></NavigationContainer>;

export default function RootNavigator() {
  const { user, loading } = useAuth();

  // const user = true
  // const loading = false

  if (loading) {
    return <Splash />;
  }
  console.log(user);
  return user ? <AppNavigator /> : <AuthNavigator />;
}
