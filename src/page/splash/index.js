import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from 'react';


export default function Splash() {
  const navigation = useNavigation();

  // ! Verifica se o caminho do gpt, passará de qualquer forma pelo splash, ou apenas se o user
  // ! Não tiver login

  return (
    <View style={styles.container}>
        <Animatable.Image animation={"bounceIn"} onAnimationEnd={() => navigation.replace('login')} duration={3000} source={require("./icon/logo.png")}
            style={styles.ima}>
        </Animatable.Image>
      <StatusBar style="auto" />
    </View>
  );
}