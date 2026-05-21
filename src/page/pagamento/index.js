import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

export default function Pagamento() {
  const navigation = useNavigation();
  const [formaSelecionada, setFormaSelecionada] = useState("cartao");

  return (
    <View style={styles.container}>
      {/* HEADER */}
      

      {/* CONTEÚDO */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* CARD RESUMO */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>RESUMO DA SESSÃO</Text>

          {/* PERFIL */}
          <View style={styles.perfilRow}>
            <Image
              source={{
                uri: "https://static.vecteezy.com/ti/vetor-gratis/p1/73022350-desenho-animado-profissional-mulher-dentro-uma-o-negocio-terno-sorridente-para-a-avatar-perfil-icone-vetor.jpg", // Substitua pela sua nova imagem/avatar se necessário
              }}
              style={styles.avatar}
            />
            <View style={styles.perfilInfo}>
              <Text style={styles.nome}>Dra. Eloísa Almeida</Text>
              <Text style={styles.especialidade}>Psicóloga clínica</Text>
            </View>
          </View>

          {/* INFO DATA */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Feather name="calendar" size={24} color="#46C2BE" />
              <Text style={styles.infoTexto}>Quarta-feira, 15 de Outubro</Text>
            </View>

            <View style={styles.infoRow}>
              <Feather name="clock" size={24} color="#46C2BE" />
              <Text style={styles.infoTexto}>14:00 - 14:50 (50 min)</Text>
            </View>
          </View>

          {/* DIVISOR */}
          <View style={styles.divisor} />

          {/* VALOR */}
          <View style={styles.valorRow}>
            <Text style={styles.valorLabel}>Valor total</Text>
            <Text style={styles.valorPreco}>R$150,00</Text>
          </View>
        </View>

        {/* TÍTULO FORMA DE PAGAMENTO */}
        <Text style={styles.formaTitulo}>Forma de pagamento</Text>

        {/* OPÇÃO CARTÃO DE CRÉDITO */}
        <Pressable
          style={[
            styles.pagamentoCard,
            formaSelecionada === "cartao" && styles.pagamentoCardSelecionado,
          ]}
          onPress={() => setFormaSelecionada("cartao")}
        >
          {/* Tag Recomendado */}
          <View style={styles.tagRecomendado}>
            <Text style={styles.tagRecomendadoTexto}>RECOMENDADO</Text>
          </View>

          <View style={styles.pagamentoLeft}>
            <Ionicons
              name={formaSelecionada === "cartao" ? "radio-button-on" : "radio-button-off"}
              size={28}
              color="#000000"
              style={styles.radioIcon}
            />
            <MaterialCommunityIcons name="credit-card-outline" size={32} color="#46C2BE" />
            <View style={styles.textosPagamento}>
              <Text style={styles.pagamentoTitulo}>Cartão de crédito</Text>
              <Text style={styles.pagamentoSub}>•••• 4242</Text>
            </View>
          </View>
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