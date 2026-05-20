import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  Modal,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";
import NavBar from "../../components/NavBar";

import { useNavigation } from "@react-navigation/native";

export default function DataHoraConsulta({ route }) {
  const navigation = useNavigation();

  const { agendarSessaoCont, verHorariosDisponiveis } = useAuth();
  const { psicologo, userPerfil } = route.params ?? {};

  // Estados
  const [indexDiaSelecionado, setIndexDiaSelecionado] = useState(0);
  const [horaSelecionada, setHoraSelecionada] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [agendando, setAgendando] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false);

  // 📅 Gerar lista de 30 dias a partir de amanhã (filtra dias passados)
  const gerarDiasList = () => {
    const lista = [];
    const agora = new Date();
    const offset = agora.getTimezoneOffset() * 60000;
    const dataLocal = new Date(agora.getTime() - offset);
    
    // Começa a partir de amanhã (24 horas a partir de agora)
    dataLocal.setHours(0, 0, 0, 0);
    dataLocal.setDate(dataLocal.getDate() + 1);

    for (let i = 0; i < 30; i++) {
      const data = new Date(dataLocal);
      data.setDate(data.getDate() + i);

      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const dia = String(data.getDate()).padStart(2, "0");
      const diaSemana = data.getDay();

      const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
      const diasCompletos = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
      ];
      const meses = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ];

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
  const diaSelecionado = diasLista[indexDiaSelecionado];

  // 📅 Filtrar horários que ainda não passaram
  const filtrarHorariosValidos = (horariosRecebidos) => {
    if (!Array.isArray(horariosRecebidos) || horariosRecebidos.length === 0) {
      return [];
    }

    const agora = new Date();
    const offset = agora.getTimezoneOffset() * 60000;
    const dataLocal = new Date(agora.getTime() - offset);
    const horaAtual = dataLocal.getHours();
    const minutoAtual = dataLocal.getMinutes();
    const horaDiaAtualEmMinutos = horaAtual * 60 + minutoAtual;

    // Se for hoje, filtra horários que já passaram
    // Se for amanhã ou depois, mostra todos os horários
    if (diaSelecionado.iso === `${dataLocal.getFullYear()}-${String(dataLocal.getMonth() + 1).padStart(2, '0')}-${String(dataLocal.getDate()).padStart(2, '0')}`) {
      return horariosRecebidos.filter((hora) => {
        const [h, m] = hora.split(":").map(Number);
        const horaDaListaEmMinutos = h * 60 + m;
        return horaDaListaEmMinutos > horaDiaAtualEmMinutos + 60; // Pelo menos 1 hora a partir de agora
      });
    }

    // Para outros dias, mostra todos os horários
    return horariosRecebidos;
  };

  // 📅 Carregar horários quando dia é selecionado
  const handleSelectDia = async (index) => {
    setIndexDiaSelecionado(index);
    setHoraSelecionada(null);
    setLoading(true);

    try {
      const item = diasLista[index];
      const dados = await verHorariosDisponiveis(
        psicologo.id_psicologo,
        item.iso
      );
      const horariosValidos = filtrarHorariosValidos(dados || []);
      setHorarios(horariosValidos);
    } catch (error) {
      console.error("Erro ao carregar horários:", error);
      setHorarios([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Navegar para próximo dia
  const handleProximoDia = () => {
    if (indexDiaSelecionado < diasLista.length - 1) {
      handleSelectDia(indexDiaSelecionado + 1);
    }
  };

  // 🔄 Navegar para dia anterior
  const handleDiaAnterior = () => {
    if (indexDiaSelecionado > 0) {
      handleSelectDia(indexDiaSelecionado - 1);
    }
  };

  // ✅ Agendar sessão
  const handleConfirmarAgendamento = async () => {
    if (!diaSelecionado || !horaSelecionada) {
      alert("Selecione dia e horário");
      return;
    }

    navigation.navigate("confirConsulta", {
      modo: 'criar', psicologo, diaSelecionado, horaSelecionada, userPerfil
    })
  };

  // Carregar horários ao montar
  useEffect(() => {
    handleSelectDia(0);
  }, []);

  return (
    <View style={styles.containerAgenda}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollAgenda}
      >
        {/* CARD SELETOR DE DATA COM SETAS */}
        <View style={styles.cardAgenda}>
          <Text style={styles.tituloCard}>Selecione a Data</Text>

          <View style={styles.seletorDataContainer}>
            {/* Seta esquerda */}
            <Pressable
              style={[
                styles.setaBotao,
                indexDiaSelecionado === 0 && styles.setaBotaoDesabilitado,
              ]}
              onPress={handleDiaAnterior}
              disabled={indexDiaSelecionado === 0}
            >
              <Ionicons
                name="chevron-back"
                size={28}
                color={indexDiaSelecionado === 0 ? "#ccc" : "#8E7CFF"}
              />
            </Pressable>

            {/* Display da data */}
            <View style={styles.dataDisplayContainer}>
              <Text style={styles.dataDisplayDia}>{diaSelecionado.diaSemana}</Text>
              <Text style={styles.dataDisplayData}>{diaSelecionado.dia}</Text>
              <Text style={styles.dataDisplayMes}>{diaSelecionado.mes}</Text>
            </View>

            {/* Seta direita */}
            <Pressable
              style={[
                styles.setaBotao,
                indexDiaSelecionado === diasLista.length - 1 &&
                  styles.setaBotaoDesabilitado,
              ]}
              onPress={handleProximoDia}
              disabled={indexDiaSelecionado === diasLista.length - 1}
            >
              <Ionicons
                name="chevron-forward"
                size={28}
                color={
                  indexDiaSelecionado === diasLista.length - 1 ? "#ccc" : "#8E7CFF"
                }
              />
            </Pressable>
          </View>

          {/* Exibição da data completa */}
          <View style={styles.dataExibicao}>
            <Text style={styles.dataExibicaoTexto}>
              {diaSelecionado.diaSemanaCompleto}
            </Text>
            <Text style={styles.dataExibicaoData}>
              {diaSelecionado.dia} de {diaSelecionado.mes}
            </Text>
          </View>
        </View>

        {/* CARD HORÁRIOS DISPONÍVEIS */}
        <View style={styles.cardAgenda}>
          <Text style={styles.tituloCard}>Horários Disponíveis</Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#8E7CFF" />
            </View>
          ) : horarios.length > 0 ? ( 
            <View style={styles.horariosGrid}>
              {horarios.map((hora, index) => (
                <Pressable
                  key={index}
                  style={[
                    styles.horaButton,
                    horaSelecionada === hora && styles.horaButtonSelected,
                  ]}
                  onPress={() => setHoraSelecionada(hora)}
                >
                  <Text
                    style={[
                      styles.horaTexto,
                      horaSelecionada === hora && styles.horaTextoSelected,
                    ]}
                  >
                    {hora}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : (
            <View style={styles.vazioContainer}>
              <Ionicons name="calendar-outline" size={48} color="#ccc" />
              <Text style={styles.vazioTexto}>
                Nenhum horário disponível para este dia
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* BOTÃO CONFIRMAR FIXO NA BASE - SEMPRE VISÍVEL QUANDO HORÁRIO SELECIONADO */}
      {horaSelecionada && (
        <View style={styles.footerAgenda}>
          <Pressable
            style={[styles.botaoConfirmar, agendando && { opacity: 0.6 }]}
            onPress={() => handleConfirmarAgendamento()}
            disabled={agendando}
          >
            {agendando ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.botaoConfirmarTexto}>Confirmar Horário</Text>
            )}
          </Pressable>
        </View>
      )}

      <NavBar tela="pesquisa" />
    </View>
  );
}