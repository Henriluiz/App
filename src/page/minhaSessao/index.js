import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";
import NavBar from "../../components/NavBar";

import { useNavigation } from "@react-navigation/native";

// 📋 Dados estáticos de sessões para desenvolvimento
// TODO: Remover SESSOES_ESTATICAS e utilizar a resposta da API no lugar
const SESSOES_ESTATICAS = [
  {
    id: "1",
    psicologo_nome: "Dr. Carlos Mendes",
    data_sessao: "2025-04-29",
    hora_inicio: "09:00",
    status: "agendada",
  },
  {
    id: "2",
    psicologo_nome: "Dra. Ana Lima",
    data_sessao: "2025-05-01",
    hora_inicio: "14:30",
    status: "agendada",
  },
  {
    id: "3",
    psicologo_nome: "Dr. Carlos Mendes",
    data_sessao: "2025-03-28",
    hora_inicio: "10:00",
    status: "concluida",
  },
];

export default function MinhasSessoes({ route }) {
  // TODO: Descomentar e usar quando a API estiver disponível
  const navigation = useNavigation();
  
  // const { listarSessoes } = useAuth();
  // const { userPerfil } = route.params ?? {};

  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal bottom sheet
  const [modalVisible, setModalVisible] = useState(false);
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const slideAnim = useRef(new Animated.Value(400)).current;

  // 📅 Gerar lista de 30 dias centrada no dia de hoje
  const gerarDiasList = () => {
    const lista = [];
    const agora = new Date();
    const offset = agora.getTimezoneOffset() * 60000;
    const dataLocal = new Date(agora.getTime() - offset);
    dataLocal.setHours(0, 0, 0, 0);
    dataLocal.setDate(dataLocal.getDate() - 15); // começa 15 dias atrás

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
    const diasCompletos = [
      "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
      "Quinta-feira", "Sexta-feira", "Sábado",
    ];
    const meses = [
      "janeiro", "fevereiro", "março", "abril", "maio", "junho",
      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
    ];

    for (let i = 0; i < 30; i++) {
      const data = new Date(dataLocal);
      data.setDate(data.getDate() + i);

      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const dia = String(data.getDate()).padStart(2, "0");
      const diaSemana = data.getDay();

      lista.push({
        id: i,
        iso: `${ano}-${mes}-${dia}`,
        dia,
        mes: meses[data.getMonth()],
        diaSemana: diasSemana[diaSemana],
        diaSemanaCompleto: diasCompletos[diaSemana],
        dataObj: data,
      });
    }

    return lista;
  };

  const diasLista = gerarDiasList();
  const HOJE_INDEX = 15;
  const [indexAtual, setIndexAtual] = useState(HOJE_INDEX);
  const diaSelecionado = diasLista[indexAtual];

  // 📋 Carregar sessões do dia
  const carregarSessoesDoDia = async (index) => {
    setIndexAtual(index);
    setLoading(true);

    try {
      const item = diasLista[index];

      // TODO: Substituir pelo bloco abaixo quando a API estiver pronta:
      // const dados = await listarSessoes(userPerfil.id_usuario, item.iso);
      // setSessoes(dados || []);

      // 🔧 Simulação com dados estáticos — remover quando API estiver pronta
      await new Promise((resolve) => setTimeout(resolve, 300));
      const sessoesDoDia = SESSOES_ESTATICAS.filter(
        (s) => s.data_sessao === item.iso
      );
      setSessoes(sessoesDoDia);
      // 🔧 Fim do bloco de simulação

    } catch (error) {
      console.error("Erro ao carregar sessões:", error);
      setSessoes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProximoDia = () => {
    if (indexAtual < diasLista.length - 1) carregarSessoesDoDia(indexAtual + 1);
  };

  const handleDiaAnterior = () => {
    if (indexAtual > 0) carregarSessoesDoDia(indexAtual - 1);
  };

  // 🔽 Abrir modal bottom sheet com animação
  const abrirModal = (sessao) => {
    setSessaoSelecionada(sessao);
    setModalVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

  // 🔼 Fechar modal com animação
  const fecharModal = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSessaoSelecionada(null);
    });
  };

  // 📅 Reagendar — navega para tela de agendamento
  const handleReagendar = () => {
    fecharModal();
    // TODO: Passar os dados corretos do psicólogo se necessário
    navigation.navigate("DataHoraConsulta", {
      psicologo: { id_psicologo: sessaoSelecionada?.id_psicologo },
      sessaoOrigem: sessaoSelecionada,
    });
  };

  // ❌ Cancelar consulta — navega para tela de confirmação
  const handleCancelarConsulta = () => {
    fecharModal();
    // TODO: Ajustar o nome da rota conforme o Navigator do projeto
    navigation.navigate("CancelarSessao", {
      sessao: sessaoSelecionada,
    });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "agendada":
        return { label: "Consulta Agendada", cor: "#8E7CFF", corFundo: "#EAE0FF", borderCor: "#8E7CFF" };
      case "concluida":
        return { label: "Concluída", cor: "#4CAF50", corFundo: "#E8F5E9", borderCor: "#4CAF50" };
      case "cancelada":
        return { label: "Cancelada", cor: "#F44336", corFundo: "#FFEBEE", borderCor: "#F44336" };
      default:
        return { label: "Agendada", cor: "#8E7CFF", corFundo: "#EAE0FF", borderCor: "#8E7CFF" };
    }
  };

  useEffect(() => {
  carregarSessoesDoDia(HOJE_INDEX);

  setTimeout(() => {
    abrirModal(SESSOES_ESTATICAS[0]);
  }, 500);
}, []);

  const isHoje = indexAtual === HOJE_INDEX;
  
  return (
    <View style={styles.containerAgenda}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollAgenda}
      >
        {/* CARD SELETOR DE DATA */}
        <View style={styles.cardAgenda}>
          <Text style={styles.tituloCard}>Selecione a Data</Text>

          <View style={styles.seletorDataContainer}>
            <Pressable
              style={[styles.setaBotao, indexAtual === 0 && styles.setaBotaoDesabilitado]}
              onPress={handleDiaAnterior}
              disabled={indexAtual === 0}
            >
              <Ionicons name="chevron-back" size={28} color={indexAtual === 0 ? "#ccc" : "#8E7CFF"} />
            </Pressable>

            <View style={styles.dataDisplayContainer}>
              <Text style={styles.dataDisplayDia}>{diaSelecionado.diaSemana}</Text>
              <Text style={styles.dataDisplayData}>{diaSelecionado.dia}</Text>
              <Text style={styles.dataDisplayMes}>{diaSelecionado.mes}</Text>
            </View>

            <Pressable
              style={[styles.setaBotao, indexAtual === diasLista.length - 1 && styles.setaBotaoDesabilitado]}
              onPress={handleProximoDia}
              disabled={indexAtual === diasLista.length - 1}
            >
              <Ionicons name="chevron-forward" size={28} color={indexAtual === diasLista.length - 1 ? "#ccc" : "#8E7CFF"} />
            </Pressable>
          </View>

          <View style={styles.dataExibicao}>
            <Text style={styles.dataExibicaoTexto}>
              {isHoje ? "Hoje — " : ""}{diaSelecionado.diaSemanaCompleto}
            </Text>
            <Text style={styles.dataExibicaoData}>
              {diaSelecionado.dia} de {diaSelecionado.mes}
            </Text>
          </View>
        </View>

        {/* CARD SESSÕES DO DIA */}
        <View style={styles.cardAgenda}>
          <Text style={styles.tituloCard}>Sessões do Dia</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#8E7CFF" />
            </View>
          ) : sessoes.length > 0 ? (
            <View style={styles.sessoesLista}>
              {sessoes.map((sessao) => {
                const config = getStatusConfig(sessao.status);
                return (
                  <Pressable
                    key={sessao.id}
                    style={[
                      styles.sessaoCard,
                      { backgroundColor: config.corFundo, borderLeftColor: config.borderCor },
                    ]}
                    onPress={() => sessao.status === "agendada" ? abrirModal(sessao) : null}
                    android_ripple={{ color: "rgba(142,124,255,0.1)" }}
                  >
                    <Text style={[styles.sessaoStatus, { color: config.cor }]}>
                      {config.label}
                    </Text>
                    <Text style={styles.sessaoNome}>{sessao.psicologo_nome}</Text>
                    <View style={styles.sessaoHorarioRow}>
                      <Ionicons name="time-outline" size={16} color="#666" />
                      <Text style={styles.sessaoHorario}>Horário: {sessao.hora_inicio}</Text>
                    </View>
                    {sessao.status === "agendada" && (
                      <Text style={styles.sessaoToque}>Toque para gerenciar →</Text>
                    )}
                  </Pressable>
                );
              })}
            </View>
          ) : (
            <View style={styles.vazioContainer}>
              <Ionicons name="calendar-outline" size={48} color="#ccc" />
              <Text style={styles.vazioTexto}>Nenhuma sessão para este dia</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ──────────────── MODAL BOTTOM SHEET ──────────────── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={fecharModal}
      >
        {/* Overlay — toque fora fecha */}
        <Pressable style={styles.modalOverlay} onPress={fecharModal} />

        {/* Painel deslizante de baixo */}
        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}
        >
          {/* Handle de arraste */}
          <View style={styles.bottomSheetHandle} />

          {/* Informações da sessão selecionada */}
          {sessaoSelecionada && (() => {
            const config = getStatusConfig(sessaoSelecionada.status);
            return (
              <View style={styles.bottomSheetSessaoInfo}>
                <Text style={[styles.sessaoStatus, { color: config.cor, marginBottom: 4 }]}>
                  {config.label}
                </Text>
                <Text style={styles.bottomSheetNome}>
                  {sessaoSelecionada.psicologo_nome}
                </Text>
                <View style={styles.sessaoHorarioRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  <Text style={styles.sessaoHorario}>
                    Horário: {sessaoSelecionada.hora_inicio}
                  </Text>
                </View>
              </View>
            );
          })()}

          <View style={styles.bottomSheetDivisor} />

          {/* Botões de ação */}
          <View style={styles.bottomSheetBotoes}>
          <Pressable
            style={styles.botaoReagendar}
            onPress={() => {
              if (!sessaoSelecionada) {
                alert("Selecione uma sessão");
                return;
              }

              fecharModal();

              navigation.navigate("reagendarConsulta", {
                psicologo: {
                  id_psicologo: sessaoSelecionada.id_psicologo,
                  nome: sessaoSelecionada.psicologo_nome,
                },
                userPerfil: route?.params?.userPerfil,
                sessao: sessaoSelecionada,
              });
            }}
          >
            <Text style={styles.botaoReagendarTexto}>
              Reagendar
            </Text>
          </Pressable>

            <Pressable
              style={styles.botaoCancelarConsulta}
              onPress={() =>
                navigation.navigate("cancelamento", {
                  sessao: sessaoSelecionada
                })
              }
            >
              <Text style={styles.botaoCancelarConsultaTexto}>
                Cancelar Consulta
              </Text>
            </Pressable>

            <Pressable style={styles.botaoVoltarSheet} onPress={fecharModal}>
              <Text style={styles.botaoVoltarSheetTexto}>Voltar</Text>
            </Pressable>
          </View>
        </Animated.View>
      </Modal>

      <NavBar tela="sessoes" />
    </View>
  );
}