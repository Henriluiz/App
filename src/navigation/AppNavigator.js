import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../page/home"
import Perfil from "../page/perfil"
import EditarPerfil from "../page/editarPerfil";
import Menu from "../page/menu";

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