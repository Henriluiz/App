import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "../page/menu";
import Perfil from "../page/perfil"
import EditarPerfil from "../page/editarPerfil";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="menu" component={Menu} />
      <Stack.Screen name="perfil" component={Perfil}/>
      <Stack.Screen name="editarPerfil" component={EditarPerfil}/>
    </Stack.Navigator>
  );
}