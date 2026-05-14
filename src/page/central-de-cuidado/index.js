import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView, StatusBar, Platform, ActivityIndicator } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons'; 
import NavBar from "../../components/NavBar";
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function CentralCuidado() {
  const navigation = useNavigation();
  const { mSessoes } = useAuth();

  const [proximaSessao, setProximaSessao] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarProximaSessao = async () => {
      try {
        const resposta = await mSessoes();
        const lista = resposta?.sessoes ?? [];

        const hoje = new Date().toISOString().split("T")[0];

        // Filtra sessões futuras agendadas e pega a mais próxima
        const futura = lista
          .filter((s) => s.data_sessao >= hoje && s.status_sessao === "agendada")
          .sort((a, b) => {
            if (a.data_sessao !== b.data_sessao)
              return a.data_sessao.localeCompare(b.data_sessao);
            return a.hora_inicio.localeCompare(b.hora_inicio);
          })[0] ?? null;

        setProximaSessao(futura);
      } catch (error) {
        console.error("Erro ao buscar próxima sessão:", error);
      } finally {
        setLoading(false);
      }
    };

    buscarProximaSessao();
  }, []);

  const getPressableStyle = ({ pressed }) => [
    styles.pressableBase,
    { opacity: pressed ? 0.7 : 1 }
  ];

  const getNomePsicologo = (sessao) =>
    sessao?.psicologo?.usuario?.nome ?? "Profissional";

  const formatarData = (iso) => {
    if (!iso) return "";
    const [ano, mes, dia] = iso.split("-");
    const hoje = new Date().toISOString().split("T")[0];
    const amanha = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    if (iso === hoje) return "Hoje";
    if (iso === amanha) return "Amanhã";
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHora = (hora) => hora?.slice(0, 5) ?? "";

  return (
    <SafeAreaView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <StatusBar barStyle="light-content" backgroundColor="#9B59B6" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Central de Cuidado</Text>
          <Text style={styles.subtitle}>Gerencie suas sessões e informações</Text>
        </View>

        <View style={styles.content}>
          {/* Card Próxima Sessão */}
          <View style={styles.cardSessao}>
            <View style={styles.sessaoHeader}>
              <View style={styles.iconCircle}>
                <Feather name="video" size={20} color="#76D7C4" />
              </View>
              <Text style={styles.sessaoTitle}>Próxima Sessão</Text>
            </View>

            {loading ? (
              <ActivityIndicator size="small" color="#76D7C4" style={{ marginVertical: 16 }} />
            ) : proximaSessao ? (
              <>
                <View style={styles.infoDoutora}>
                  <View>
                    <Text style={styles.labelProfissional}>Profissional</Text>
                    <Text style={styles.nomeDoutora}>{getNomePsicologo(proximaSessao)}</Text>
                    <Text style={styles.especialidade}>
                      {proximaSessao.psicologo?.especialidade ?? "Psicólogo(a)"}
                    </Text>
                  </View>
                  <View style={styles.tempoContainer}>
                    <Text style={styles.labelHoje}>
                      {formatarData(proximaSessao.data_sessao)}
                    </Text>
                    <Text style={styles.horario}>
                      {formatarHora(proximaSessao.hora_inicio)}
                    </Text>
                  </View>
                </View>

                <Pressable
                  style={({ pressed }) => [styles.btnEntrar, { opacity: pressed ? 0.8 : 1 }]}
                  onPress={() => console.log("Entrando na sessão...")}
                >
                  <Text style={styles.btnText}>Entrar na Sessão</Text>
                </Pressable>
              </>
            ) : (
              // Nenhuma sessão futura
              <View style={{ alignItems: "center", paddingVertical: 5 }}>
                <Ionicons name="calendar-outline" size={36} color="#ccc" />
                <Text style={{ color: "#aaa", fontSize: 14 }}>
                  Nenhuma sessão agendada
                </Text>
                <Pressable
                  style={({ pressed }) => [styles.btnAgendar, { opacity: pressed ? 0.8 : 1 }]}
                  onPress={() => navigation.navigate("pesquisa")}
                >
                  <Text style={styles.btnText}>Agendar Sessão</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* Grid de Atalhos */}
          <View style={styles.grid}>
            <View style={styles.row}>
              <Pressable style={getPressableStyle} onPress={() => navigation.navigate("minhasSessoes")}>
                <Ionicons name="time-outline" size={24} color="#5DADE2" />
                <Text style={styles.miniCardTitle}>Sessões</Text>
                <Text style={styles.miniCardSub}>Ver histórico</Text>
              </Pressable>

              <Pressable style={getPressableStyle} onPress={() => {}}>
                <Ionicons name="chatbubble-outline" size={24} color="#A569BD" />
                <Text style={styles.miniCardTitle}>Chat</Text>
                <Text style={styles.miniCardSub}>Mensagens</Text>
              </Pressable>
            </View>

            <View style={styles.row}>
              <Pressable style={getPressableStyle} onPress={() => {}}>
                <Ionicons name="document-text-outline" size={24} color="#52BE80" />
                <Text style={styles.miniCardTitle}>Prontuário</Text>
                <Text style={styles.miniCardSub}>Meus dados</Text>
              </Pressable>

              <Pressable style={getPressableStyle} onPress={() => {}}>
                <Ionicons name="card-outline" size={24} color="#EB984E" />
                <Text style={styles.miniCardTitle}>Pagamento</Text>
                <Text style={styles.miniCardSub}>Faturas</Text>
              </Pressable>
            </View>
          </View>

          <Text style={styles.secaoTitle}>Histórico Recente</Text>
          <View style={styles.cardHistorico}>
            <Text style={styles.nomeDoutora}>Dra. Eloísa</Text>
            <Text style={styles.especialidade}>Sessão concluída em 05/04</Text>
          </View>
        </View>
      </ScrollView>

      <NavBar tela="central" />
    </SafeAreaView>
  );
}