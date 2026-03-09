import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Nomear from "../page/nomear";
import Login from "../page/login";
import CadastroPessoal from "../page/cadastro-pessoal"
import CadastroConta from "../page/cadastro-conta"
import CadastroFin from "../page/cadastro-finalizado"

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="nomear" component={Nomear} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="cadastroPessoal" component={CadastroPessoal} />
      <Stack.Screen name="cadastroConta" component={CadastroConta} />
      <Stack.Screen name="cadastroFin" component={CadastroFin} />
    </Stack.Navigator>
  );
}