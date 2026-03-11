import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../page/home"

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  );
}