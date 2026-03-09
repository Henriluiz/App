import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../page/menu"

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Menu" component={Menu} />
    </Stack.Navigator>
  );
}