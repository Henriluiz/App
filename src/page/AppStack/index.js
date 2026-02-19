const Stack = createNativeStackNavigator();
import Menu from "../menu";

export default function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="menu" component={Menu} />
    </Stack.Navigator>
  );
}
