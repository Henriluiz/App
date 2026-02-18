import React, { useState } from "react";
import {Text,View,TextInput,Pressable,ScrollView,KeyboardAvoidingView,Platform,
} from "react-native";
import styles from "./styles";

export default function DadoConta({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);

  /* =========================
     VALIDAÇÃO
  ========================== */

  function validarEmail(texto) {
    setEmail(texto);

    if (!texto) {
      setErro("O email é obrigatório.");
      return;
    }

    if (!texto.includes("@") || !texto.includes(".")) {
      setErro("Digite um email válido.");
      return;
    }

    setErro("");
  }

  function enviar() {
    if (!email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErro("Digite um email válido.");
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
    navigation.navigate("cadFinal");
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
          {/* ================= HEADER ================= */}
          <View style={styles.header}>
            <Text style={styles.titulo1}>
              ESTAMOS FELIZ POR VOCÊ ESTAR CONOSCO{" "}
              <Text style={styles.destaque}>AQUI!</Text>
            </Text>

            <Text style={styles.descricao}>
              Sua jornada de saúde mental começa agora.
            </Text>
          </View>

          {/* ================= CARD ================= */}
          <View style={styles.card}>
            <Text style={styles.tituloCard}>Dados da Conta</Text>

            <View style={styles.contInput}>
              {/* EMAIL */}
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={validarEmail}
                style={[
                  styles.input,
                  erro && erro.includes("email")
                    ? styles.inputErro
                    : null,
                ]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />

              {/* SENHA */}
              <Text style={styles.label}>Crie uma senha</Text>
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />

              {/* CONFIRMAR SENHA */}
              <Text style={styles.label}>Confirme a senha</Text>
              <TextInput
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
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
                  {aceitoTermos && (
                    <Text style={styles.check}>✓</Text>
                  )}
                </View>

                <Text style={styles.textoTermos}>
                  Li e concordo com os{" "}
                  <Text style={styles.link}>
                    Termos de Uso
                  </Text>{" "}
                  e a{" "}
                  <Text style={styles.link}>
                    Política de Privacidade
                  </Text>
                </Text>
              </Pressable>

              {/* ERRO */}
              {erro ? (
                <Text style={styles.mensagemErro}>{erro}</Text>
              ) : null}
            </View>

            {/* ================= BOTÕES ================= */}
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
                <Text style={styles.textoProximo}>
                  Próximo
                </Text>

                <View style={styles.circuloSeta}>
                  <Text style={styles.setaProximo}>
                    {">"}
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}
