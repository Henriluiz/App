import React, { useState } from "react";
import {Text,View,TextInput,Pressable,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";

import styles from "./styles";

export default function esquecerSenha({ navigation }) {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);

 
  /* =========================
     FORÇA DA SENHA
  ========================== */

  function Strength(password) {
    let i = 0;

    if (password.length > 6) i++;

    if (password.length >= 10) i++;

    if (/[A-Z]/.test(password)) i++;

    if (/[0-9]/.test(password)) i++;

    if (/[!@#$%^&*]/.test(password)) i++;

    return i;
  }

  /* =========================
     ENVIO
  ========================== */

  function enviar() {
    if (!senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (!aceitoTermos) {
      setErro("Você precisa aceitar os termos.");
      return;
    }

    setErro("");

    navigation.navigate("login");
  }

  /* =========================
     RENDER
  ========================== */

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.titulo1}>
              ESQUECEU SUA SENHA? CRIE OUTRA{" "}
              <Text style={styles.destaque}>AQUI!</Text>
            </Text>

            <Text style={styles.descricao}>
              Sua jornada de saúde mental não para.
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.tituloCard}>Crie Uma Nova Senha</Text>

            <View style={styles.contInput}>
              {/* SENHA */}
              <Text style={styles.label}>Crie uma senha</Text>

              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                placeholder="Digite sua senha"
              />

              {/* CONFIRMAR SENHA */}
              <Text style={styles.label}>Confirme a senha</Text>

              <TextInput
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
                placeholder="Confirme sua senha"
              />

              {/* CHECKBOX TERMOS */}
              <Pressable
                style={styles.containerCheckbox}
                onPress={() => setAceitoTermos(!aceitoTermos)}
              >
                <View
                  style={[
                    styles.checkbox,
                    aceitoTermos && styles.checkboxAtivo,
                  ]}
                >
                  {aceitoTermos && <Text style={styles.check}>✓</Text>}
                </View>

                <Text style={styles.textoTermos}>
                  Li e concordo com os{" "}
                  <Text style={styles.link}>Termos de Uso</Text>{" "}
                  e a{" "}
                  <Text style={styles.link}>Política de Privacidade</Text>
                </Text>
              </Pressable>

              {/* ERRO */}
              {erro ? (
                <Text style={styles.mensagemErro}>{erro}</Text>
              ) : null}
            </View>

            {/* BOTÕES */}
            <View style={styles.containerBotoes}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={styles.btnVoltar}
              >
                <Text style={styles.setaVoltar}>{"<"}</Text>
              </Pressable>

              <Pressable
                onPress={enviar}
                disabled={!aceitoTermos}
                style={[
                  styles.btnProximo,
                  !aceitoTermos && styles.botaoDesativado,
                ]}
              >
                <Text style={styles.textoProximo}>Próximo</Text>

                <View style={styles.circuloSeta}>
                  <Text style={styles.setaProximo}>{">"}</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}