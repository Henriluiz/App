import React, { useEffect, useState } from "react";
import {
  Text, View, ScrollView, KeyboardAvoidingView,
  Platform, Pressable, Modal, ActivityIndicator
} from "react-native";

import { useAuth } from "../../context/AuthContext"
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
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
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}>

          {/* TOPO */}
          <View style={styles.topo}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={26} color="#000" />
            </Pressable>

            <Pressable onPress={() => setMenuAberto(true)}>
              <Ionicons name="ellipsis-vertical" size={26} color="#000" />
            </Pressable>
          </View>

          <View style={styles.header} />

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
              <Text style={styles.tituloCard}>Informações</Text>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Sobre</Text>
                <Text style={styles.texto}>{psicologo.biografia}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Especialidades</Text>
                <Text style={styles.texto}>{psicologo.especialidades.map(item => item.nome).join("\n")}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Abordagem</Text>
                <Text style={styles.texto}>{psicologo.abordagens.map(item => item.nome).join("\n")}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Atende</Text>
                <Text style={styles.texto}>{psicologo.atendimentos.map(item => item.nome).join("\n")}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Formação</Text>
                <Text style={styles.texto}>{psicologo.crp}</Text>
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

        </ScrollView>


        {/* MODAL MENU - ESTILO INSTAGRAM */}
        <Modal
          visible={menuAberto}
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <Animatable.View animation={"fadeInUp"} duration={800} style={{flex: 1, justifyContent: "flex-end"}}>
              <View style={styles.bottomSheet}>

                <View style={styles.handle}/>

                <Text style={styles.modalTitulo}>Opções</Text>

                <Pressable style={styles.opcao}>
                  <Text style={styles.textoOpcao}>Ver avaliações</Text>
                </Pressable>

                <Pressable 
                  style={styles.opcao}
                  onPress={() => {
                    setMenuAberto(false);
                    setDiaSelecionado(null);
                    setHoraSelecionada(null);
                    setModalAgendar(true);
                  }}
                >
                  <Text style={styles.textoOpcao}>Agendar consulta</Text>
                </Pressable>

                <Pressable
                  style={[styles.opcao, { marginTop: 10 }]}
                  onPress={() => setMenuAberto(false)}
                >
                  <Text style={[styles.textoOpcao, { color: "red" }]}>
                    Cancelar
                  </Text>
                </Pressable>

              </View>
            </Animatable.View>
          </View>
        </Modal>

        {/* 🔹 MODAL AGENDAR CONSULTA - IGUAL AO PESQUISA */}
        <Modal visible={modalAgendar} transparent animationType="slide">
          <View style={styles.modalOverlay} importantForAccessibility="yes">
            <View style={styles.modalBox}>
              <Text style={styles.modalTitulo}>Escolha dia e horário</Text>

              <Text>Dias:</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {dias.map((dia) => (
                  <Pressable
                    key={dia}
                    style={[
                      styles.chip,
                      diaSelecionado === dia && { backgroundColor: "#8E7CFF" },
                    ]}
                    onPress={async () => {
                      setDiaSelecionado(dia);
                      if (psicologo?.id_psicologo) {
                        await carregarHorarios(psicologo.id_psicologo);
                      }
                    }}
                  >
                    <Text
                      style={[
                        styles.chipTexto,
                        diaSelecionado === dia && { color: "#fff" },
                      ]}
                    >
                      {dia}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={{ marginTop: 10 }}>Horários:</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {horarios.length > 0 ? (
                  horarios.map((hora) => (
                    <Pressable
                      key={hora}
                      style={[
                        styles.chip,
                        horaSelecionada === hora && { backgroundColor: "#8E7CFF" },
                      ]}
                      onPress={() => setHoraSelecionada(hora)}
                    >
                      <Text
                        style={[
                          styles.chipTexto,
                          horaSelecionada === hora && { color: "#fff" },
                        ]}
                      >
                        {hora}
                      </Text>
                    </Pressable>
                  ))
                ) : (
                  <Text style={{ color: "#999", marginTop: 10 }}>
                    Nenhum horário disponível para este dia
                  </Text>
                )}
              </View>

              <View style={styles.modalButtons}>
                <Pressable
                  onPress={() => {
                    setModalAgendar(false);
                    setHorarios([]);
                  }}
                >
                  <Text style={{ color: "red" }}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={styles.btnConfirmar}
                  onPress={agendar}
                  disabled={agendando}
                >
                  {agendando ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={{ color: "#fff" }}>Confirmar</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </KeyboardAvoidingView>
  );
}