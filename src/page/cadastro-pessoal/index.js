import React, { use, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import {Text,View,TextInput,Pressable,ScrollView,KeyboardAvoidingView,Platform,}from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaskedTextInput } from "react-native-mask-text";
import { cpf } from 'cpf-cnpj-validator';
import styles from "./styles";

import {useAuth} from "../../context/AuthContext"

export default function CadastroPessoal({ navigation, route }) {
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
    // validação antes
    if (!nickname.trim() || !numcpf.trim()) {
      return null; // erro esperado → nem chama API
    }
    try {

      const disponivel = await verificarDisponibilidade(nickname, limparCpf(numcpf));
      

      return {
        usernameDisponivel: disponivel.usernameDisponivel,
        cpfDisponivel: disponivel.cpfDisponivel,
        erro: disponivel.erro
      }

    } catch (e) {
      console.log("ERRO COMPLETO: (verUserCpf)", e);

      return null; // importante
    } 
  }

  async function validarCampos() {
    if (!nomeCompleto.trim()) {
      setErroNome("Digite seu nome completo.");
      return false;
    }
    setErroNome("");

    if (!nickname.trim()){
      setErroNick("Digite um nickname.")
      return false
    }
    setErroNick("");
    

    if (telefone.length < 14) {
      setErroFone("Digite um telefone válido.");
      return false;
    }
    setErroFone("");
    
    if (dataNascimento.length !== 10) {
      setErroData("Digite uma data válida.");
      return false;
    }
    
    const [dia, mes, ano] = dataNascimento.split("/");
    
    const hoje = new Date();

    if (ano < 1920 || ano >= hoje.getFullYear()) {
      setErroData("Data indisponível")
      return false;
    };
    
    let idade = hoje.getFullYear() - Number(ano);
    
    const aindaNaoFezAniversario =
      hoje.getMonth() + 1 < Number(mes) ||
      (
        hoje.getMonth() + 1 === Number(mes) &&
        hoje.getDate() < Number(dia)
      );
    
    if (aindaNaoFezAniversario) {
      idade--;
    }
    
    if (idade < 18) {
      setErroData("Idade não permitida.");
      return false;
    }
    
    setErroData("");

    if (!genero) {
      setErroGenero("Selecione um gênero.");
      return false;
    }
    setErroGenero("");
    
    if (numcpf.length !== 14) {
      setErroCpf("CPF deve conter 11 dígitos, Sem as pontuanções.");
      return false;
    } 
    else if (!validarCpf(numcpf)) {
      setErroCpf("Digite um CPF válido.");
      return false;
    }
    setErroCpf("");
    
    
    // Um proteção caso houve uma falha e retorne null
    const result = await verUserCpf();

    if (!result) {
      console.log("Erro ao verificar dados, possivelmente não teve dados para enviar!");
      return;
    }
    

    const { usernameDisponivel, cpfDisponivel, erro } = result;
    console.log(usernameDisponivel)
    console.log(cpfDisponivel)
    console.log(erro)
    // --

    if (!usernameDisponivel) {
      setErroNick("O nickname já é existe!")
      return false;
    }
    setErroNick("");

    if (!cpfDisponivel){
      setErroCpf("O CPF já é existe!")
      return false;
    }
    setErroCpf("");
    console.log("Passei!!")
    return true;
  }

  async function enviar() {
    const valido = await validarCampos();

    if (!valido) return;
    
    console.log("Entrei 2!!")
    navigation.navigate("cadastroFoto", {
      nome: nomeCompleto,
      nickname: nickname,
      telefone: telefone,
      dataNasc: dataNascimento,
      genero: genero,
      cpf: numcpf,
    });

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
              {erroNome ? (
                <Text style={styles.mensagemErro}>{erroNome}</Text>
              ) : null}
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
              {erroNick ? (
                <Text style={styles.mensagemErro}>{erroNick}</Text>
              ) : null}
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
              {erroFone ? (
                <Text style={styles.mensagemErro}>{erroFone}</Text>
              ) : null}

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
                  {erroData ? (
                    <Text style={styles.mensagemErro}>{erroData}</Text>
                  ) : null}
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
                  {errogenero ? (
                    <Text style={styles.mensagemErro}>{errogenero}</Text>
                  ) : null}
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
              {erroCpf ? (
                <Text style={styles.mensagemErro}>{erroCpf}</Text>
              ) : null}
            </View>

            {/* BOTÕES */}
            <View style={styles.containerBotoes}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [
                  styles.btnVoltar,
                  {
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}
              >
                <Text style={styles.setaVoltar}>{"<"}</Text>
              </Pressable>

              <Pressable onPress={enviar} style={({ pressed }) => [
                  styles.btnProximo,
                  {
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.95 : 1 }],
                  },
                ]}>
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

