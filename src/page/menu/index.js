import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import NavBar from "../../components/NavBar";

import styles from "./styles";

export default function Menu({ navigation }) {

  const route = useRoute();

  const [buscaInicial, setBuscaInicial] = useState("")

  const capitalize = (str) => {
    // Verifica se str existe e é uma string
    if (!str || typeof str !== 'string') return '';
    
    // Remove espaços extras e verifica se não está vazia
    const trimmedStr = str.trim();
    if (trimmedStr.length === 0) return '';
    
    return trimmedStr
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const { user } = useAuth();
  // useEffect(() => {

  //   async function load() {

  //     const data = await getPerfil();

  //     setUser(data);

  //   }

  //   load();

  // }, []);
  // -----------------

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Boa tarde,</Text>
            <Text style={styles.name}>{capitalize(user?.nome)}</Text>

            <View style={styles.headerIcons}>
              <Ionicons name="information-circle-outline" size={22} color="#fff" />
              <Ionicons name="notifications-outline" size={22} color="#fff" style={{ marginLeft: 10 }} />
            </View>
          </View>

          <Pressable style={styles.sessionCard} onPress={() => navigation.navigate('pesquisa', buscaInicial)}>
            <View>
              <Ionicons name="search" size={20} color="white" />
            </View>
            <TextInput
              placeholder="Buscar psicólogo, especialidade..."
              placeholderTextColor="white"
              style={styles.input}
              value={buscaInicial}
              onChangeText={setBuscaInicial}
            />
          </Pressable>
          
        </View>

        {/* AÇÕES RÁPIDAS */}
        <Text style={styles.sectionTitle}>Ações rápidas</Text>
        <View style={styles.quickActions}>
          <Pressable style={styles.actionCard}>
            <Feather name="edit" size={24} color="#6C63FF" />
            <Text style={styles.actionTitle}>Agendar</Text>
            <Text style={styles.actionSubtitle}>Nova consulta</Text>
          </Pressable>

          <Pressable style={styles.actionCard}>
            <Feather name="clock" size={24} color="#6C63FF" />
            <Text style={styles.actionTitle}>Sessões</Text>
            <Text style={styles.actionSubtitle}>Ver histórico</Text>
          </Pressable>
        </View>

        {/* REGISTRO DE HUMOR */}
        <Text style={styles.sectionTitle}>Registre seu humor</Text>
        <View style={styles.moodContainer}>
          {["sad-outline", "happy-outline", "heart-outline", "sunny-outline", "thumbs-up-outline"].map(
            (icon, index) => (
              <Pressable key={index} style={styles.moodButton}>
                <Ionicons name={icon} size={22} color="#555" />
              </Pressable>
            )
          )}
        </View>

        {/* PARA VOCÊ */}
        <Text style={styles.sectionTitle}>Para você</Text>
        <View style={styles.recommendations}>
          <View style={styles.recommendCard}>
            <Text style={styles.recommendText}>Técnicas de respiração</Text>
          </View>

          <View style={styles.recommendCard}>
            <Text style={styles.recommendText}>Entendendo ansiedade</Text>
          </View>
        </View>
      </ScrollView>

      <NavBar 
        tela = "home"
      />
    </SafeAreaView>
  );
}