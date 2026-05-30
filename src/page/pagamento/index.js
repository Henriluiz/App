import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";

export default function Pagamento() {
  const navigation = useNavigation();
  const { mSessoes } = useAuth();

  const [agendando, setAgendando] = useState(false);
  const [proximaSessao, setProximaSessao] = useState(null);
  const [loadingSessao, setLoadingSessao] = useState(true);

  // ── mesma lógica de CentralCuidado ──────────────────────────
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

  // ── helpers de formatação ────────────────────────────────────
  const formatarData = (iso) => {
    if (!iso) return "";
    const [ano, mes, dia] = iso.split("-");
    const date = new Date(`${ano}-${mes}-${dia}T00:00:00`);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const formatarHorario = (inicio, fim) => {
    const h1 = inicio?.slice(0, 5) ?? "";
    const h2 = fim?.slice(0, 5) ?? "";
    return h1 && h2 ? `${h1} - ${h2}` : h1;
  };

  const formatarValor = (valor) => {
    if (!valor) return "—";
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  // ── dados derivados da sessão ────────────────────────────────
  const psicologo = proximaSessao?.psicologo?.usuario?.nome ?? "Profissional";
  const especialidade =
    proximaSessao?.psicologo?.especialidade ?? "Psicólogo(a)";
  const data = formatarData(proximaSessao?.data_sessao);
  const horario = formatarHorario(
    proximaSessao?.hora_inicio,
    proximaSessao?.hora_fim,
  );
  const valor = formatarValor(proximaSessao?.valor);

  // ────────────────────────────────────────────────────────────
  const handleConfirmarPagamento = () => {
    setAgendando(true);
    setTimeout(() => {
      setAgendando(false);
      navigation.navigate("minhasSessoes");
    }, 900);
  };

  if (loadingSessao) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#8E7CFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Resumo da Sessão</Text>

          <View style={styles.psicologoRow}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={26} color="#FFF" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.summaryName}>{psicologo}</Text>
              <Text style={styles.summarySpecialty}>{especialidade}</Text>

              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={14} color="#5DE2D4" />
                <Text style={styles.infoText}>{data}</Text>
              </View>

              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={14} color="#5DE2D4" />
                <Text style={styles.infoText}>{horario}</Text>
              </View>
            </View>
          </View>

          <View style={styles.valorRow}>
            <Text style={styles.valorLabel}>Valor total</Text>
            <Text style={styles.valorValue}>{valor}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.pixContainer}>
            <Text style={styles.pixTitle}>Pague com Pix</Text>

            <View style={styles.pixHeader}>
              <Ionicons name="qr-code-outline" size={15} color="#8E7CFF" />
              <Text style={styles.pixHeaderText}>QR Code Pix</Text>

              <Pressable style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Copiar código</Text>
              </Pressable>
            </View>

            <View style={styles.pixContent}>
              <View style={styles.qrCode}>
                <Ionicons name="qr-code" size={90} color="#000" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.pixDescription2}>
                  Escaneie o QR Code com o app do seu banco para pagar.
                </Text>

                <View style={styles.alertBox}>
                  <Ionicons
                    name="information-circle"
                    size={16}
                    color="#8E7CFF"
                  />

                  <Text style={styles.alertText}>
                    O pagamento é processado pelo banco e o comprovante deverá
                    ser anexado.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.uploadContainer}>
          <Text style={styles.uploadLabel}>Anexar comprovante</Text>

          <Pressable style={styles.uploadArea}>
            <Ionicons name="cloud-upload-outline" size={34} color="#8E7CFF" />

            <Text style={styles.uploadAreaText}>
              Clique para anexar ou arraste o arquivo aqui
            </Text>
          </Pressable>

          <Text style={styles.fileText}>Nenhum comprovante anexado</Text>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.actionButton, agendando && { opacity: 0.7 }]}
          onPress={handleConfirmarPagamento}
          disabled={agendando}
        >
          {agendando ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.actionButtonText}>
              Finalizar e enviar comprovante
            </Text>
          )}
        </Pressable>
        <Text style={styles.footerNote}>Pagamento seguro e criptografado</Text>
      </View>
    </View>
  );
}
