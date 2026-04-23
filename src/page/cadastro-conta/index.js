import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import styles from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { cadastroPaciente } from "../../services/authService";

export default function CadastroConta() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  
  // Receber dados de telas anteriores
  const { nome, nickname, telefone, dataNasc, genero, cpf, imagem } = route.params;

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validarEmail(texto) {
    setEmail(texto);
    if (!texto) {
      setErro("O email é obrigatório.");
      return;
    }
    if (!regexEmail.test(texto)) {
      setErro("Digite um email válido.");
      return;
    }
    setErro("");
  }

  const convData = (dataBr) => {
    const partes = dataBr.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  };

  const limparCpf = (cpf) => {
    return cpf.replace(/\D/g, '');
  };

  function validarCampos() {
    if (!email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return false;
    }

    if (!regexEmail.test(email)) {
      setErro("Digite um email válido.");
      return false;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
      return false;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return false;
    }

    if (!aceitoTermos) {
      setErro("Você precisa aceitar os termos.");
      return false;
    }

    setErro("");
    return true;
  }

  const enviar = async () => {
    if (!validarCampos()) {
      return;
    }

    setCarregando(true);

    try {
      const data = {
        nome,
        username: nickname,
        email,
        telefone,
        genero,
        senha,
        data: convData(dataNasc),
        cpf: limparCpf(cpf),
        termos: aceitoTermos,
      };

      console.log("📤 Dados enviados:", JSON.stringify(data, null, 2));
      
      // Enviar dados com foto
      const response = await cadastroPaciente(data, imagem);

      console.log("✅ Usuário criado:", response);
      
      Alert.alert("Sucesso", "Cadastro realizado com sucesso!");
      
      navigation.navigate("cadastroFin");

    } catch (error) {
      console.log("❌ Erro:", error);
      console.log("Resposta do servidor:", error.response?.data);
      
      const mensagemErro = error.response?.data?.message || "Erro ao cadastrar";
      Alert.alert("Erro", mensagemErro);
      
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

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
          <View style={styles.header}>
            <Text style={styles.titulo1}>
              ESTAMOS FELIZ POR VOCÊ ESTAR CONOSCO{" "}
              <Text style={styles.destaque}>AQUI!</Text>
            </Text>
            <Text style={styles.descricao}>
              Sua jornada de saúde mental começa agora.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.tituloCard}>Dados da Conta</Text>

            <View style={styles.contInput}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={email}
                onChangeText={validarEmail}
                style={[
                  styles.input,
                  erro && erro.toLowerCase().includes("email")
                    ? styles.inputErro
                    : null,
                ]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu email"
              />

              <Text style={styles.label}>Crie uma senha</Text>
              <TextInput
                style={styles.input}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                placeholder="Digite sua senha"
              />

              <Text style={styles.label}>Confirme a senha</Text>
              <TextInput
                style={styles.input}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
                secureTextEntry
                placeholder="Confirme sua senha"
              />

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

              {erro ? (
                <Text style={styles.mensagemErro}>{erro}</Text>
              ) : null}
            </View>

            <View style={styles.containerBotoes}>
              <Pressable
                onPress={() => navigation.navigate("cadastroFoto")}
                style={styles.btnVoltar}
              >
                <Text style={styles.setaVoltar}>{"<"}</Text>
              </Pressable>

              <Pressable
                onPress={enviar}
                disabled={!aceitoTermos || carregando}
                style={[
                  styles.btnProximo,
                  (!aceitoTermos || carregando) && styles.botaoDesativado,
                ]}
              >
                <Text style={styles.textoProximo}>
                  {carregando ? "Cadastrando..." : "Cadastrar"}
                </Text>
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