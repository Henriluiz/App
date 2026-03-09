import React, { useState } from "react";
import {Text,View,TextInput,Pressable,ScrollView,KeyboardAvoidingView,Platform,}from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaskedTextInput } from "react-native-mask-text";
import styles from "./styles";

export default function CadastroPessoal({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [genero, setGenero] = useState("");
  const [cpf, setCpf] = useState("");
  const [erro, setErro] = useState("");

  /* ================= FORMATADORES ================= */

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

  /* ================= VALIDAÇÃO ================= */

  function validarCampos() {
    if (!nomeCompleto.trim()) {
      setErro("Digite seu nome completo.");
      return false;
    }

    if (telefone.length < 14) {
      setErro("Digite um telefone válido.");
      return false;
    }

    if (dataNascimento.length !== 10) {
      setErro("Digite uma data válida.");
      return false;
    }

    if (!genero) {
      setErro("Selecione um gênero.");
      return false;
    }

    if (cpf.length !== 14) {
      setErro("Digite um CPF válido.");
      return false;
    }

    setErro("");
    return true;
  }

  function enviar() {
    if (!validarCampos()) return;
    navigation.navigate("dadoConta");
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
                      <Picker.Item label="Masculino" value="masculino" />
                      <Picker.Item label="Feminino" value="feminino" />
                      <Picker.Item label="Outro" value="outro" />
                    </Picker>
                  </View>
                </View>
              </View>

              {/* CPF */}
              <Text style={styles.label}>CPF</Text>
              <MaskedTextInput
                mask="999.999.999-99"
                value={cpf}
                onChangeText={(text) => setCpf(text)}
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

