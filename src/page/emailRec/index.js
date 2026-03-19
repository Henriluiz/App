import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o expo-icons
import styles from "./styles";

export default function EmailRec({ navigation }) {
  const [email, setEmail] = useState('');

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

      
          <Pressable style={styles.sendButton} onPress={() => navigation.navigate("esquecerSenha")}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
