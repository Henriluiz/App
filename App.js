import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/page/splash";
import Login from "./src/page/login";
import Cadastro from "./src/page/cadastro";
import DadoPessoal from "./src/page/dadoPessoal";
import DadoConta from "./src/page/dadoConta";
import Menu from "./src/page/menu";
import CadFinal from "./src/page/cadFinal";
import EsquecerSenha from "./src/page/esquecerSenha";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        <Stack.Screen name="splash" component={Splash} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="cadastro" component={Cadastro} />
        <Stack.Screen name="dadoPessoal" component={DadoPessoal} />
        <Stack.Screen name="dadoConta" component={DadoConta} />
        <Stack.Screen name="cadFinal" component={CadFinal} />
        <Stack.Screen name="menu" component={Menu} />
        <Stack.Screen name="esquecerSenha" component={EsquecerSenha} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}