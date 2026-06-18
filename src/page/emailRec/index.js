import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StatusBar,
  Image,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { useAuth } from "../../context/AuthContext";

export default function EmailRec() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [erro, setErro] = useState('');
  const { EnviarEmailCont } = useAuth();

  const navigation = useNavigation();

  async function enviar() {
    setLoading(true);
    const emailvalor = await EnviarEmailCont(email);
    console.log(emailvalor);

    if (emailvalor) {
      setLoading(false);
      navigation.navigate("verificationCode", { email });
    } else {
      setLoading(false);
      setErro("Não foi encontrado um usuário com este e-mail.");
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Header roxo com logo */}
          <View style={styles.header}>
            <Image
              source={require("./img/logo.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* Card branco até o final */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Esqueceu a senha?</Text>
            <Text style={styles.subtitle}>Receba a senha em duas etapas.</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Qual seu e-mail de cadastro?</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#C4C4C4"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErro('');
                }}
              />
              {erro && <Text style={styles.mensagemErro}>{erro}</Text>}
            </View>

            <View style={styles.buttonRow}>
              <Pressable
                style={styles.backButton}
                onPress={() => navigation.navigate("login")}
              >
                <Ionicons name="chevron-back" size={24} color="white" />
              </Pressable>

              <Pressable style={styles.sendButton} onPress={enviar}>
                {loading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.sendButtonText}>Enviar</Text>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}