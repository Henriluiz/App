import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import NavBar from "../../components/NavBar";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../context/AuthContext";

export default function Cancelamento({ route }) {
  const navigation = useNavigation();
  const { sessao, psicologo, diaSelecionado, horaSelecionada, userPerfil} = route.params ?? {};

  const [motivoSelecionado, setMotivoSelecionado] = useState(null);
  const [modalSucesso, setModalSucesso] = useState(false);

  const { SolCancelamentoCons } = useAuth();

  const motivos = [
    "Conflito de horário",
    "Compromisso inesperado",
    "Problema de saúde",
    "Imprevisto pessoal",
    "Motivo financeiro",
  ];

  const handleCancelar = async() => {
    if (!motivoSelecionado) {
      alert("Selecione um motivo");
      return;
    }

    await SolCancelamentoCons(sessao.id_sessao);

    console.log("Cancelando:", sessao, motivoSelecionado);

    <ModalApp
      visible={modalSucesso}
      titulo="Solicitação Enviada"
      mensagem="Solicitação de cancelamento da Consulta enviada com sucesso!"
      tipo="sucesso"
      onCancelar={() => setModal(false)}
      />
    navigation.goBack();
  };

  return (
    <View style={styles.containerAgenda}>
      <ScrollView contentContainerStyle={styles.scrollAgenda}>

        {/* 🔴 CARD ALERTA */}
        <View style={styles.alertaCard}>
          <Text style={styles.alertaTitulo}>
            Atenção:
          </Text>

          <Text style={styles.alertaTexto}>
            Você está prestes a solicitar o cancelamento da seguinte consulta:
          </Text>

          <Text style={styles.alertaNome}>
            {psicologo.nome}
          </Text>

          <Text style={styles.alertaInfo}>
            {sessao?.data_sessao}
          </Text>

          <Text style={styles.alertaInfo}>
            Horário: {sessao?.hora_inicio}
          </Text>
        </View>

        {/* 🔹 MOTIVOS */}
        <View style={styles.cardAgenda}>
          <Text style={styles.tituloCard}>
            Motivo do cancelamento
          </Text>

          {motivos.map((motivo, index) => (
            <Pressable
              key={index}
              style={[
                styles.motivoButton,
                motivoSelecionado === motivo && styles.motivoSelecionado,
              ]}
              onPress={() => setMotivoSelecionado(motivo)}
            >
              <Text
                style={[
                  styles.motivoTexto,
                  motivoSelecionado === motivo && styles.motivoTextoSelecionado,
                ]}
              >
                {motivo}
              </Text>
            </Pressable>
          ))}
        </View>

      </ScrollView>

      {/* 🔴 BOTÃO FIXO */}
      <View style={styles.footerAgenda}>
        <Pressable
          style={styles.botaoCancelarFinal}
          onPress={handleCancelar}
        >
          <Text style={styles.botaoCancelarFinalTexto}>
            Solicitar Cancelamento
          </Text>
        </Pressable>
      </View>

      <NavBar tela="sessoes" />
    </View>
  );
}