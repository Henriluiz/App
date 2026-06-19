import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from "react-native";


import styles from "./styles";
import { useAuth } from "../../context/AuthContext";

/* =========================
   CONSTANTES
========================== */

const STATUS_TYPES = {
  REALIZADA: "Realizada",
  CANCELADA: "Cancelada",
};

/* =========================
   SUB-COMPONENTES
========================== */

function StatusBadge({ status }) {
  const isRealizada = status === STATUS_TYPES.REALIZADA;
  return (
    <View style={[styles.badge, isRealizada ? styles.badgeRealizada : styles.badgeCancelada]}>
      <Text
        style={[
          styles.badgeText,
          isRealizada ? styles.badgeTextRealizada : styles.badgeTextCancelada,
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

function HistoricoCard({ item }) {
  /*
    Estrutura real da API:
      item.psicologo.usuario.nome  — nome do profissional
      item.data_sessao             — "2026-05-08"
      item.hora_inicio             — "12:00:00"
      item.status                  — "Realizada" | "Cancelada"  (injetado no merge)
  */

  const nomePsicologo = item.psicologo?.usuario?.nome ?? "Profissional";

  const dataFormatada = item.data_sessao
    ? new Date(item.data_sessao + "T00:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
      })
    : "";

  // hora_inicio vem como "12:00:00" — exibe só "12:00"
  const horaFormatada = item.hora_inicio?.slice(0, 5) ?? "";

  return (
    <View style={styles.historicoCard}>
      <View style={styles.historicoCardContent}>
        <View style={styles.historicoInfo}>
          <Text style={styles.historicoDoctorName}>{nomePsicologo}</Text>
          <View style={styles.historicoDateRow}>
            <Text style={styles.clockIcon}>🕐</Text>
            <Text style={styles.historicoDate}>
              {dataFormatada} • {horaFormatada}
            </Text>
          </View>
        </View>
        <StatusBadge status={item.status} />
      </View>
    </View>
  );
}

/* =========================
   TELA PRINCIPAL
========================== */

export default function Historico({ navigation }) {
  const { historico } = useAuth();

  const [listaHistorico, setListaHistorico] = useState([]);
  const [loadingHistorico, setLoadingHistorico] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState("");

  /* =========================
     BUSCA DE DADOS
  ========================== */

  const buscarHistorico = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setAtualizando(true);
      } else {
        setLoadingHistorico(true);
      }

      setErro("");

      const resposta = await historico();
      const realizadas = (resposta?.realizadas ?? []).map((item) => ({
        ...item,
        status: STATUS_TYPES.REALIZADA,
      }));
      const cancelamentos = (resposta?.cancelamentos ?? []).map((item) => ({
        ...item,
        status: STATUS_TYPES.CANCELADA,
      }));

      const todas = [...realizadas, ...cancelamentos].sort((a, b) => {
        if (b.data_sessao !== a.data_sessao)
          return b.data_sessao.localeCompare(a.data_sessao);
        return b.hora_inicio.localeCompare(a.hora_inicio);
      });

      setListaHistorico(todas);
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      setErro("Não foi possível carregar o histórico. Tente novamente.");
    } finally {
      setLoadingHistorico(false);
      setAtualizando(false);
    }
  };

  useEffect(() => {
    buscarHistorico();
  }, []);

  /* =========================
     RENDER — LOADING
  ========================== */

  if (loadingHistorico) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centroTela}>
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.textoCarregando}>Carregando histórico...</Text>
        </View>
      </SafeAreaView>
    );
  }

  /* =========================
     RENDER — ERRO
  ========================== */

  if (erro) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centroTela}>
          <Text style={styles.textoErro}>{erro}</Text>
          <Pressable
            style={styles.btnTentarNovamente}
            onPress={() => buscarHistorico()}
          >
            <Text style={styles.btnTentarNovamenteTexto}>Tentar novamente</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  /* =========================
     RENDER PRINCIPAL
  ========================== */

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={() => buscarHistorico(true)}
            tintColor="#FFFFFF"
          />
        }
      >
        {/* HISTÓRICO */}
        <Text style={styles.sectionTitle}>Histórico</Text>

        {listaHistorico.length > 0 ? (
          listaHistorico.map((item, index) => (
            <HistoricoCard
              key={item.id_sessao ?? `${item.data_sessao}-${item.hora_inicio}-${index}`}
              item={item}
            />
          ))
        ) : (
          <View style={styles.semConsultaCard}>
            <Text style={styles.semConsultaTexto}>
              Nenhuma consulta no histórico.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}