import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/page/splash";
import Cadastro from "./src/page/cadastro";
import Login from "./src/page/login";
import DadoPessoal  from "./src/page/dadoPessoal";
import DadoConta from "./src/page/dadoConta";
import Menu from "./src/page/menu";
import CadFinal from "./src/page/cadFinal";


const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  if (loading) {
    return <Splash />;
  }

  return (
  <NavigationContainer>
    {user ? <Home closeAuthUser={setUser(false)}/> : <Login onLogin={(u) => setUser(u)}/>}
  </NavigationContainer>
 );

}

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  }

});;