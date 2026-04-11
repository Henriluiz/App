import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "../page/menu";
import CentralCuidado from "../page/central-de-cuidado";
import Perfil from "../page/perfil";
import EditarPerfil from "../page/editarPerfil";
import VisualizarPsi from "../page/visualizarPsi";
import Pesquisa from "../page/pesquisa";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="pesquisa"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="menu" component={Menu} />
      <Stack.Screen name="central-de-cuidado" component={CentralCuidado} />
      <Stack.Screen name="perfil" component={Perfil} />
      <Stack.Screen name="editarPerfil" component={EditarPerfil} /> */}
      <Stack.Screen name="visualizarPsi" component={VisualizarPsi} />
      <Stack.Screen name="pesquisa" component={Pesquisa} />
    </Stack.Navigator>
  );
}