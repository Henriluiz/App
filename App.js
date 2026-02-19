import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/page/splash";
import Cadastro from "./src/page/cadastro";
import Login from "./src/page/login";
import DadoPessoal  from "./src/page/dadoPessoal";
import DadoConta from "./src/page/dadoConta";
import Menu from "./src/page/menu";
import AuthStack from "./src/page/authStack";
import AppStack from "./src/page/AppStack";


const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  if (loading) {
    return <Splash closeSplash={() => setLoading(false)}/>;
  }

  return (
  <NavigationContainer>
    {user ? <AppStack closeAuthUser={() => setUser(false)}/> : <AuthStack onLogin={(u) => setUser(u)}/>}
  </NavigationContainer>
 );

}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  }

});;