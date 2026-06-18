import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styles from "./styles";
import { useAuth } from "../../context/AuthContext";

// Formata ISO string em data/hora legível
function formatarData(isoString) {
  if (!isoString) return "";
  const data = new Date(isoString);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  const mesmodia = (a, b) =>
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear();

  const hora = data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (mesmodia(data, hoje)) return hora;
  if (mesmodia(data, ontem)) return "Ontem";

  return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

// Detecta ícone e tipo pelo título/body da notificação
function detectarTipo(title = "", body = "") {
  const texto = (title + " " + body).toLowerCase();

  if (texto.includes("aprovad")) {
    return {
      tipo: "aprovacao",
      icon: "checkmark-circle",
    };
  }

  if (texto.includes("solicitad")) {
    return {
      tipo: "solicitacao",
      icon: "time",
    };
  }

  if (texto.includes("recus")) {
    return {
      tipo: "recusada",
      icon: "close-circle",
    };
  }

  return {
    tipo: "outro",
    icon: "notifications",
  };
}

const ABAS = [
  "Todos",
  "Aprovações",
  "Solicitações",
  "Recusadas",
];

export default function Notificacao() {
  const navigation = useNavigation();
  const [abaAtiva, setAbaAtiva] = useState("Todos");
  const [notificacoes, setNotificacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState(null);

  const { centralNotificacao } = useAuth();

  const buscarNotificacoes = useCallback(async (isRefresh = false) => {
    if (isRefresh) setAtualizando(true);
    else setCarregando(true);
    setErro(null);

    try {
      const response = await centralNotificacao();

      const mapeadas = response.map((n) => ({
        id: n.id,
        titulo: n.title,
        descricao: n.body,
        hora: formatarData(n.sent_at),
        lido: true, // sem campo lido no backend ainda; adapte se implementar
        ...detectarTipo(n.title, n.body),
      }));

      setNotificacoes(mapeadas);
    } catch (e) {
      setErro("Não foi possível carregar as notificações.");
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  useEffect(() => {
    buscarNotificacoes();
  }, [buscarNotificacoes]);

  const notificacoesFiltradas = notificacoes.filter((notif) => {
    switch (abaAtiva) {
      case "Aprovações":
        return notif.tipo === "aprovacao";

      case "Solicitações":
        return notif.tipo === "solicitacao";

      case "Recusadas":
        return notif.tipo === "recusada";

      default:
        return true;
    }
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
              style={[styles.tab, abaAtiva === aba && styles.tabAtiva]}
              onPress={() => setAbaAtiva(aba)}
            >
              <Text
                style={[styles.tabText, abaAtiva === aba && styles.tabTextAtiva]}
              >
                {aba}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* ESTADOS: carregando / erro / vazio / lista */}
      {carregando ? (
        <View style={styles.centroFeedback}>
          <ActivityIndicator size="large" color="#8E7CFF" />
        </View>
      ) : erro ? (
        <View style={styles.centroFeedback}>
          <Ionicons name="cloud-offline-outline" size={48} color="#8E7CFF" />
          <Text style={styles.feedbackTexto}>{erro}</Text>
          <Pressable style={styles.tentarNovamente} onPress={() => buscarNotificacoes()}>
            <Text style={styles.tentarNovamenteTexto}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : (
        <ScrollView
          style={styles.notificacoesList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={() => buscarNotificacoes(true)}
              tintColor="#8E7CFF"
            />
          }
        >
          {notificacoesFiltradas.length === 0 ? (
            <View style={styles.centroFeedback}>
              <Ionicons name="notifications-off-outline" size={48} color="#8E7CFF" />
              <Text style={styles.feedbackTexto}>Nenhuma notificação aqui.</Text>
            </View>
          ) : (
            notificacoesFiltradas.map((notif) => (
              <Pressable key={notif.id} style={styles.notificacaoCard}>
                {/* ÍCONE */}
                <View style={styles.iconContainer}>
                  <Ionicons name={notif.icon} size={28} color="#8E7CFF" />
                </View>

                {/* CONTEÚDO */}
                <View style={styles.notificacaoContent}>
                  <Text style={styles.notificacaoTitulo}>{notif.titulo}</Text>
                  <Text style={styles.notificacaoDescricao}>{notif.descricao}</Text>
                </View>

                {/* HORA + INDICADOR LIDO */}
                <View style={styles.notificacaoRight}>
                  <Text style={styles.notificacaoHora}>{notif.hora}</Text>
                  {!notif.lido && <View style={styles.indicadorNaoLido} />}
                </View>
              </Pressable>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}