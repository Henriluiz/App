import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const NOTIFICACOES = [
  {
    id: 1,
    tipo: "confirmado",
    titulo: "Pedido de consulta confirmado",
    descricao: "Sua consulta com Dr. Gustavo foi confirmada para 15/05 às 14:00.",
    hora: "14:30",
    lido: false,
    icon: "calendar",
  },
  {
    id: 2,
    tipo: "realizado",
    titulo: "Consulta realizada",
    descricao: "Sua consulta com Dra. Maria foi finalizada. Deseja avaliar a sessão?",
    hora: "12:45",
    lido: false,
    icon: "checkmark-circle",
  },
  {
    id: 3,
    tipo: "reagendamento",
    titulo: "Solicitação de reagendamento",
    descricao: "Dr. Gustavo solicitou remarcar sua consulta para 16/05 às 15:30.",
    hora: "10:15",
    lido: false,
    icon: "reload",
  },
  {
    id: 4,
    tipo: "cancelado",
    titulo: "Pedido de consulta cancelada",
    descricao: "Sua consulta com Dr. Pedro foi cancelada. Gostaria de agendar outra?",
    hora: "09:00",
    lido: false,
    icon: "close-circle",
  },
  {
    id: 5,
    tipo: "confirmado",
    titulo: "Pedido de consulta confirmado",
    descricao: "Sua consulta com Dra. Ana foi confirmada para 20/05 às 10:00.",
    hora: "08:30",
    lido: true,
    icon: "calendar",
  },
  {
    id: 6,
    tipo: "realizado",
    titulo: "Consulta realizada",
    descricao: "Sua consulta com Dr. Carlos foi finalizada com sucesso.",
    hora: "12/05",
    lido: true,
    icon: "checkmark-circle",
  },
];

const ABAS = ["Todos", "Confirmado", "Cancelada", "Reagendamento", "Finalizada"];

export default function Notificacao() {
  const navigation = useNavigation();
  const [abaAtiva, setAbaAtiva] = useState("Todos");

  const notificacoesFiltradas = NOTIFICACOES.filter((notif) => {
    if (abaAtiva === "Todos") return true;
    if (abaAtiva === "Confirmado") return notif.tipo === "confirmado";
    if (abaAtiva === "Cancelada") return notif.tipo === "cancelado";
    if (abaAtiva === "Reagendamento") return notif.tipo === "reagendamento";
    if (abaAtiva === "Finalizada") return notif.tipo === "realizado";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate("menu")} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
        </Pressable>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Notificações</Text>
        </View>

        <View style={{ width: 40 }} />
      </View>

      {/* ABAS */}
      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {ABAS.map((aba) => (
            <Pressable
              key={aba}
              style={[
                styles.tab,
                abaAtiva === aba && styles.tabAtiva,
              ]}
              onPress={() => setAbaAtiva(aba)}
            >
              <Text
                style={[
                  styles.tabText,
                  abaAtiva === aba && styles.tabTextAtiva,
                ]}
              >
                {aba}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* LISTA DE NOTIFICAÇÕES */}
      <ScrollView
        style={styles.notificacoesList}
        showsVerticalScrollIndicator={false}
      >
        {notificacoesFiltradas.map((notif) => (
          <Pressable key={notif.id} style={styles.notificacaoCard}>
            {/* ÍCONE */}
            <View style={styles.iconContainer}>
              <Ionicons
                name={notif.icon}
                size={28}
                color="#8E7CFF"
              />
            </View>

            {/* CONTEÚDO */}
            <View style={styles.notificacaoContent}>
              <Text style={styles.notificacaoTitulo}>{notif.titulo}</Text>
              <Text style={styles.notificacaoDescricao}>
                {notif.descricao}
              </Text>
            </View>

            {/* HORA + INDICADOR LIDO */}
            <View style={styles.notificacaoRight}>
              <Text style={styles.notificacaoHora}>{notif.hora}</Text>
              {!notif.lido && <View style={styles.indicadorNaoLido} />}
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}