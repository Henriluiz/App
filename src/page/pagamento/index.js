import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useAuth } from "../../context/AuthContext";
import styles from "./styles";

export default function Pagamento() {
  const navigation = useNavigation();
  const { AnexarComprovante, PagamentoPendente } = useAuth(); // ✅ apenas o que é usado

  const [agendando, setAgendando] = useState(false);
  const [pagamento, setPagamento] = useState(null);           // ✅ estado declarado
  const [proximaSessao, setProximaSessao] = useState(null);
  const [loadingSessao, setLoadingSessao] = useState(true);
  const [fotoComprovante, setFotoComprovante] = useState(null);
  const [modalSucesso, setModalSucesso] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
  const buscar = async () => {
    try {
      const resposta = await PagamentoPendente();
      const p = resposta?.pagamento ?? null;
      setPagamento(p);

      if (p?.sessao) {
        setProximaSessao(p.sessao);
      }
    } catch (error) {
      console.error("Erro ao buscar pagamento pendente:", error?.message); // ✅ usa error
      setPagamento(null);
    } finally {
      setLoadingSessao(false);
    }
  };
  buscar();
}, []);

  const selecionarFotoComprovante = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setFotoComprovante(result.assets[0].uri);
    }
  };

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

  const psicologo = proximaSessao?.psicologo?.usuario?.nome ?? "Profissional";
  const especialidade = proximaSessao?.psicologo?.especialidade ?? "Psicólogo(a)";
  const data = formatarData(proximaSessao?.data_sessao);
  const horario = formatarHorario(proximaSessao?.hora_inicio, proximaSessao?.hora_fim);
  const valor = formatarValor(proximaSessao?.valor);

  const handleConfirmarPagamento = async () => {
    console.log("🟡 handleConfirmarPagamento chamado");
    if (!fotoComprovante) {
      Alert.alert("Atenção", "Anexe o comprovante antes de finalizar.");
      return;
    }

    if (!pagamento?.id_pagamento) {
      Alert.alert("Erro", "Nenhum pagamento pendente encontrado.");
      return;
    }
    console.log("fotoComprovante:", fotoComprovante);
    console.log("pagamento:", pagamento?.id_pagamento);
    setAgendando(true);
    try {
      const response = await AnexarComprovante(pagamento.id_pagamento, fotoComprovante); // ✅ chama a API
      
      if (response?.error) {
        setErro(response.message)
        return;
      } else {
        setErro("")
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      setModalSucesso(true);
      await new Promise(resolve => setTimeout(resolve, 5000));
      setModalSucesso(false);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      navigation.navigate("central");
    } catch (error) {
      console.log("ERR0: Não foi possível enviar o comprovante.");
    } finally {
      setAgendando(false);
    }
  };

  if (!pagamento && !loadingSessao) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 32 }]}>
        <Ionicons name="checkmark-circle-outline" size={64} color="#8E7CFF" />
        <Text style={{ fontSize: 18, fontWeight: "600", color: "#333", marginTop: 16, textAlign: "center" }}>
          Não há sessões para serem pagas.
        </Text>
      </View>
    );
  }

  if (loadingSessao) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
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
                  <Ionicons name="information-circle" size={16} color="#8E7CFF" />
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

          <Pressable
            style={styles.uploadArea}
            onPress={selecionarFotoComprovante}
          >
            {fotoComprovante ? (
              <Image source={{ uri: fotoComprovante }} style={styles.uploadAreaImage} />
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={34} color="#8E7CFF" />
                <Text style={styles.uploadAreaText}>
                  Clique para anexar ou arraste o arquivo aqui
                </Text>
              </>
            )}
          </Pressable>

          <Text style={styles.fileText}>
            {fotoComprovante ? "Comprovante anexado ✓" : "Nenhum comprovante anexado"}
          </Text>
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

    </View>
  );
}