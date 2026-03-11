import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Splash() {
  const navigation = useNavigation();

  const telaLogin = () => {
  navigation.replace("login");
};

  return (
    <View style={styles.container}>
      <Animatable.Image
        animation="bounceIn"
        duration={3000}
        source={require("./icon/logo.png")}
        style={styles.ima}
        onAnimationEnd={telaLogin}
      />

      <StatusBar style="auto" />
    </View>
  );
}