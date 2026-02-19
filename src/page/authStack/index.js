const Stack = createNativeStackNavigator();

export function AuthStack({ onLogin }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login">
        {(props) => <Login {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen name="cadastro" component={Cadastro} />
      <Stack.Screen name="dadoConta" component={DadoConta} />
      <Stack.Screen name="dadoPessoal" component={DadoPessoal} />
    </Stack.Navigator>
  );
}