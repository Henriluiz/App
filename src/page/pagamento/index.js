import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import NavBar from "../../components/NavBar";

import styles from "./styles";

export default function Pagamento() {
  const navigation = useNavigation();
  const [agendando, setAgendando] = useState(false);

  const {
    psicologo = "Dra. Maria Silva",
    especialidade = "Psic�loga Cl�nica",
    data = "Quarta Feira, 10 de Abril",
    horario = "09:00",
    valor = "R$180",
    foto_perfil,
  } = route.params ?? {};

  const handleConfirmarAgendamento = () => {
    setAgendando(true);
    setTimeout(() => {
      setAgendando(false);
      navigation.navigate("minhasSessoes");
    }, 900);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      

      {/* CONTEÚDO */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.header}>
          <Pressable style={styles.headerVoltar} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#8E7CFF" />
          </Pressable>
          <Text style={styles.headerTitulo}>Confirmar Agendamento</Text>
        </View>

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
            <Text style={styles.infoLabel}>Psic�logo</Text>
            <Text style={styles.infoValor}>{psicologo}</Text>
            <Text style={styles.infoEspecialidade}>{especialidade}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValor}>{data}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Hor�rio</Text>
            <Text style={styles.infoValor}>{horario}</Text>
          </View>

          <View style={styles.valorRow}>
            <Text style={styles.valorLabel}>Valor da Consulta</Text>
            <Text style={styles.valorPreco}>{valor}</Text>
          </View>
        </View>
      </ScrollView>

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

        {/* OPÇÃO PIX */}
        <Pressable
          style={[
            styles.pagamentoCard,
            formaSelecionada === "pix" && styles.pagamentoCardSelecionado,
          ]}
          onPress={() => setFormaSelecionada("pix")}
        >
          <View style={styles.pagamentoLeft}>
            <Ionicons
              name={formaSelecionada === "pix" ? "radio-button-on" : "radio-button-off"}
              size={28}
              color="#000000"
              style={styles.radioIcon}
            />
            <MaterialCommunityIcons name="credit-card-outline" size={32} color="#000000" />
            <View style={styles.textosPagamento}>
              <Text style={styles.pagamentoTitulo}>Pix</Text>
            </View>
          </View>
        </Pressable>

        {/* SELO DE SEGURANÇA */}
        <View style={styles.seloSeguranca}>
          <Feather name="shield" size={18} color="#46C2BE" />
          <Text style={styles.seloSegurancaTexto}>Pagamento seguro e criptografado</Text>
        </View>
      </ScrollView>

      {/* FOOTER BOTAO */}
      <View style={styles.footer}>
        <Pressable style={styles.botaoPagar}>
          <Text style={styles.botaoPagarTexto}>Pagar Agora</Text>
          <Text style={styles.botaoPagarValor}>R$150,00</Text>
        </Pressable>
      </View>
    </View>
  );
}
