import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "./styles";

export default function EsquecerSenha({ navigation, route }) {
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verSenha, setVerSenha] = useState(false);
  const [verSenhaConf, setVerSenhaConf] = useState(false);

  const { email, codeLiso } = route.params;
  const { redefinirSenha } = useAuth();

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

  async function enviar() {
    setErro("");
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

    setLoading(true);
    setErro("");

    try {
      const response = await redefinirSenha(email, codeLiso, senha, confirmarSenha);

      if (response?.error) {
        setErro(response.message ?? "Erro ao redefinir senha.");
      } else {
        navigation.navigate("login");
      }
    } catch (e) {
      setErro("Erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
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

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputSenhaWithIcon}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry={!verSenha}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#999"
                  autoComplete="off"
                  textContentType="none"
                />
                <Pressable onPress={() => setVerSenha(!verSenha)} style={styles.iconEye}>
                  <MaterialIcons
                    name={verSenha ? "visibility" : "visibility-off"}
                    size={25}
                    color="#A383FB"
                  />
                </Pressable>
              </View>

              {/* CONFIRMAR SENHA */}
              <Text style={styles.label}>Confirme a senha</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputSenhaWithIcon}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry={!verSenhaConf}
                  placeholder="Confirme sua senha"
                  placeholderTextColor="#999"
                  autoComplete="off"
                  textContentType="none"
                />
                <Pressable onPress={() => setVerSenhaConf(!verSenhaConf)} style={styles.iconEye}>
                  <MaterialIcons
                    name={verSenhaConf ? "visibility" : "visibility-off"}
                    size={25}
                    color="#A383FB"
                  />
                </Pressable>
              </View>

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
                disabled={!aceitoTermos || loading}
                style={[
                  styles.btnProximo,
                  (!aceitoTermos || loading) && styles.botaoDesativado,
                ]}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text style={styles.textoProximo}>Próximo</Text>
                )}

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