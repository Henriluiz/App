import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {verificarCodigo} from "../../services/authService";

export default function VerificationCode({ route }) {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputs = useRef([]);

  const navigation = useNavigation();

  const {email} = route.params;

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '' && index < 4) {
      inputs.current[index + 1].focus();
    }
  };

  async function authCodigo() {
    const response = await verificarCodigo(email, code.join(''));
    console.log(response);

    if (response) {
      navigation.navigate("esquecerSenha")
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

     
      <View style={styles.header}>
        <Image source={require("./img/logo.png")} style={styles.logoImage} resizeMode="contain" />
      
      </View>

      
      <View style={styles.whiteCard}>
        <Text style={styles.mainTitle}>
          Acabamos de enviar um código para seu e-mail
        </Text>
        <Text style={styles.description}>
          Insira no campo abaixo o código de verificação de 5 dígitos enviado para o seu e-mail.
        </Text>

      
        <View style={styles.otpContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpInput}
              keyboardType="number-pad"
              maxLength={1}
              onChangeText={(text) => handleCodeChange(text, index)}
              value={digit}
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
        </View>

        <Pressable>
          <Text style={styles.resendText}>Reenviar código</Text>
        </Pressable>

        <Pressable style={styles.buttonEnviar}>
          <Text style={styles.buttonText}>Enviar</Text>
        </Pressable>

        <Text style={styles.tipText}>
          Dica: Caso não encontre o e-mail na sua caixa de entrada, verifique a pasta de Spam.
        </Text>
      </View>
    </SafeAreaView>
  );
}

