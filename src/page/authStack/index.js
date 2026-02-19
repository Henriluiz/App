const Stack = createNativeStackNavigator();
import DadoPessoal  from "../dadoPessoal";
import DadoConta from "../dadoConta";
import CadFinal from "../cadFinal";
import Login from "../login";
import Cadastro from "../cadastro";


export function AuthStack({ onLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login">
        {(props) => <Login {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name="cadastro" component={Cadastro} />
      <Stack.Screen name="dadoPessoal" component={DadoPessoal} />
      <Stack.Screen name="dadoConta" component={DadoConta} />
      <Stack.Screen name="cadFinal" component={CadFinal}/>
    </Stack.Navigator>
  );
}