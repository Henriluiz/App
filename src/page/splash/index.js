import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';

export default function Splash() {

  return (
    <View style={styles.container}>
        <Animatable.Image animation={"bounceIn"} duration={3000} source={require("./icon/logo.png")}
            style={styles.ima}>
        </Animatable.Image>
      <StatusBar style="auto" />
    </View>
  );
}