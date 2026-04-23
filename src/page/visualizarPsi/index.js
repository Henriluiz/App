import React, { useEffect, useState } from "react";
import {
  Text, View, ScrollView, KeyboardAvoidingView,
  Platform, Pressable, Modal, ActivityIndicator
} from "react-native";

import { useAuth } from "../../context/AuthContext"
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import NavBar from "../../components/NavBar";
import * as Animatable from 'react-native-animatable';

export default function VisualizarPsi({ navigation, route }) {

  const { user } = useAuth();

  const { id } = route.params ?? {};

  const [menuAberto, setMenuAberto] = useState(false);
  const [userPerfil, setUserPerfil] = useState(null)
  const [psicologo, setPsicologo] = useState(null)
  const [loading, setLoading] = useState(true);

  // 🔹 ESTADOS PARA AGENDAMENTO
  const [modalAgendar, setModalAgendar] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [agendando, setAgendando] = useState(false);

  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  const { verPsicologo, verHorariosDisponiveis, agendarSessaoCont } = useAuth();

  // 📅 GERAR DATA EM FORMATO ISO CORRETO COM FUSO HORÁRIO DO BRASIL
  const gerarDataPorDia = (dia) => {
    // 🌎 Considerar fuso horário de São Paulo (UTC-3)
    const agora = new Date();
    
    // Ajustar para horário local do Brasil
    const offset = agora.getTimezoneOffset() * 60000;
    const dataLocal = new Date(agora.getTime() - offset);
    
    const mapa = {
      Dom: 0,
      Seg: 1,
      Ter: 2,
      Qua: 3,
      Qui: 4,
      Sex: 5,
      Sab: 6,
    };

    const alvo = mapa[dia];
    const atual = dataLocal.getDay();

    let diff = alvo - atual;
    if (diff <= 0) diff += 7;

    const proximaData = new Date(dataLocal);
    proximaData.setDate(proximaData.getDate() + diff);

    // Formatar como ISO (YYYY-MM-DD)
    const ano = proximaData.getFullYear();
    const mes = String(proximaData.getMonth() + 1).padStart(2, '0');
    const data = String(proximaData.getDate()).padStart(2, '0');
    
    const dataISO = `${ano}-${mes}-${data}`;
    console.log(`📅 Data gerada para ${dia}: ${dataISO} (Dia semana: ${proximaData.getDay()})`);
    
    return dataISO;
  };

  // 🔹 CARREGAR HORÁRIOS DO PSICÓLOGO
  const carregarHorarios = async (id_psicologo) => {
    try {
      const dados = await verHorariosDisponiveis(id_psicologo);
      console.log("📅 Horários disponíveis:", dados);
      setHorarios(dados || []);
    } catch (error) {
      console.error("Erro ao carregar horários:", error);
      setHorarios([]);
    }
  };

  // 🔹 AGENDAR SESSÃO
  const agendar = async () => {
    if (!diaSelecionado || !horaSelecionada || !userPerfil || !psicologo) {
      alert("Selecione dia e horário");
      return;
    }

    const dataISO = gerarDataPorDia(diaSelecionado);

    console.log("✅ DEBUG AGENDAMENTO:", {
      id_usuario: user?.id_usuario,
      id_psi: psicologo.id_psicologo,
      nome_psi: userPerfil.nome,
      data_ISO: dataISO,
      hora: horaSelecionada,
    });

    const payload = {
      id_psicologo: psicologo.id_psicologo,
      id_paciente: user?.id_usuario,
      data_sessao: dataISO,
      hora_inicio: horaSelecionada,
    };

    console.log("📤 Payload enviado:", JSON.stringify(payload, null, 2));

    try {
      setAgendando(true);
      await agendarSessaoCont(payload);

      alert("Sessão agendada com sucesso! ✅");
      setModalAgendar(false);
      setHorarios([]);
      setDiaSelecionado(null);
      setHoraSelecionada(null);

    } catch (e) {
      console.error("❌ Erro ao agendar:", e);
      if (e.response?.status === 400) {
        alert("Esse horário já foi ocupado.");
      } else {
        alert("Erro ao agendar sessão: " + (e.message || e));
      }
    } finally {
      setAgendando(false);
    }
  };

  useEffect(() => {
    async function fetchPsicologo() {
      try {
        const response = await verPsicologo(id);
        console.log(response);
        setUserPerfil(response.user);
        setPsicologo(response.psicologo);

      } catch (error) {
        console.log("Erro ao buscar psicólogo", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPsicologo();
  }, [id]); // importante

  if (loading) return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <ActivityIndicator size="large" color="#2E7D32" /></View>;
  if (!userPerfil) return <Text>Erro ao carregar dados</Text>;


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        {/* CARD DO PSICÓLOGO */}
        <View style={styles.card}>
          <View style={styles.fotoContainer}>
            <View style={styles.fotoPerfil}>
              <Ionicons
                name="person-outline"
                size={50}
                color="white"
                style={styles.fotoPerfil2}
              />
            </View>
          </View>

          <Text style={styles.nomePessoa}>{userPerfil.nome}</Text>
          <Text style={styles.nickname}>@{userPerfil.username}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.estrelas}>
              {[1,2,3,4,5].map((item) => (
                <Ionicons key={item} name="star" size={16} color="#FFD700" />
              ))}
            </View>

            <Text style={styles.textoAvaliacao}>
              {psicologo.avaliacao} 
              <Text style={{ color: "#6C63FF" }}>
                {" "}({psicologo.totalAvaliacoes} avaliações)
              </Text>
            </Text>
          </View>
          <View style={styles.infoContainer}>

            {/* 🧠 EXPERIÊNCIA */}
            <View style={styles.linhaInfo}>
              <Ionicons name="school-outline" size={18} color="#6C63FF" />
              <Text style={styles.textoInfo}>{psicologo.tempoExperiencia} 12+ experiência</Text>
            </View>

            {/* 👥 PACIENTES */}
            <View style={styles.linhaInfo}>
              <Ionicons name="people-outline" size={18} color="#6C63FF" />
              <Text style={styles.textoInfo}>{!psicologo.pacientes && (<Text>0 Pacientes</Text>)}</Text>
            </View>

          </View>

          {/* INFORMAÇÕES */}
          <View style={styles.container2}>

            <View style={styles.rowWrap}>
              <Text style={styles.tituloCard}>Sobre</Text>
              <Text style={styles.texto}>{psicologo.biografia}</Text>
            </View>

            <View style={styles.rowWrap}>
              <Text style={styles.label}>Valor</Text>
              <Text style={styles.texto}>R$ {psicologo.preco_sessao}</Text>
            </View>

            {/* 🔹 BOTÃO AGENDAR */}
            <Pressable
              style={styles.botao}
              onPress={() => {
                setDiaSelecionado(null);
                setHoraSelecionada(null);
                setModalAgendar(true);
              }}
            >
              <Text style={styles.botaoTexto}>
                📅 Agendar Sessão
              </Text>
            </Pressable>

          </View>

        </View>
      </View>
      <NavBar 
        tela = "home"
      />
    </KeyboardAvoidingView>
  );
}