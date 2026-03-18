import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Pressable
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import styles from "./styles";

export default function Menu({ navigation }) {

  const route = useRoute

  const { user } = useAuth();
  useEffect(() => {

    async function load() {

      const data = await getPerfil();

      setUser(data);

    }

    load();

  }, []);
  // -----------------

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.greeting}>Boa tarde,</Text>
            <Text style={styles.name}>{user?.nome}</Text>

            <View style={styles.headerIcons}>
              <Ionicons name="information-circle-outline" size={22} color="#fff" />
              <Ionicons name="notifications-outline" size={22} color="#fff" style={{ marginLeft: 10 }} />
            </View>
          </View>

          <View style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>Próxima sessão</Text>
            <Text style={styles.sessionDate}>Hoje, às 15hrs</Text>

            <TouchableOpacity style={styles.sessionButton}>
              <Text style={styles.sessionButtonText}>Entrar na sala</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* AÇÕES RÁPIDAS */}
        <Text style={styles.sectionTitle}>Ações rápidas</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard}>
            <Feather name="edit" size={24} color="#6C63FF" />
            <Text style={styles.actionTitle}>Agendar</Text>
            <Text style={styles.actionSubtitle}>Nova consulta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard}>
            <Feather name="clock" size={24} color="#6C63FF" />
            <Text style={styles.actionTitle}>Sessões</Text>
            <Text style={styles.actionSubtitle}>Ver histórico</Text>
          </TouchableOpacity>
        </View>

        {/* REGISTRO DE HUMOR */}
        <Text style={styles.sectionTitle}>Registre seu humor</Text>
        <View style={styles.moodContainer}>
          {["sad-outline", "happy-outline", "heart-outline", "sunny-outline", "thumbs-up-outline"].map(
            (icon, index) => (
              <TouchableOpacity key={index} style={styles.moodButton}>
                <Ionicons name={icon} size={22} color="#555" />
              </TouchableOpacity>
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

      {/* BOTTOM NAV */}
      <View style={styles.bottomNav}>

        <Pressable onPress={() => navigation.navigate('menu')}>
          <Ionicons
            name="home"
            size={24}
            color={route.name === "Home" ? "#6C63FF" : "#999"}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Curtidas")}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={route.name === "Curtidas" ? "#6C63FF" : "#999"}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Chat")}>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={route.name === "Chat" ? "#6C63FF" : "#999"}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('perfil')}>
          <Ionicons
            name="person-outline"
            size={24}
            color={route.name === "Perfil" ? "#6C63FF" : "#999"}
          />
        </Pressable>

      </View>
    </SafeAreaView>
  );
}