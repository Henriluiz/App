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

export default function MinhasSessoes({ route }) {
  const navigation = useNavigation();
  const { mSessoes } = useAuth();

  const [todasSessoes, setTodasSessoes] = useState([]);
  const [sessoes, setSessoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
  const slideAnim = useRef(new Animated.Value(400)).current;

  const gerarDiasList = () => {
    const lista = [];
    const agora = new Date();
    const offset = agora.getTimezoneOffset() * 60000;
    const dataLocal = new Date(agora.getTime() - offset);
    dataLocal.setHours(0, 0, 0, 0);
    dataLocal.setDate(dataLocal.getDate() - 15);

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

  useEffect(() => {
    const buscarSessoes = async () => {
      setLoading(true);
      try {
        const resposta = await mSessoes();
        const lista = resposta?.sessoes ?? [];
        setTodasSessoes(lista);
        filtrarPorDia(lista, HOJE_INDEX);
      } catch (error) {
        console.error("Erro ao buscar sessões:", error);
        setTodasSessoes([]);
        setSessoes([]);
      } finally {
        setLoading(false);
      }
    };
    buscarSessoes();
  }, []);

  const filtrarPorDia = (lista, index) => {
    const isoAlvo = diasLista[index].iso;
    setSessoes(lista.filter((s) => s.data_sessao === isoAlvo));
  };

  const carregarSessoesDoDia = (index) => {
    setIndexAtual(index);
    filtrarPorDia(todasSessoes, index);
  };

  const handleProximoDia = () => {
    if (indexAtual < diasLista.length - 1) carregarSessoesDoDia(indexAtual + 1);
  };

  const handleDiaAnterior = () => {
    if (indexAtual > 0) carregarSessoesDoDia(indexAtual - 1);
  };

  const abrirModal = (sessao) => {
    setSessaoSelecionada(sessao);
    setModalVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      bounciness: 4,
    }).start();
  };

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


  const formatarHora = (hora) => {
    if (!hora) return "";
    return hora.slice(0, 5);
  };

  const getNomePsicologo = (sessao) =>
    sessao?.psicologo?.usuario?.nome ?? sessao?.psicologo_nome ?? "Profissional";

  const handlecancelar = () => {
    fecharModal();
    navigation.navigate("cancelamento", {
      sessao: sessaoSelecionada,
      psicologo: { nome: getNomePsicologo(sessaoSelecionada) }  // ← adiciona isso
    });
  }
    

  const getStatusConfig = (status) => {
    switch (status) {
      case "agendada":
        return { label: "Agendada", cor: "#8E7CFF", corFundo: "#EAE0FF", borderCor: "#8E7CFF" };
      case "realizada":
        return { label: "Realizada", cor: "#4CAF50", corFundo: "#E8F5E9", borderCor: "#4CAF50" };
      case "cancelada":
        return { label: "Cancelada", cor: "#F44336", corFundo: "#FFEBEE", borderCor: "#F44336" };
      case "pendente":
        return { label: "Pendente", cor: "#FF9800", corFundo: "#FFF3E0", borderCor: "#FF9800" };
      case "bloqueado":
        return { label: "Cancelada", cor: "#F44336", corFundo: "#F5F5F5", borderCor: "#9E9E9E" };
      case "cancelamento_solicitado":
        return { label: "Cancelamento Solicitado", cor: "#E53935", corFundo: "#FFEBEE", borderCor: "#E53935" };
      case "reagendamento_solicitado":
        return { label: "Reagendamento Solicitado", cor: "#1E88E5", corFundo: "#E3F2FD", borderCor: "#1E88E5" };
      case "recusada":
        return { label: "Recusada", cor: "#B71C1C", corFundo: "#FFCDD2", borderCor: "#B71C1C" };
      default:
        return { label: status ?? "Agendada", cor: "#8E7CFF", corFundo: "#EAE0FF", borderCor: "#8E7CFF" };
    }
  };

  

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
                const config = getStatusConfig(sessao.status_sessao);
                return (
                  <Pressable
                    key={sessao.id_sessao ?? sessao.id}
                    style={[
                      styles.sessaoCard,
                      { backgroundColor: config.corFundo, borderLeftColor: config.borderCor },
                    ]}
                    onPress={() => abrirModal(sessao)} // ← qualquer card abre o modal
                    android_ripple={{ color: "rgba(142,124,255,0.1)" }}
                  >
                    <Text style={[styles.sessaoStatus, { color: config.cor }]}>
                      {config.label} {(config.label === "Cancelada" || config.label === "Recusada") && (
                        sessao.observacoes ? (
                          <Text>
                            - Motivo: {sessao.observacoes}
                          </Text>
                        ) : (
                          <Text>
                            por mim
                          </Text>
                        )
                      )}
                    </Text>
                    <Text style={styles.sessaoNome}>{getNomePsicologo(sessao)}</Text>
                    <View style={styles.sessaoHorarioRow}>
                      <Ionicons name="time-outline" size={16} color="#666" />
                      {/* ✂️ hora formatada */}
                      <Text style={styles.sessaoHorario}>Horário: {formatarHora(sessao.hora_inicio)}</Text>
                    </View>
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

      {/* MODAL BOTTOM SHEET */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={fecharModal}
      >
        <Pressable style={styles.modalOverlay} onPress={fecharModal} />

        <Animated.View
          style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}
        >
          <View style={styles.bottomSheetHandle} />

          {sessaoSelecionada && (() => {
            const config = getStatusConfig(sessaoSelecionada.status);
            return (
              <View style={styles.bottomSheetSessaoInfo}>
                <Text style={[styles.sessaoStatus, { color: config.cor, marginBottom: 4 }]}>
                  {config.label}
                </Text>
                <Text style={styles.bottomSheetNome}>
                  {getNomePsicologo(sessaoSelecionada)}
                </Text>
                <View style={styles.sessaoHorarioRow}>
                  <Ionicons name="time-outline" size={16} color="#666" />
                  {/* ✂️ hora formatada no modal também */}
                  <Text style={styles.sessaoHorario}>
                    Horário: {formatarHora(sessaoSelecionada.hora_inicio)}
                  </Text>
                </View>
              </View>
            );
          })()}

          <View style={styles.bottomSheetDivisor} />

          <View style={styles.bottomSheetBotoes}>
            {sessaoSelecionada?.status_sessao === "agendada" && (
              <Pressable
                style={styles.botaoReagendar}
                onPress={() => {
                  if (!sessaoSelecionada) return;
                  fecharModal();
                  navigation.navigate("reagendarConsulta", {
                    psicologo: {
                      id_psicologo: sessaoSelecionada.id_psicologo,
                      nome: getNomePsicologo(sessaoSelecionada),
                    },
                    userPerfil: route?.params?.userPerfil,
                    sessao: sessaoSelecionada,
                  });
                }}
              >
                <Text style={styles.botaoReagendarTexto}>Reagendar</Text>
              </Pressable>
            )}
            {sessaoSelecionada?.status_sessao === "agendada" && (
              <Pressable
                style={styles.botaoCancelarConsulta}
                onPress={() => 
                  handlecancelar()}
              >
                <Text style={styles.botaoCancelarConsultaTexto}>Cancelar Consulta</Text>
              </Pressable>
            )}

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