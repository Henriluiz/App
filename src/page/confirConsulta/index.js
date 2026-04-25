import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import NavBar from "../../components/NavBar";
import ModalApp from "../../components/modalApp";

import { useNavigation } from "@react-navigation/native";

export default function confirConsulta({ route }) {
    const navigation = useNavigation();

  const { psicologo, diaSelecionado, horaSelecionada, userPerfil } = route.params ?? {};
 
  const [agendando, setAgendando] = useState(false);

  const [modal, setModal] = useState(false);
 
  // TODO: Importar do AuthContext quando disponível
  // const { agendarSessaoCont } = useAuth();
 
  // ─── Dados estáticos para desenvolvimento ───────────────────────────────────
  // TODO: Remover os dados abaixo e usar os vindos de route.params
  const psicologoMock = psicologo ?? {
    nome: "Dra. Maria Silva",
    especialidade: "Psicóloga Clínica",
  };
 
  const dataMock = diaSelecionado ?? {
    diaSemanaCompleto: "Quarta-feira",
    dia: "10",
    mes: "abril",
  };
 
  const horaMock = horaSelecionada ?? "09:00";
 
  // TODO: Buscar valor real da consulta da API ou do perfil do psicólogo
  const valorConsulta = psicologo?.preco_sessao ?? 180;
  // ────────────────────────────────────────────────────────────────────────────
 
  const handleSolicitarAgendamento = async () => {
    setAgendando(true);
 
    try {
      // TODO: Descomentar e ajustar quando API estiver disponível
      // const payload = {
      //   id_psicologo: psicologo.id_psicologo,
      //   id_paciente: userPerfil.id_usuario,
      //   data_sessao: diaSelecionado.iso,
      //   hora_inicio: horaSelecionada,
      // };
      // await agendarSessaoCont(payload);
 
      // 🔧 Simulação de delay — remover quando API estiver pronta
      await new Promise((resolve) => setTimeout(resolve, 1200));
 
      navigation.navigate("minhaSessao"); // TODO: ajustar rota de sucesso
    } catch (error) {
      console.error("Erro ao agendar:", error);
      if (error.response?.status === 400) {
        alert("Esse horário já foi ocupado.");
      } else {
        alert("Erro ao agendar: " + error.message);
      }
    } finally {
      setAgendando(false);
    }
  };
 
  const dataFormatada = `${dataMock.diaSemanaCompleto?.split("-")[0] ?? dataMock.diaSemanaCompleto}, ${dataMock.dia} de ${
    dataMock.mes.charAt(0).toUpperCase() + dataMock.mes.slice(1)
  }`;
 
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >        
        {/* CARD RESUMO */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Resumo da Consulta</Text>
 
          {/* Psicólogo */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Psicólogo</Text>
            <Text style={styles.infoValor}>{userPerfil.nome}</Text>
            <Text style={styles.infoEspecialidade}>{psicologo.biografia}</Text>
          </View>
 
          {/* Data */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValor}>{dataFormatada}</Text>
          </View>
 
          {/* Horário */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValor}>{horaMock}</Text>
          </View>
 
          {/* Valor */}
          <View style={styles.valorRow}>
            <Text style={styles.valorLabel}>Valor da Consulta</Text>
            <Text style={styles.valorPreco}>R${valorConsulta}</Text>
          </View>
        </View>
      </ScrollView>
 
      {/* BOTÕES FIXOS NA BASE */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.botaoSolicitar, agendando && { opacity: 0.7 }]}
          onPress={() => {setModal(true)}}
          disabled={agendando}
        >
          {agendando ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.botaoSolicitarTexto}>Solicitar Agendamento</Text>
          )}
        </Pressable>
 
        <Pressable style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoVoltarTexto}>Voltar</Text>
        </Pressable>
      </View>

      <ModalApp
        visible={modal}
        titulo="Solicitar consulta?"
        mensagem="Tem certeza que deseja confirmar esta sessão?"
        tipo="aviso"
        duplo
        confirmarTexto="Solicitar"
        onConfirmar={handleSolicitarAgendamento}
        confirmarLoading={agendando}
        cancelarTexto="Voltar"
        onCancelar={() => setModal(false)}
        />
        

        {/* TODO: Fazer o modal de sucesso e continua a produção */}

      <NavBar tela="pesquisa" />
    </View>
  );
}