import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Text, View, Pressable, ImageBackground, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';



export default function Splash() {
  const navigation = useNavigation();

  const telaLogin = () => {
    // Coloque aqui sua lógica (ex: API fetch)
    navigation.replace('login');
  };


  return (
    <View style={styles.container}>
        <Animatable.Image animation={"bounceIn"} onAnimationEnd={() => telaLogin()} duration={3000} source={require("./icon/logo.png")}
            style={styles.ima}>
        </Animatable.Image>
      <StatusBar style="auto" />
    </View>
  );
}