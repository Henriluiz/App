import React, { useState, useEffect} from "react";
import { BASE_URL } from "../../services/api";
import {
  Text,View, TextInput, ScrollView, KeyboardAvoidingView,
  Platform, Pressable, Image, Modal, ActivityIndicator,
  Alert
} from "react-native";

import { MaskedTextInput } from "react-native-mask-text";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";
import styles from "./styles";
import { useAuth } from "../../context/AuthContext";
import { clearSession, saveSession, getToken } from "../../services/authStogare";

import { SafeAreaView } from 'react-native-safe-area-context';

import NavBar from "../../components/NavBar";

export default function Perfil({ navigation }) {
  
  const route = useRoute
  const [foto, setFoto] = useState(null);
  const [nome, setNome] = useState("");
  const [nickname, setNickname] = useState("");
  const [genero, setGenero] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  
  // Status
  const [editando, setEditando] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [modalDel, setModalDel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(false);


  const { user, removeAccount, signOut, updateUser, BASE_URL} = useAuth();

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

  function formatarData(dataISO) {
    if (!dataISO) return "";
    
    // Se for uma data ISO completa (YYYY-MM-DDTHH:mm:ss.sssZ)
    const data = new Date(dataISO);
    
    if (isNaN(data.getTime())) return ""; // Data inválida
    
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa em 0
    const ano = data.getFullYear();
    
    return `${dia}/${mes}/${ano}`;
  }

  const capitalize = (str) => {
    // Verifica se str existe e é uma string
    if (!str || typeof str !== 'string') return '';
    
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatCPF = (cpf) => {
    if (!cpf) return ''; // Retorna vazio se o CPF for falsy

    // Remove tudo que não for dígito
    const numericCPF = cpf.replace(/\D/g, '');

    // Aplica a máscara: XXX.XXX.XXX-XX
    return numericCPF
      .slice(0, 11) // Limita a 11 caracteres
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona o traço
  };

  const handleDelete = async () => {
    setLoading(true);
    if (confirmText.toUpperCase() == "DELETAR") {
      
      try {
        // Chama a função de deleção (pode ser uma API)
        await removeAccount();
        
        // Se a deleção for bem sucedida, faz logout
        await clearSession();
        
        Alert.alert('Sucesso', 'Conta deletada com sucesso');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível deletar a conta. Tente novamente.');
        console.log(error);
        setLoading(false)
      } 
    }
    else {
      setErro(true)
    }
    setLoading(false)
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const userNv = await updateUser({
        nome,
        email,
        telefone,
      });
      console.log("Update terminado")

      // // Filtra apenas os campos que foram alterados
      // const changedData = Object.keys(userNv).reduce((acc, key) => {
      //   if (userNv[key] !== user[key]) {
      //     acc[key] = userNv[key];
      //   }
      //   return acc;
      // }, {});

      // // Se houver mudanças, envia para a API
      // if (Object.keys(changedData).length > 0) {
      //   const updatedUser = await updateUser(changedData); // ← Envia só o que mudou
      //   setCurrentUserData(updatedUser); // Atualiza o estado com a resposta
      // }

      setEditando(false);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setNome(capitalize(user.nome) || "");
      setNickname(user.username || "");
      setEmail(user.email || "");
      setTelefone(user.telefone || "");
      setGenero(user.genero || "");
      setSenha(user.senha || "123456"); // Não deixa a senha aqui
      setCpf(user.cpf || "");
      setDataNascimento(user.data_nascimento || "");
    }
  }, [user]);

  console.log("FOTO:", user?.foto_perfil)
console.log("URL FINAL:", `${BASE_URL}${user?.foto_perfil}`)

  return (
    <SafeAreaView
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
            <View style={styles.fotoPerfil}>
              {user?.foto_perfil ? (
                <Image
                  source={{ uri: `http://localhost:8000/storage/${user.foto_perfil}` }}
                  style={styles.imagem} // mesmo estilo que usou no CadastroFoto
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="person-outline" size={50} color="white" style={styles.fotoPerfil2} />
              )}
            </View>

            {editando && (
              <View style={styles.iconeEditar}>
                <Ionicons name="camera" size={16} color="#fff" />
              </View>
            )}
          </View>

            <View>
              <Text style={styles.nomePessoa}>{user.nome}</Text>
            </View>

            <View>
              <Text style={styles.nickname}>@{user.username}</Text>
            </View>

            {editando ? <View style={styles.botaoEditar}>
              <Pressable onPress={editando ? handleSave : () => setEditando(true)}>
                <Text style={{ color: "#000000", fontWeight: "bold" }}>
                  Salvar
                </Text>
              </Pressable>
            </View> : <View></View> }

            <View style={styles.container2}>
              {/* TÍTULO E BOTAO TESTE DE EDITAR*/}
              <Text style={styles.tituloCard}>Suas informações</Text>
              {/* NOME E SOBRENOME */}
              <View style={styles.rowWrap}>
                

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Nome</Text>

                  {editando ? (
                    <TextInput
                      style={[
                        styles.input,
                        editando && styles.inputEditando
                      ]}
                      value={nome}
                      onChangeText={(text) => setNome(text)}              // sem capitalize
                      onBlur={() => setNome(capitalize(nome))}  
                      editable={editando}
                    />
                  ) : (
                    <View style={styles.fieldValue}>
                      <Text style={styles.fieldValueText}>{nome}</Text>
                    </View>
                  )}
                </View>
                  
                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Nome de Usuário</Text>

                  <View style={styles.nicknameContainer}>
                    <Text style={styles.arroba}>@</Text>
                    <Text style={styles.fieldValueText}>{user.username}</Text>
                  </View>
                </View>

              </View>


              {/* NICKNAME E GÊNERO */}
              <View style={styles.rowWrap}>

                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>CPF</Text>

                  <View style={styles.fieldValue}>
                    <Text style={styles.fieldValueText}>{formatCPF(user.cpf)}</Text>
                  </View>
                </View>


                <View style={styles.colunaFlex}>
                  <Text style={styles.label}>Gênero</Text>

                  <View style={styles.fieldValue}>
                    <Text style={styles.fieldValueText}>{capitalize(user.genero)}</Text>
                  </View>
                </View>

              </View>


              


              {/* EMAIL */}
              <View style={styles.colunaFlex}>
                <Text style={styles.label}>Email</Text>

                <TextInput
                  onChangeText={setEmail}
                  value={email}
                  style={[
                    styles.input,
                    editando && styles.inputEditando
                  ]}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={editando}
                />
              </View>

              {/* TELEFONE E DATA */}
              <View style={styles.rowWrap}>
                <View style={styles.colunaEsquerda}>
                  <Text style={styles.label}>Telefone</Text>

                  {editando ? (
                    <TextInput
                      style={[
                        styles.input,
                        editando && styles.inputEditando
                      ]}
                      keyboardType="phone-pad"
                      value={formatarTelefone(telefone)}
                      editable={editando}
                      onChangeText={(text) =>
                        setTelefone(formatarTelefone(text))
                      }
                    />
                  ) : (
                    <View style={styles.fieldValue}>
                      <Text style={styles.fieldValueText}>{formatarTelefone(telefone)}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.colunaDireita}>
                  <Text style={styles.label}>Data de Nascimento</Text>

                  {editando ? (
                    <TextInput
                      style={[
                        styles.input,
                        editando && styles.inputEditando
                      ]}
                      keyboardType="numeric"
                      maxLength={10}
                      editable={editando}
                      value={formatarData(dataNascimento)}
                      onChangeText={(text) =>
                        setDataNascimento(formatarData(text))
                      }
                    />
                  ) : (
                    <View style={styles.fieldValue}>
                      <Text style={styles.fieldValueText}>{formatarData(dataNascimento)}</Text>
                    </View>
                  )}
                </View>
              </View>

            </View>
          </View>

        </ScrollView>


        {/* BOTTOM NAV */}
        <NavBar 
          tela = "perfil"
        />


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

            <Text style={styles.modalTitulo}>Opções do perfil</Text>
            <Text style={styles.modalSubtitulo}>Aqui você pode editar seus dados ou sair da conta.</Text>

            <Pressable
              style={styles.opcao}
              onPress={() => {
                setMenuAberto(false);
                navigation.navigate('editarPerfil');
              }}
            >
              <View style={styles.opcaoConteudo}>
                <Ionicons name="create-outline" size={24} color="#6C63FF" />
                <View style={styles.opcaoTextoContainer}>
                  <Text style={styles.opcaoTexto}>Editar Perfil</Text>
                  <Text style={styles.opcaoLegenda}>Atualize seus dados pessoais</Text>
                </View>
              </View>
            </Pressable>

            <Pressable style={[styles.opcao, styles.opcaoSaida]} onPress={() => signOut()}>
              <View style={styles.opcaoConteudo}>
                <Ionicons name="log-out-outline" size={24} color="#FF4B4B" />
                <View style={styles.opcaoTextoContainer}>
                  <Text style={[styles.opcaoTexto, styles.textoBotao]}>Sair</Text>
                  <Text style={styles.opcaoLegenda}>Finalizar sessão atual</Text>
                </View>
              </View>
            </Pressable>

            <Pressable style={styles.botaoExcluir} onPress={() => setModalDel(true)}>
              <Text style={styles.textoExcluir}>Excluir conta</Text>
            </Pressable>

          </View>
        </Modal>

        
        <Modal transparent={true} visible={modalDel} animationType='fade' style={{backgroundColor:"rgba (0,0,0,0.5)"}}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer2}>
            {/* Ícone de aviso */}
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>⚠️</Text>
              </View>

              {/* Título */}
              <Text style={styles.title}>Deletar Conta</Text>

              {/* Mensagem de aviso */}
              <Text style={styles.warningText}>
                Tem certeza que deseja deletar sua conta?
              </Text>

              {/* Informação do usuário (opcional) */}
              {user?.email && (
                <Text style={styles.userInfo}>
                  {user.email}
                </Text>
              )}

              <View style={styles.confirmContainer}>
                <Text style={styles.confirmText}>
                    Digite <Text style={styles.boldText}>DELETAR</Text> para confirmar
                  </Text>
                  <TextInput
                    style={styles.confirmInput}
                    placeholder="DELETAR"
                    value={confirmText}
                    onChangeText={setConfirmText}
                  />

                  { erro ? <Text>Digite corretamente!</Text> : <Text></Text>}
              </View>

              <View style={styles.buttonContainer}>
                <Pressable
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => [setModalDel(false),  setConfirmText("")]}
                  disabled={loading}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.deleteButton]}
                  onPress={() => handleDelete()}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.deleteButtonText}>Sim, deletar</Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>

    </SafeAreaView>
  );
}