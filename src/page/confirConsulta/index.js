import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import NavBar from "../../components/NavBar";
import ModalApp from "../../components/modalApp";
import { useAuth } from "../../context/AuthContext";

import { useNavigation } from "@react-navigation/native";

export default function ConfirConsulta({ route }) {
  const navigation = useNavigation();

  const { 
  modo, id_sessao, psicologo, diaSelecionado, horaSelecionada, userPerfil, sessaoOriginal } = route.params ?? {};
  
  const { agendarSessaoCont, user, SolReagendarCons } = useAuth();

  const [agendando, setAgendando] = useState(false);
  const [text, setText] = useState("")

  const [modal, setModal] = useState(false);
  const [modalSucesso, setModalSucesso] = useState(false)
 
 
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
    console.log("👤 user completo:", JSON.stringify(user, null, 2));
    
    try {
      if (modo == "criar") {
        const payload = {
          id_paciente: user.id_paciente,
          id_psicologo: psicologo.id_psicologo,
          data_sessao: diaSelecionado.iso,
          hora_inicio: horaSelecionada+ ":00",
        };
        const retorno_agendamento = await agendarSessaoCont(payload);
        if (!retorno_agendamento.sucesso) {
          setAgendando(false)
          setModal(false)
          return false
        }
        setText("Solicitação Enviada")
      } else if (modo == "reagendar") {
        const payload = {
          nova_data: diaSelecionado.iso,
          nova_hora: horaSelecionada+ ":00",
        };
        await SolReagendarCons(sessaoOriginal.id_sessao, payload);
        setText("Reagendamento Enviado")
      }
      
      setModal(false)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setModalSucesso(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      setModalSucesso(false);
 
      navigation.replace("menu");
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
        

      <Modal
        visible={modalSucesso}
        transparent
        animationType="fade"
        onRequestClose={() => setModalSucesso(false)}
      >
        <View style={styles.successOverlay}>
          <View style={styles.successContainer}>

            {/* Ícone */}
            <View style={styles.successIconContainer}>
              <Ionicons
                name="checkmark-circle"
                size={300}
                color="#22C55E"
              />
            </View>

          </View>
        </View>
      </Modal>

      <NavBar tela="pesquisa" />
    </View>
  );
}