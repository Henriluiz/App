import React from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import styles from "./styles";

export default function EditarPerfil({ navigation }) {

  const route = useRoute();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <View style={styles.container}>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.card}>

            {/* BOTÃO VOLTAR */}
            <View style={styles.containerBotoes}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.btnVoltar}
              >
                <Ionicons name="arrow-back" size={40} color="#ffffff" />
              </Pressable>
            </View>

            <View style={styles.container2}>

              <Text style={styles.tituloCard}>Suas informações</Text>

              <Pressable style={styles.item}>
                <Text style={styles.texto}>Nome</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <Pressable style={styles.item}>
                <Text style={styles.texto}>Sobrenome</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <Pressable style={styles.item}>
                <Text style={styles.texto}>Alterar nickname</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <Pressable style={styles.item}>
                <Text style={styles.texto}>Alterar telefone</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <Pressable style={styles.item}>
                <Text style={styles.texto}>Alterar email</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <Pressable style={styles.item}>
                <Text style={styles.texto}>Alterar senha</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <Pressable style={styles.item}>
                <Text style={styles.texto}>Alterar complementos</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <View style={styles.botoesContainer}>

                <Pressable style={styles.botaoExcluir}>
                  <Text style={styles.textoExcluir}>Excluir conta</Text>
                </Pressable>

                <Pressable style={styles.botaoSalvar}>
                  <Text style={styles.textoSalvar}>Salvar alterações</Text>
                </Pressable>

              </View>

            </View>

          </View>

        </ScrollView>

      </View>

    </KeyboardAvoidingView>
  );
}