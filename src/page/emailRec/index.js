import { useState } from 'react';
import {View, Text, TextInput, StatusBar, Image, Pressable,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o expo-icons
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import {solicitarCodigo} from "../../services/authService"

export default function EmailRec() {
  const [email, setEmail] = useState('');

  const navigation = useNavigation();

  async function enviar() {
    console.log("Entrei 4!!")
    const emailvalor = await solicitarCodigo(email)
    console.log(emailvalor)

    if (emailvalor) {
      navigation.navigate("verificationCode", {
        email: email,
      });
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

     
      <View style={styles.header}>
        <Image source={require("./img/logo.png")} style={styles.logoImage} resizeMode="contain" />

      </View>

     
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
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.buttonRow}>
        
          <Pressable style={styles.backButton} onPress={() => navigation.navigate("login")}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>

      
          <Pressable style={styles.sendButton} onPress={() => enviar()}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
