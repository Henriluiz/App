import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Menu from "../page/menu";
import CentralCuidado from "../page/central-de-cuidado";
import Perfil from "../page/perfil";
import EditarPerfil from "../page/editarPerfil";
import VisualizarPsi from "../page/visualizarPsi";
import Pesquisa from "../page/pesquisa";
import Central from "../page/central-de-cuidado";
import DataHoraConsulta from "../page/dataHoraConsulta";
import confirConsulta from "../page/confirConsulta"
import MinhasSessoes from "../page/minhaSessao"

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="minhasSessoes"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="menu" component={Menu} />
      <Stack.Screen name="perfil" component={Perfil} />
      <Stack.Screen name="editarPerfil" component={EditarPerfil} />
      <Stack.Screen name="visualizarPsi" component={VisualizarPsi} options={{ 
        headerShown: true,
        title: 'Perfil Psicólogo',
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: {
          fontSize: 23,
          fontWeight: '600', // SemiBold
        },
        headerTintColor: '#A383FB',
        
      }}  />
      <Stack.Screen name="dataHoraConsulta" component={DataHoraConsulta} options={{ 
        headerShown: true,
        title: 'Solicitar Agendamento',
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: {
          fontSize: 23,
          fontWeight: '600', // SemiBold
        },
        headerTintColor: '#A383FB',
        
      }}  />
      <Stack.Screen name="confirConsulta" component={confirConsulta} options={{ 
        headerShown: true,
        title: 'Minhas Sessões',
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: {
          fontSize: 23,
          fontWeight: '600', // SemiBold
        },
        headerTintColor: '#A383FB',
        
      }}  />
      <Stack.Screen name="minhasSessoes" component={MinhasSessoes} options={{ 
        headerShown: true,
        title: 'Minhas Sessões',
        headerStyle: { backgroundColor: '#FFFFFF' },
        headerTitleStyle: {
          fontSize: 23,
          fontWeight: '600', // SemiBold
        },
        headerTintColor: '#A383FB',
        
      }}  />
      <Stack.Screen name="pesquisa" component={Pesquisa} />
      <Stack.Screen name="central" component={Central} />
    </Stack.Navigator>
  );
}