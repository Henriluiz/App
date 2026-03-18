import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de ter o expo-icons

export default function ForgotPassword() {
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
        
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>

      
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A88BFA', 
  },
  header: {
    height: '38%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 12,
  },
  logoImage: {
    width: 540,
    height: 440,
    marginBottom: -100,
  },

  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A88BFA',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#BDBDBD',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    color: '#A88BFA',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#A88BFA',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#A88BFA',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  sendButton: {
    backgroundColor: '#A88BFA',
    flex: 1,
    marginLeft: 15,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});