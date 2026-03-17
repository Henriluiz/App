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

export default function Perfil({ navigation }) {
  
  const route = useRoute
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
  

  function formatarNickname(text) {
    return text
      .toLowerCase()
      .replace(/\s/g, "")
      .replace(/[^a-z0-9_]/g, "");
  }

  function formatarTelefone(text) {
    return text
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/g, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  function formatarData(text) {
    return text
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .slice(0, 10);
  }

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
              <Text style={styles.nomePessoa}>{nome}</Text>
            </View>

            <View>
              <Text style={styles.nickname}>@{nickname}</Text>
            </View>

            <View style={styles.botaoEditar}>
            <Pressable onPress={() => setEditando(!editando)}>
                  <Text style={{ color: "#000000", fontWeight: "bold" }}>
                    {editando ? "Salvar" : "Editar Perfil"}
                  </Text>
                </Pressable>
              </View> 





            <View style={styles.container2}>
              {/* TÍTULO E BOTAO TESTE DE EDITAR*/}
              <View>

                <View>
                    <Pressable
                      style={styles.botaoEditar}
                      onPress={() => navigation.navigate("editarPerfil")}
                    >
                      <Text style={styles.textoBotao}>Editar Perfil</Text>
                    </Pressable>
                  </View>








                <Text style={styles.tituloCard}>Suas informações</Text>
              </View>

              {/* NOME E SOBRENOME */}
              <View style={styles.rowWrap}>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Nome</Text>

                  <TextInput
                    style={[
                      styles.input,
                      editando && styles.inputEditando
                    ]}
                    value={nome}
                    onChangeText={setNome}
                    editable={editando}
                  />
                </View>
                  
                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Nickname</Text>

                  <View style={[
                    styles.nicknameContainer,
                    editando && styles.nicknameEditando
                  ]}>

                    <Text style={styles.arroba}>@</Text>

                    <TextInput
                      style={styles.nicknameInput}
                      value={nickname}
                      editable={editando}
                      onChangeText={(text) =>
                        setNickname(formatarNickname(text))
                      }
                      autoCapitalize="none"
                      maxLength={30}
                    />

                  </View>
                </View>

              </View>


              {/* NICKNAME E GÊNERO */}
              <View style={styles.rowWrap}>

                <View>
                  {/* EMAIL */}
                  <Text style={styles.label}>Email</Text>

                  <TextInput
                    onChangeText={setEmail}
                    value={email}
                    style={[
                      styles.inputEmail,
                      editando && styles.inputEditando
                    ]}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={editando}
                  />
                </View>


                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Gênero</Text>

                  <View style={[
                    styles.pickerContainer
                  ]}>

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


              


              {/* SENHA E TELEFONE */}
              <View style={styles.rowWrap}>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Senha</Text>

                  <TextInput
                    onChangeText={setSenha}
                    value={senha}
                    style={[
                      styles.input,
                      editando && styles.inputEditando
                    ]}
                    secureTextEntry
                    editable={editando}
                  />
                </View>


                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Telefone</Text>

                  <TextInput
                    style={[
                      styles.input,
                      editando && styles.inputEditando
                    ]}
                    keyboardType="phone-pad"
                    value={telefone}
                    editable={editando}
                    onChangeText={(text) =>
                    setTelefone(formatarTelefone(text))
                    }
                  />
                </View>

              </View>


              {/* CPF E DATA */}
              <View style={styles.rowWrap}>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>CPF</Text>

                  <MaskedTextInput
                    mask="999.999.999-99"
                    value={cpf}
                    onChangeText={(text) => setCpf(text)}
                    keyboardType="numeric"
                    style={[
                      styles.input
                    ]}
                  />
                </View>


                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Data de Nascimento</Text>

                  <TextInput
                    style={[
                      styles.input
                    ]}
                    keyboardType="numeric"
                    maxLength={10}
                    value={dataNascimento}
                    onChangeText={(text) =>
                      setDataNascimento(formatarData(text))
                    }
                  />
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
            
            <Pressable style={styles.opcao}>
              <Text>Sair</Text>
            </Pressable>

          </View>
        </Modal>
      </View>

    </KeyboardAvoidingView>
  );
}