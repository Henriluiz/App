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
import Feather from '@expo/vector-icons/Feather';

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
                size={120}
                color="white"
                style={styles.fotoPerfil2}
              />
            </View>
          </View>

          <Text style={styles.nomePessoa}>{userPerfil.genero === "MASCULINO" ? <Text>Dr. {userPerfil.nome}</Text> : <Text>Dra. {userPerfil.nome}</Text>}</Text>
          <Text style={styles.profissao}>Psicóloga Clínica</Text>

          <View style={styles.infoContainer}>
            <View style={styles.estrelas}>
              <Ionicons name="star" size={18} color="#FFD700" />
              <Text style={styles.textoAvaliacao}>
                {psicologo.avaliacao} 
              </Text>
            </View>

          </View>

          {/* INFORMAÇÕES */}
          <View style={styles.container2}>

            <View style={styles.rowWrap}>
              <Text style={styles.tituloCard}>Sobre</Text>
              <Text style={styles.texto} numberOfLines={3} ellipsizeMode="tail">{psicologo.biografia}</Text>
            </View>

            <View style={styles.rowWrap}>
              <Text style={styles.tituloCard}>Especialidades</Text>
              <Text style={styles.texto}>{psicologo.especialidades.map(item => item.nome).join(", ")}</Text>
            </View>

            <View>
              <Text style={styles.tituloCard}>Informações</Text>

              <View style={{gap: 10, marginTop: 5, marginBottom: 7}}>
                <View style={styles.rowCont}>
                  <Text style={styles.textoCont}>Duração da Consulta</Text>
                  <Text style={styles.texto}>50 Minutos</Text>
                </View>

                <View style={styles.rowCont}>
                  <Text style={styles.textoCont}>Valor</Text>
                  <Text style={styles.texto}>R$ {psicologo.preco_sessao}</Text>
                </View>
              </View>
            </View>


            <View style={{justifyContent: "flex-end"}}>
              <Pressable
                style={styles.botao}
                onPress={() => {
                  setDiaSelecionado(null);
                  setHoraSelecionada(null);
                  setModalAgendar(true);
                }}
              >
                <Feather name="calendar" size={24} color="#FFF" />
                <Text style={styles.botaoTexto}>
                 Ver Horários Disponíveis
                </Text>
              </Pressable>
            </View>

          </View>

        </View>
      </View>
      <NavBar 
        tela = "home"
      />
    </KeyboardAvoidingView>
  );
}