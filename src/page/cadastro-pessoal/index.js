import React, { use, useState } from "react";
import {Text,View,TextInput,Pressable,ScrollView,KeyboardAvoidingView,Platform,}from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaskedTextInput } from "react-native-mask-text";
import { cpf } from 'cpf-cnpj-validator';
import styles from "./styles";

import {useAuth} from "../../context/AuthContext"

export default function CadastroPessoal({ navigation }) {
  const { verificarDisponibilidade } = useAuth()

  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [numcpf, setNumCpf] = useState("");
  const [erro, setErro] = useState("");
  const [nickname, setNickname] = useState("");

  // Um erro diferente para cada, para se exibido em baixo de seus inputs correspondente
  const [erroNome, setErroNome] = useState("");
  const [erroNick, setErroNick] = useState("");
  const [erroFone, setErroFone] = useState("");
  const [erroData, setErroData] = useState("");
  const [errogenero, setErroGenero] = useState("");
  const [erroCpf, setErroCpf] = useState("");

  /* ================= FORMATADORES ================= */

  const validarCpf = (numeroCpf) => {
    // Retorna true se for válido, false se não
    return cpf.isValid(numeroCpf);
  };

  const limparCpf = (cpf) => {
    // Remove tudo que não for número
    return cpf.replace(/\D/g, '');
  };

  function formatarTelefone(text) {
    const numeros = text.replace(/\D/g, "");

    if (numeros.length <= 2) return `(${numeros}`;
    if (numeros.length <= 7)
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    return `(${numeros.slice(0, 2)}) ${numeros.slice(
      2,
      7
    )}-${numeros.slice(7, 11)}`;
  }

  function formatarData(text) {
    const numeros = text.replace(/\D/g, "");

    if (numeros.length <= 2) return numeros;
    if (numeros.length <= 4)
      return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    return `${numeros.slice(0, 2)}/${numeros.slice(
      2,
      4
    )}/${numeros.slice(4, 8)}`;
  }
  
  function formatarNickname(text) {
    return text.toLowerCase().replace(/\s/g, "").replace(/[^a-z0-9_]/g, "");
  }

  /* ================= VALIDAÇÃO ================= */

  async function verUserCpf() { // Verificar se nickname e cpf existem no banco (de um mesmo user ou diferentes)
    const disponivel = await verificarDisponibilidade(nickname, limparCpf(numcpf));
    
    return {
      usernameDisponivel: disponivel.usernameDisponivel,
      cpfDisponivel: disponivel.cpfDisponivel 
    }
  }

  async function validarCampos() {
    if (!nomeCompleto.trim()) {
      setErroNome("Digite seu nome completo.");
      return false;
    }

    if (telefone.length < 14) {
      setErroFone("Digite um telefone válido.");
      return false;
    }

    if (dataNascimento.length !== 10) {
      setErroData("Digite uma data válida.");
      return false;
    }

    if (!genero) {
      setErroGenero("Selecione um gênero.");
      return false;
    }

    if (numcpf.length !== 14) {
      setErroCpf("CPF deve conter 11 dígitos, Sem as pontuanções.");
      return false;
    } else if (!validarCpf(numcpf)) {
      setErroCpf("Digite um CPF válido.");
      return false;
    }

    const {usernameDisponivel, cpfDisponivel} = await verUserCpf()
    console.log(usernameDisponivel)
    console.log(cpfDisponivel)
    if(!usernameDisponivel) {
      setErroNick("O nickname já é existe!")
      return false;
    }

    if (!cpfDisponivel){
      setErroCpf("O cpf já é existe!")
      return false;
    }
    // Criar os erros diferentes lá embaixo de cada input (Luiz)
    setErro("");
    setErroNome("");
    setErroNick("");
    setErroFone("");
    setErroData("");
    setErroGenero("");
    setErroCpf("");
    return true;
  }

  function enviar() {
    if (!validarCampos()) {
      navigation.navigate("cadastroConta", {
        nome: nomeCompleto,
        nickname: nickname,
        telefone: telefone,
        dataNasc: dataNascimento,
        genero: genero,
        cpf: numcpf,
      });
    }
  }

  /* ================= RENDER ================= */

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
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.titulo1}>
              ESTAMOS FELIZES POR VOCÊ ESTAR CONOSCO{" "}
              <Text style={styles.destaque}>AQUI!</Text>
            </Text>

            <Text style={styles.descricao}>
              Sua jornada de saúde mental começa agora.
            </Text>
          </View>

          {/* CARD */}
          <View style={styles.card}>
            <Text style={styles.tituloCard}>Dados Pessoais</Text>

            <View style={styles.contInput}>
              {/* Nome */}
              <Text style={styles.label}>Nome Completo</Text>
              <TextInput
                style={styles.input}
                value={nomeCompleto}
                onChangeText={setNomeCompleto}
              />
              {/* Nickname */}
              <Text style={styles.label}>Nickname</Text>

              <View style={styles.nicknameContainer}>
                <Text style={styles.arroba}>@</Text>

              <TextInput
                style={styles.nicknameInput}
                value={nickname}
                onChangeText={(text)=> setNickname(formatarNickname(text))
                }
                autoCapitalize="none"
                maxLength={30}
              />
              </View>

              {/* Telefone */}
              <Text style={styles.label}>Telefone</Text>
              <TextInput
                style={styles.input}
                keyboardType="phone-pad"
                value={telefone}
                onChangeText={(text) =>
                  setTelefone(formatarTelefone(text))
                }
              />

              {/* Data + Gênero */}
              <View style={styles.rowWrap}>
                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Data de Nascimento</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    maxLength={10}
                    value={dataNascimento}
                    onChangeText={(text) =>
                      setDataNascimento(formatarData(text))
                    }
                  />
                </View>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Gênero</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={genero}
                      onValueChange={(itemValue) =>
                        setGenero(itemValue)
                      }
                    >
                      <Picker.Item label="Selecione" value="" />
                      <Picker.Item label="Masculino" value="MASCULINO" />
                      <Picker.Item label="Feminino" value="FEMININO" />
                      <Picker.Item label="Outro" value="OUTRO" />
                    </Picker>
                  </View>
                </View>
              </View>

              {/* CPF */}
              <Text style={styles.label}>CPF</Text>
              <MaskedTextInput
                mask="999.999.999-99"
                value={numcpf}
                onChangeText={(text) => setNumCpf(text)}
                keyboardType="numeric"
                style={styles.input}
              />

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

              <Pressable onPress={enviar} style={styles.btnProximo}>
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

