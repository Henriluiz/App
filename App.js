import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/page/splash";
import Cadastro from "./src/page/cadastro";
import Login from "./src/page/login";
import DadoPessoal  from "./src/page/dadoPessoal";
import DadoConta from "./src/page/dadoConta";


const Stack = createNativeStackNavigator();

export default function App() {

  return (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="splash">
      <Stack.Screen
        name="splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cadastro"
        component={Cadastro}
        options={{
            headerShown: false,
          }}
      />
      <Stack.Screen
        name="login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dadoConta"
        component={DadoConta}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="dadoPessoal"
        component={DadoPessoal}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
 );

}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  }

});;