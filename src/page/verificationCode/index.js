import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { verificarCodigo } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function VerificationCode({ route }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const inputs = useRef([]);

  const navigation = useNavigation();

  const {verificarCodigoSenha} = useAuth();

  const { email } = route.params;

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '' && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  async function authCodigo() {
    setLoading(true);
    setErro("")
    const codeLiso = code.join('');
    console.log(codeLiso)
    const response = await verificarCodigoSenha(email, codeLiso);
    console.log(response);

    setLoading(false);
    if (response?.error) {
      setErro(response.message)
    } else {
      setErro("")
      navigation.navigate("esquecerSenha", { email, codeLiso });
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header roxa com logo */}
          <View style={styles.header}>
            <Image
              source={require("./img/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Card branco que vai até o final da tela */}
          <View style={styles.whiteCard}>
            <Text style={styles.mainTitle}>
              Acabamos de enviar um código para seu e-mail
            </Text>
            <Text style={styles.description}>
              Insira no campo abaixo o código de verificação de 6 dígitos enviado para o seu e-mail.
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

            {erro && (<Text style={styles.mensagemErro}>{erro}</Text>)}

            <Pressable>
              <Text style={styles.resendText}>Reenviar código</Text>
            </Pressable>

            <Pressable style={styles.buttonEnviar} onPress={authCodigo}>
              {loading ? (<ActivityIndicator color="#FFF" size="small" />) : (
              <Text style={styles.buttonText}>Enviar</Text>)}
            </Pressable>

            <Text style={styles.tipText}>
              Dica: Caso não encontre o e-mail na sua caixa de entrada, verifique a pasta de Spam.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}