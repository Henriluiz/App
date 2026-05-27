import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import NavBar from "../../components/NavBar";

export default function Pagamento() {
  const navigation = useNavigation();
  const [agendando, setAgendando] = useState(false);

  const psicologo = "Dra. Maria Silva";
  const especialidade = "Psicóloga Clínica";
  const data = "Quarta Feira, 10 de Abril";
  const horario = "09:00";
  const valor = "R$180";
  const foto_perfil = null;

  const handleConfirmarAgendamento = () => {
    setAgendando(true);
    setTimeout(() => {
      setAgendando(false);
      navigation.navigate("minhasSessoes");
    }, 900);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable style={styles.headerVoltar} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#8E7CFF" />
          </Pressable>
          <Text style={styles.headerTitulo}>Confirmar Agendamento</Text>
        </View>

        {/* CARD RESUMO */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Resumo da Consulta</Text>

          <View style={styles.fotoContainer}>
            <View style={styles.fotoPerfil}>
              {foto_perfil ? (
                <Image source={{ uri: foto_perfil }} style={styles.imagem} resizeMode="cover" />
              ) : (
                <Ionicons name="person-outline" size={50} color="#FFFFFF" />
              )}
            </View>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Psicólogo</Text>
            <Text style={styles.infoValor}>{psicologo}</Text>
            <Text style={styles.infoEspecialidade}>{especialidade}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValor}>{data}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValor}>{horario}</Text>
          </View>

          <View style={styles.valorRow}>
            <Text style={styles.valorLabel}>Valor da Consulta</Text>
            <Text style={styles.valorPreco}>{valor}</Text>
          </View>
        </View>
      </ScrollView>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.botaoSolicitar, agendando && { opacity: 0.7 }]}
          onPress={handleConfirmarAgendamento}
          disabled={agendando}
        >
          {agendando ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.botaoSolicitarTexto}>Solicitar Agendamento</Text>
          )}
        </Pressable>

        <Pressable style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoVoltarTexto}>Voltar</Text>
        </Pressable>
      </View>
    </View>
  );
}