import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  Modal
} from "react-native";

import { MaskedTextInput } from "react-native-mask-text";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";

import { useAuth } from "../../context/AuthContext";

export default function Perfil({ navigation }) {
  
  const route = useRoute

  const { user, signOut} = useAuth();
  const [foto, setFoto] = useState("https://i.pravatar.cc/150");
  const [nome, setNome] = useState("Junior");
  const [sobrenome, setSobrenome] = useState("Silva");
  const [nickname, setNickname] = useState("junior_silva");
  const [genero, setGenero] = useState("masculino");
  const [email, setEmail] = useState("juninhosilva190@gmail.com");
  const [senha, setSenha] = useState("123456");
  const [telefone, setTelefone] = useState("(11) 99999-9999");
  const [cpf, setCpf] = useState("00000000000");
  const [dataNascimento, setDataNascimento] = useState("09/02/2005");
  const [editando, setEditando] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  

  const convDataBR = (dataIso) => {
    // Exemplo: "2023-12-25" -> "25/12/2023"
    if (!dataIso) return '';
    
    const [ano, mes, dia] = dataIso.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const formatarCpf = (numero) => {
    // Remove tudo que não é número
    const cpf = numero.replace(/\D/g, '');
    
    // Aplica máscara: 000.000.000-00
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };


  function formatarData(text) {
    return text
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 10);
  }

  const capitalize = (str) => { // Não apague, usada para o Gênero
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
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
        >

        <View style={styles.header} />

          <View style={styles.topo}>
            <Pressable onPress={() => setMenuAberto(true)}>
            <Ionicons name="ellipsis-vertical" size={26} color="#000" />
            </Pressable>
          </View>

          <View style={styles.card}>
            <View style={styles.fotoContainer}>
              <Image
                source={{ uri: foto }}
                style={styles.fotoPerfil}
              />

              {editando && (
                <View style={styles.iconeEditar}>
                  <Ionicons name="camera" size={16} color="#fff" />
                </View>
              )}

            </View>

            <View>
              <Text style={styles.nomePessoa}>{user?.nome}</Text>
            </View>

            <View>
              <Text style={styles.nickname}>@{user?.username}</Text>
            </View>

            <View style={styles.botaoEditar}>
            <Pressable onPress={() => navigation.navigate("editarPerfil")}>
                  <Text style={{ color: "#000000", fontWeight: "bold" }}>
                    {editando ? "Salvar" : "Editar Perfil"}
                  </Text>
                </Pressable>
              </View> 





            <View style={styles.container2}>
              {/* TÍTULO E BOTAO TESTE DE EDITAR*/}
              <View>
                <Text style={styles.tituloCard}>Suas informações</Text>
              </View>

              {/* NOME E SOBRENOME */}
              <View style={styles.rowWrap}>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Nome</Text>
                  <Text style={styles.dados}>{user?.nome}</Text>
                </View>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Nickname</Text>

                  <View style={[
                    styles.nicknameContainer,
                    editando && styles.nicknameEditando
                  ]}>

                    <Text style={styles.arroba}>@</Text>

                    <Text style={[styles.dados, {textAlign: "left"}]}>{user?.username}</Text>

                  </View>
                </View>
              </View>


              {/* EMAIL E GÊNERO */}
              <View style={styles.rowWrap}>

                <View>
                {/* EMAIL */}
                  <Text style={styles.label}>Email</Text>

                  <Text style={styles.dadoEmail}>{user?.email}</Text>
                </View>


                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Gênero</Text>

                  <View>
                    <Text style={styles.dados}>{capitalize(user?.genero)}</Text>
                  </View>
                </View>

              </View>

              


              {/* SENHA E TELEFONE */}
              <View style={[styles.rowWrap, {marginTop: -15}]}>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Senha</Text>

                  <TextInput // ! Uso temporário desse método
                    onChangeText={setSenha}
                    value={senha}
                    style={[
                      styles.input,
                      editando && styles.inputEditando, {textAlign: "center"}
                    ]}
                    secureTextEntry
                    editable={editando}
                  />
                </View>


                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Telefone</Text>

                  <Text style={[styles.dados, {fontSize: 15}]}>{user?.telefone}</Text>
                </View>

              </View>


              {/* CPF E DATA */}
              <View style={[styles.rowWrap, {marginBottom: 15}]}>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>CPF</Text>

                  <Text style={[styles.dados, {textAlign: "center"}]}>{formatarCpf(user?.cpf)}</Text>
                </View>


                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Data de Nascimento</Text>

                  <Text style={[styles.dados, {textAlign: "center"}]}>{convDataBR(user?.data_nascimento)}</Text>
                </View>

              </View>

            </View>
          </View>

        </ScrollView>


        {/* BOTTOM NAV */}
        <View style={styles.bottomNav}>

        <Pressable onPress={() => navigation.navigate('menu')}>
          <Ionicons
            name="home"
            size={24}
            color={route.name === "Home" ? "#6C63FF" : "#999"}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Curtidas")}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={route.name === "Curtidas" ? "#6C63FF" : "#999"}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate("Chat")}>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={route.name === "Chat" ? "#6C63FF" : "#999"}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('perfil')}>
          <Ionicons
            name="person-outline"
            size={24}
            color={route.name === "Perfil" ? "#6C63FF" : "#999"}
          />
        </Pressable>

      </View>
          <Modal
            visible={menuAberto}
            animationType="slide"
            transparent={false}
          >
            <View style={styles.modalContainer}>

              <Pressable
                style={styles.fecharModal}
                onPress={() => setMenuAberto(false)}
              >
                <Ionicons name="close" size={30} color="#000" />
              </Pressable>

              <Text style={styles.modalTitulo}>Menu</Text>
              
              <Pressable style={styles.opcao} onPress={() => signOut()}>
                <Text>Sair</Text>
              </Pressable>

            </View>
          </Modal>
      </View>

    </KeyboardAvoidingView>
  );
}