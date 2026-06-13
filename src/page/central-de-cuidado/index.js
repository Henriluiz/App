import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  // StatusBar,
  Platform,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import NavBar from "../../components/NavBar";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

function CardHistorico({ item }) {
  const isCancelada = item.status_sessao === "cancelada";

  const formatarData = (iso) => {
    if (!iso) return "";
    const [ano, mes, dia] = iso.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  const formatarHora = (hora) => hora?.slice(0, 5) ?? "";

  return (
    <View style={styles.cardHistorico}>
      <View style={styles.historicoHeader}>
        <View style={styles.historicoIconCircle}>
          <Ionicons
            name={
              isCancelada ? "close-circle-outline" : "checkmark-circle-outline"
            }
            size={22}
            color={isCancelada ? "#E74C3C" : "#52BE80"}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.nomeDoutora}>
            {item.psicologo?.usuario?.nome ?? "Profissional"}
          </Text>
          <Text style={styles.especialidade}>
            {item.psicologo?.especialidade ?? "Psicólogo(a)"}
          </Text>
        </View>
        <View
          style={[
            styles.badgeStatus,
            { backgroundColor: isCancelada ? "#FDEDEC" : "#EAFAF1" },
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              { color: isCancelada ? "#E74C3C" : "#27AE60" },
            ]}
          >
            {isCancelada ? "Cancelada" : "Realizada"}
          </Text>
        </View>
      </View>

      <View style={styles.historicoFooter}>
        <Ionicons name="calendar-outline" size={13} color="#95A5A6" />
        <Text style={styles.historicoData}>
          {formatarData(item.data_sessao)} às {formatarHora(item.hora_inicio)}
        </Text>
      </View>
    </View>
  );
}

export default function CentralCuidado() {
  const navigation = useNavigation();
  const { mSessoes, historico } = useAuth();

  const [proximaSessao, setProximaSessao] = useState(null);
  const [loadingSessao, setLoadingSessao] = useState(true);
  const [listaHistorico, setListaHistorico] = useState([]);
  const [loadingHistorico, setLoadingHistorico] = useState(true);

  useEffect(() => {
    const buscarProximaSessao = async () => {
      try {
        const resposta = await mSessoes();
        const lista = resposta?.sessoes ?? [];
        const hoje = new Date().toISOString().split("T")[0];
        const futura =
          lista
            .filter(
              (s) => s.data_sessao >= hoje && s.status_sessao === "agendada",
            )
            .sort((a, b) => {
              if (a.data_sessao !== b.data_sessao)
                return a.data_sessao.localeCompare(b.data_sessao);
              return a.hora_inicio.localeCompare(b.hora_inicio);
            })[0] ?? null;
        setProximaSessao(futura);
      } catch (error) {
        console.error("Erro ao buscar próxima sessão:", error);
      } finally {
        setLoadingSessao(false);
      }
    };
    buscarProximaSessao();
  }, []);

  useEffect(() => {
    const buscarHistorico = async () => {
      try {
        const resposta = await historico();
        const realizadas = resposta?.realizadas ?? [];
        const cancelamentos = resposta?.cancelamentos ?? [];
        const todas = [...realizadas, ...cancelamentos].sort((a, b) => {
          if (b.data_sessao !== a.data_sessao)
            return b.data_sessao.localeCompare(a.data_sessao);
          return b.hora_inicio.localeCompare(a.hora_inicio);
        });
        setListaHistorico(todas);
      } catch (error) {
        console.error("Erro ao buscar histórico:", error);
      } finally {
        setLoadingHistorico(false);
      }
    };
    buscarHistorico();
  }, []);

  const getPressableStyle = ({ pressed }) => [
    styles.pressableBase,
    { opacity: pressed ? 0.7 : 1 },
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
    <SafeAreaView
      style={{flex: 1}}
    >
      <StatusBar translucent backgroundColor="transparent" />

      {/* ── BLOCO FIXO — não rola ─────────────────────────────── */}
       <View style={styles.container}>


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

              {loadingSessao ? (
                <ActivityIndicator
                  size="small"
                  color="#76D7C4"
                  style={{ marginVertical: 16 }}
                />
              ) : proximaSessao ? (
                <>
                  <View style={styles.infoDoutora}>
                    <View>
                      <Text style={styles.labelProfissional}>Profissional</Text>
                      <Text style={styles.nomeDoutora}>
                        {getNomePsicologo(proximaSessao)}
                      </Text>
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
                    style={({ pressed }) => [
                      styles.btnEntrar,
                      { opacity: pressed ? 0.8 : 1 },
                    ]}
                    onPress={() => console.log("Entrando na sessão...")}
                  >
                    <Text style={styles.btnText}>Entrar na Sessão</Text>
                  </Pressable>
                </>
              ) : (
                <View style={{ alignItems: "center", paddingVertical: 5 }}>
                  <Ionicons name="calendar-outline" size={36} color="#ccc" />
                  <Text style={{ color: "#aaa", fontSize: 14 }}>
                    Nenhuma sessão agendada
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      styles.btnAgendar,
                      { opacity: pressed ? 0.8 : 1 },
                    ]}
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
                <Pressable
                  style={getPressableStyle}
                  onPress={() => navigation.navigate("minhasSessoes")}
                >
                  <Ionicons name="time-outline" size={24} color="#5DADE2" />
                  <Text style={styles.miniCardTitle}>Sessões</Text>
                  <Text style={styles.miniCardSub}>Próximas sessões</Text>
                </Pressable>
                <Pressable style={getPressableStyle} onPress={() => {}}>
                  <Ionicons name="chatbubble-outline" size={24} color="#A569BD" />
                  <Text style={styles.miniCardTitle}>Chat</Text>
                  <Text style={styles.miniCardSub}>Mensagens</Text>
                </Pressable>
              </View>
              <View style={styles.row}>
                <Pressable style={getPressableStyle} onPress={() => navigation.navigate("historico")}>
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color="#52BE80"
                  />
                  <Text style={styles.miniCardTitle}>Histórico</Text>
                  <Text style={styles.miniCardSub}>Sessões anteriores</Text>
                </Pressable>
                <Pressable
                  style={getPressableStyle}
                  onPress={() => navigation.navigate("pagamento")}
                >
                  <Ionicons name="card-outline" size={24} color="#EB984E" />
                  <Text style={styles.miniCardTitle}>Pagamento</Text>
                  <Text style={styles.miniCardSub}>Faturas</Text>
                </Pressable>
              </View>
            </View>

          </View>
       </View>

        <NavBar tela="central" />
    </SafeAreaView>
  );
}
