import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Nomear from "../page/nomear";
import Login from "../page/login";
import CadastroPessoal from "../page/cadastro-pessoal"
import CadastroFoto from "../page/cadastro-foto";
import CadastroConta from "../page/cadastro-conta"
import CadastroFin from "../page/cadastro-finalizado"
import EmailRec from "../page/emailRec"
import VerificationCode from "../page/verificationCode"
import EsquecerSenha from "../page/esquecerSenha";


const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="nomear" component={Nomear} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="emailRec" component={EmailRec}/>
      <Stack.Screen name="verificationCode" component={VerificationCode}/>
      <Stack.Screen name="esquecerSenha" component={EsquecerSenha}/>
      <Stack.Screen name="cadastroPessoal" component={CadastroPessoal} />
      <Stack.Screen name="cadastroFoto" component={CadastroFoto} />
      <Stack.Screen name="cadastroConta" component={CadastroConta} />
      <Stack.Screen name="cadastroFin" component={CadastroFin} />
    </Stack.Navigator>
  );
}