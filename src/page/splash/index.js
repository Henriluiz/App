import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';


export default function Splash( {closeSplash} ) {
  const navigation = useNavigation();

  const telaLogin = () => {
    navigation.replace('login'); // Abre o caminho sem voltar (Sem a seta de volta na próxima tela)
  };


  return (
    <View style={styles.container}>
        <Animatable.Image animation={"bounceIn"} onAnimationEnd={() => closeSplash()} duration={3000} source={require("./icon/logo.png")}
            style={styles.ima}>
        </Animatable.Image>
      <StatusBar style="auto" />
    </View>
  );
}