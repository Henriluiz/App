import React, { useState } from "react";
import {Text,View,TextInput,Pressable,ScrollView,KeyboardAvoidingView,Platform,} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { cadastroPaciente } from "../../services/authService";


export default function CadastroConta({ route }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [aceitoTermos, setAceitoTermos] = useState(false);

  const {nome, nickname, telefone, dataNasc, genero, cpf} = route.params;

  const navigation = useNavigation();
  /* =========================
     VALIDAÇÃO EMAIL
  ========================== */
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
    // Exemplo: "25/12/2023" -> "2023-12-25"
    const partes = dataBr.split('/');
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
  };

  const limparCpf = (cpf) => {
    // Remove tudo que não for número
    return cpf.replace(/\D/g, '');
  };

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

  const enviar = async () => {
    if(!validarCampos()) {
      return false;
    }
    try {
        const data = {
          nome,
          username: nickname, // A API espera 'username', não 'nickname'
          email,
          telefone,
          genero,
          senha,               // A API espera 'senha'
          data: convData(dataNasc),       // A API espera 'data', não 'dataNasc'
          cpf: limparCpf(cpf),
          termos: aceitoTermos ? true : false // Converte boolean para 0/1 se necessário
        };
        console.log("📤 Dados enviados:", JSON.stringify(data, null, 2));
        const response = await cadastroPaciente(data);

        console.log("Usuário criado:", response);

        // alert("Cadastro realizado com sucesso");

        navigation.navigate("cadastroFin");

    } catch (error) {
        console.log(error);
        console.log("ERRO COMPLETO: ", error.response?.data)
        alert("Erro ao cadastrar");
    }

  };

  // Validação!

  function validarCampos() {
    if (!email || !senha || !confirmarSenha) {
      setErro("Preencha todos os campos.");
      return;
    }

    if (!regexEmail.test(email)) {
      setErro("Digite um email válido.");
      return;
    }

    if (senha.length < 8) {
      setErro("A senha deve ter pelo menos 8 caracteres.");
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
    return true
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
              ESTAMOS FELIZ POR VOCÊ ESTAR CONOSCO{" "}
              <Text style={styles.destaque}>AQUI!</Text>
            </Text>

            <Text style={styles.descricao}>
              Sua jornada de saúde mental começa agora.
            </Text>
          </View>

          {/* CARD */}
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
                  erro && erro.toLowerCase().includes("email")
                    ? styles.inputErro
                    : null,
                ]}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite seu email"
              />

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
                <Text style={styles.textoProximo}>Cadastrar</Text>

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