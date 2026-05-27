import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import NavBar from "../../components/NavBar";
import styles from "./styles";

export default function Menu({ navigation }) {
  const { user, mSessoes, historico } = useAuth();
  const [ultimoPsicologo, setUltimoPsicologo] = useState(null);
  const [ultimoUserPerfil, setUltimoUserPerfil] = useState(null);

  const capitalize = (str) => {
    if (!str || typeof str !== "string") return "";
    const trimmedStr = str.trim();
    if (trimmedStr.length === 0) return "";
    return trimmedStr
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  useEffect(() => {
    const carregarUltimoPsicologo = async () => {
      try {
        const [sessoesResp, historicoResp] = await Promise.all([mSessoes(), historico()]);
        const sessoes = sessoesResp?.sessoes ?? [];
        const realizadas = historicoResp?.realizadas ?? [];
        const cancelamentos = historicoResp?.cancelamentos ?? [];

        const todasSessoes = [...sessoes, ...realizadas, ...cancelamentos]
          .filter((item) => item?.psicologo)
          .sort((a, b) => {
            const dataA = a.data_sessao ?? "";
            const dataB = b.data_sessao ?? "";
            if (dataA !== dataB) return dataB.localeCompare(dataA);
            const horaA = a.hora_inicio ?? "";
            const horaB = b.hora_inicio ?? "";
            return horaB.localeCompare(horaA);
          });

        const ultima = todasSessoes[0] ?? null;
        if (ultima) {
          const psicologo = ultima.psicologo;
          setUltimoPsicologo(psicologo);
          setUltimoUserPerfil(psicologo?.usuario ?? {
            nome: psicologo?.nome ?? "Psicólogo",
          });
        }
      } catch (err) {
        console.error("Erro ao buscar último psicólogo:", err);
      }
    };

    carregarUltimoPsicologo();
  }, []);

  const handleAgendarUltimo = () => {
    if (ultimoPsicologo) {
      navigation.navigate("dataHoraConsulta", {
        psicologo: ultimoPsicologo,
        userPerfil: ultimoUserPerfil,
      });
    } else {
      navigation.navigate("pesquisa");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topSection}>
          <View style={styles.headerRow}>
            <View style={styles.profileSummary}>
              <Pressable
                style={styles.avatarWrapper}
                onPress={() => navigation.navigate("editarPerfil")}
              >
                {user?.foto_perfil ? (
                  <Image
                    source={{ uri: user.foto_perfil }}
                    style={styles.avatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="person" size={26} color="#6A37E5" />
                )}
              </Pressable>
              <View style={styles.profileText}>
                <Text style={styles.welcomeText}>Bem-vindo(a)</Text>
                <Pressable onPress={() => navigation.navigate("editarPerfil")}> 
                  <Text style={styles.userName}>{capitalize(user?.nome)}</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.topIcons}>
              <Ionicons name="information-circle-outline" size={22} color="#fff" />
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#fff"
                style={{ marginLeft: 14 }}
              />
            </View>
          </View>

          <Text style={styles.subtitle}>Como você está se sentindo hoje?</Text>
          <Pressable
            style={styles.searchContainer}
            onPress={() => navigation.navigate("pesquisa")}
          >
            <Ionicons name="search" size={20} color="#ffffff" />
            <Text style={styles.searchLabel}>Buscar psicólogo</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ações rápidas</Text>
        </View>

        <View style={styles.quickActions}>
          <Pressable
            style={styles.actionCard}
            onPress={handleAgendarUltimo}
          >
            <View style={styles.actionIcon}>
              <Feather name="edit" size={22} color="#6A37E5" />
            </View>
            <Text style={styles.actionTitle}>Agendar</Text>
            <Text style={styles.actionSubtitle}>
              {ultimoPsicologo
                ? `Último: ${ultimoPsicologo.usuario?.nome ?? ultimoPsicologo.nome}`
                : "Nova consulta"}
            </Text>
          </Pressable>

          <Pressable
            style={styles.actionCard}
            onPress={() => navigation.navigate("minhasSessoes")}
          >
            <View style={styles.actionIcon}>
              <Feather name="clock" size={22} color="#6A37E5" />
            </View>
            <Text style={styles.actionTitle}>Sessões</Text>
            <Text style={styles.actionSubtitle}>Ver histórico</Text>
          </Pressable>
        </View>

        <View style={styles.promoCard}>
          <View style={styles.promoText}>
            <Text style={styles.promoTitle}>Cuide da sua saúde mental com praticidade</Text>
            <Text style={styles.promoDescription}>
              Encontre o psicólogo ideal e agende sua sessão online.
            </Text>
            <Pressable
              style={styles.promoButton}
              onPress={() => navigation.navigate("pesquisa")}
            >
              <Text style={styles.promoButtonText}>Buscar psicólogo</Text>
            </Pressable>
          </View>

          <View style={styles.promoIllustration}>
            <Ionicons name="heart-circle-outline" size={56} color="#fff" />
          </View>
        </View>

        <View style={styles.sessionCard}>
          <View style={styles.sessionInfo}>
            <Text style={styles.sessionDate}>Quinta-feira, 23 de maio</Text>
            <Text style={styles.sessionTime}>14:00</Text>
          </View>
          <Pressable
            style={styles.sessionButton}
            onPress={() => navigation.navigate("minhaSessao")}
          >
            <Text style={styles.sessionButtonText}>Entrar na sessão</Text>
          </Pressable>
        </View>
      </ScrollView>

      <NavBar tela="home" />
    </SafeAreaView>
  );
}
