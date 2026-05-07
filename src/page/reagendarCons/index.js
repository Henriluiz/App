import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";
import NavBar from "../../components/NavBar";
import { useNavigation } from "@react-navigation/native";

export default function ReagendarConsulta({ route }) {
  const navigation = useNavigation();
  const { verHorariosDisponiveis, user } = useAuth();

  const { psicologo, sessao } = route.params ?? {};

  const [indexDiaSelecionado, setIndexDiaSelecionado] = useState(0);
  const [horaSelecionada, setHoraSelecionada] = useState(null);
  const [horarios, setHorarios] = useState([]);
  const [loading, setLoading] = useState(false);

  // 📅 Gerar dias
  const gerarDiasList = () => {
    const lista = [];
    const agora = new Date();
    agora.setHours(0, 0, 0, 0);
    agora.setDate(agora.getDate() + 1);

    const diasCompletos = [
      "Domingo","Segunda-feira","Terça-feira","Quarta-feira",
      "Quinta-feira","Sexta-feira","Sábado"
    ];

    const meses = [
      "janeiro","fevereiro","março","abril","maio","junho",
      "julho","agosto","setembro","outubro","novembro","dezembro"
    ];

    for (let i = 0; i < 30; i++) {
      const data = new Date(agora);
      data.setDate(data.getDate() + i);

      const ano = data.getFullYear();
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const dia = String(data.getDate()).padStart(2, "0");

      lista.push({
        id: i,
        iso: `${ano}-${mes}-${dia}`,
        dia,
        mes: meses[data.getMonth()],
        diaSemanaCompleto: diasCompletos[data.getDay()],
      });
    }

    return lista;
  };

  const diasLista = gerarDiasList();
  const diaSelecionado = diasLista[indexDiaSelecionado];

  // 📅 Buscar horários (COM CORREÇÃO DO ERRO)
  const handleSelectDia = async (index) => {
    setIndexDiaSelecionado(index);
    setHoraSelecionada(null);
    setLoading(true);

    try {
      const item = diasLista[index];

      const dados = await verHorariosDisponiveis(
        psicologo?.id_psicologo,
        item.iso
      );

      console.log("HORARIOS API:", dados);

      // 🔥 TRATAMENTO CORRETO
      if (Array.isArray(dados)) {
        setHorarios(dados);
      } else if (Array.isArray(dados?.horarios)) {
        setHorarios(dados.horarios);
      } else {
        setHorarios([]);
      }

    } catch (error) {
      console.error("Erro ao carregar horários:", error);
      setHorarios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProximoDia = () => {
    if (indexDiaSelecionado < diasLista.length - 1) {
      handleSelectDia(indexDiaSelecionado + 1);
    }
  };

  const handleDiaAnterior = () => {
    if (indexDiaSelecionado > 0) {
      handleSelectDia(indexDiaSelecionado - 1);
    }
  };

  // ✅ Confirmar
  const handleConfirmarAgendamento = () => {
    if (!horaSelecionada) {
      alert("Selecione um horário");
      return;
    }

    navigation.navigate("confirConsulta", {
      modo: "reagendar",
      psicologo,
      diaSelecionado,
      horaSelecionada,
      userPerfil: user,
      sessaoOriginal: sessao,
    });
  };

  useEffect(() => {
    handleSelectDia(0);
  }, []);

  return (
    <View style={styles.containerAgenda}>
      <ScrollView contentContainerStyle={styles.scrollAgenda}>
                
        {/* 🔹 SESSÃO */}
        <View style={styles.cardAgenda}>
          <Text style={styles.tituloCard}>Agendamento atual</Text>

          {sessao ? (
            <View style={styles.sessaoCard}>

              <Text style={styles.sessaoNome}>
                {psicologo.nome}
              </Text>

              <View style={styles.sessaoHorarioRow}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.sessaoHorario}>
                  {sessao.data_sessao}
                </Text>
              </View>

              <View style={styles.sessaoHorarioRow}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.sessaoHorario}>
                  Horário: {sessao.hora_inicio}
                </Text>
              </View>

              <Text style={styles.sessaoToque}>
                Escolha nova data e horário ↓
              </Text>
            </View>
          ) : (
            <Text style={styles.vazioTexto}>
              Nenhuma sessão recebida
            </Text>
          )}
        </View>

        {/* 🔹 DATA */}
        <View style={styles.cardAgenda}>
          <Text style={styles.tituloCard}>Selecione a Data</Text>

          <View style={styles.seletorDataContainer}>
            <Pressable onPress={handleDiaAnterior}>
              <Ionicons name="chevron-back" size={28} color="#8E7CFF" />
            </Pressable>

            <View style={styles.dataDisplayContainer}>
              <Text style={styles.dataDisplayDia}>
                {diaSelecionado.diaSemanaCompleto}
              </Text>

              <Text style={styles.dataDisplayData}>
                {diaSelecionado.dia}
              </Text>

              <Text style={styles.dataDisplayMes}>
                {diaSelecionado.mes}
              </Text>
            </View>

            <Pressable onPress={handleProximoDia}>
              <Ionicons name="chevron-forward" size={28} color="#8E7CFF" />
            </Pressable>
          </View>
        </View>

        {/* 🔹 HORÁRIOS */}
        <View style={styles.cardAgenda}>
          <Text style={styles.tituloCard}>Horários Disponíveis</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#8E7CFF" />
          ) : Array.isArray(horarios) && horarios.length > 0 ? (
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
            <Text style={styles.vazioTexto}>
              Nenhum horário disponível
            </Text>
          )}
        </View>
      </ScrollView>

      {/* 🔹 BOTÃO */}
      {horaSelecionada && (
        <View style={styles.footerAgenda}>
          <Pressable
            style={styles.botaoConfirmar}
            onPress={handleConfirmarAgendamento}
          >
            <Text style={styles.botaoConfirmarTexto}>
              Solicitar Reagendamento
            </Text>
          </Pressable>
        </View>
      )}

      <NavBar tela="pesquisa" />
    </View>
  );
}