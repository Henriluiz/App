import React from "react";
import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

import styles from "./styles";

export default function NavBar({ tela }) {
  const navigation = useNavigation();
  const route = useRoute();

  // 🔥 CONFIGURAÇÃO DOS BOTÕES
  const tabs = [
    {
      key: "home",
      icon: tela === "home" ? "home" : "home-outline",
      route: "menu",
    },
    {
      key: "pesquisa",
      icon: tela === "pesquisa" ? "search" : "search-outline",
      route: "pesquisa",
    },
    {
      key: "chat",
      icon: tela === "chat" ? "chatbubble" : "chatbubble-outline",
      route: "chat", // 🔥 IMPORTANTE: cria essa rota depois
    },
    {
      key: "perfil",
      icon: tela === "perfil" ? "person" : "person-outline",
      route: "perfil",
    },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.key}
          onPress={() => {
            if (route.name !== tab.route) {
              navigation.navigate(tab.route);
            }
          }}
        >
          <Ionicons
            name={tab.icon}
            size={24}
            color={tela === tab.key ? "#5DE2D4" : "#999"}
          />
        </Pressable>
      ))}
    </View>
  );
}