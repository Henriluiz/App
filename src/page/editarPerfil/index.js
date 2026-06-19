import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  Modal,
  Image,
  Alert,
  ActivityIndicator
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";

import styles from "./styles";

export default function EditarPerfil({ navigation }) {

  const { user, updateUser, FOTO } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [fotoCameraVisible, setFotoCameraVisible] = useState(false);
  const [carregandoFoto, setCarregandoFoto] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setEmail(user.email || "");
      setTelefone(user.telefone || "");
      if (user.foto_perfil) {
        setFotoPerfil(user.foto_perfil);
      }
    }
  }, [user]);

  const handleSelecionarFoto = async () => {
    try {
      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets[0]) {
        await enviarFoto(resultado.assets[0].uri);
      }
      setFotoCameraVisible(false);
    } catch (err) {
      console.error("Erro ao selecionar foto:", err);
      Alert.alert("Erro", "Não foi possível selecionar a foto");
    }
  };

  const handleTirarFoto = async () => {
    try {
      const permissao = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissao.granted) {
        Alert.alert("Permissão negada", "Precisamos de acesso à câmera");
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!resultado.canceled && resultado.assets[0]) {
        await enviarFoto(resultado.assets[0].uri);
      }
      setFotoCameraVisible(false);
    } catch (err) {
      console.error("Erro ao tirar foto:", err);
      Alert.alert("Erro", "Não foi possível tirar a foto");
    }
  };

  const enviarFoto = async (uri) => {
    try {
      setCarregandoFoto(true);
      const formData = new FormData();
      formData.append("foto_perfil", {
        uri,
        type: "image/jpeg",
        name: `foto_${Date.now()}.jpg`,
      });

      await updateUser(formData);
      setFotoPerfil(uri);
      Alert.alert("Sucesso", "Foto de perfil atualizada com sucesso!");
    } catch (err) {
      console.error("Erro ao enviar foto:", err);
      Alert.alert("Erro", "Não foi possível atualizar a foto");
    } finally {
      setCarregandoFoto(false);
    }
  };

  const openFieldModal = (field) => {
    setActiveField(field);
    if (field === "nome") setFieldValue(nome);
    if (field === "telefone") setFieldValue(telefone);
    if (field === "email") setFieldValue(email);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setActiveField(null);
  };

  const handleSaveField = async () => {
    try {
      const updatedData = { [activeField]: fieldValue };
      await updateUser(updatedData);

      if (activeField === "nome") setNome(fieldValue);
      if (activeField === "telefone") setTelefone(fieldValue);
      if (activeField === "email") setEmail(fieldValue);

      closeModal();
    } catch (error) {
      console.log("Erro ao salvar campo", error);
    }
  };

  const fieldLabels = {
    nome: "Nome",
    telefone: "Telefone",
    email: "Email",
  };

  const fieldPlaceholders = {
    nome: "Digite seu nome",
    telefone: "Digite seu telefone",
    email: "Digite seu email",
  };

  const formatPhonePreview = (value) => {
    if (!value) return "Não informado";
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 4) return value;
    const start = digits.slice(0, 4);
    const end = digits.slice(-4);
    return `${start}****${end}`;
  };

  const formatEmailPreview = (value) => {
    if (!value) return "Não informado";
    const parts = value.split("@");
    if (parts.length !== 2) return value;
    const [local, domain] = parts;
    if (!local) return `*@${domain}`;
    const visible = local[0];
    const masked = local.length > 1 ? "***" : "*";
    return `${visible}${masked}@${domain}`;
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

          <View style={styles.card}>

            {/* BOTÃO VOLTAR */}
            <View style={styles.containerBotoes}>
              <Pressable
                onPress={() => navigation.goBack()}
                style={({ pressed }) => [
                  styles.btnVoltar,
                  pressed && styles.btnVoltarPressed,
                ]}
                android_ripple={{ color: "#A383FB" }}
              >
                <Ionicons name="arrow-back" size={40} color="#ffffff" />
              </Pressable>
            </View>

            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                {carregandoFoto ? (
                  <ActivityIndicator size="large" color="#6A37E5" />
                ) : fotoPerfil ? (
                  <Image
                    source={{
                      uri: fotoPerfil.startsWith("http")
                        ? fotoPerfil
                        : `${FOTO}${fotoPerfil}`,
                    }}
                    style={styles.avatar}
                  />
                ) : (
                  <Ionicons name="person-outline" size={60} color="#ffffff" />
                )}
              </View>
              <Pressable
                style={styles.cameraBtnWrapper}
                onPress={() => setFotoCameraVisible(true)}
              >
                <View style={styles.cameraBtn}>
                  <Ionicons name="camera" size={18} color="#fff" />
                </View>
              </Pressable>
            </View>

            <View style={styles.container2}>

              <Text style={styles.tituloCard}>Suas informações</Text>

              <Pressable style={styles.item} onPress={() => openFieldModal("nome")}> 
                <Text style={styles.texto}>Nome</Text>
                <Text style={styles.previewText}>{nome || "Não informado"}</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <Pressable style={styles.item} onPress={() => openFieldModal("telefone")}> 
                <Text style={styles.texto}>Telefone</Text>
                <Text style={styles.previewText}>{formatPhonePreview(telefone)}</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <Pressable style={styles.item} onPress={() => openFieldModal("email")}> 
                <Text style={styles.texto}>Email</Text>
                <Text style={styles.previewText}>{formatEmailPreview(email)}</Text>
                <Ionicons name="chevron-forward" size={20} color="#999" />
              </Pressable>

              <View style={styles.botoesContainer}>

                <Pressable style={styles.botaoExcluir}>
                  <Text style={styles.textoExcluir}>Excluir conta</Text>
                </Pressable>

              </View>

              <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{fieldLabels[activeField]}</Text>
                    <TextInput
                      style={styles.input}
                      value={fieldValue}
                      onChangeText={setFieldValue}
                      placeholder={fieldPlaceholders[activeField]}
                      placeholderTextColor="#999"
                      keyboardType={activeField === "telefone" ? "phone-pad" : activeField === "email" ? "email-address" : "default"}
                      autoCapitalize={activeField === "email" ? "none" : "sentences"}
                    />

                    <View style={styles.modalActions}>
                      <Pressable style={[styles.modalButton, styles.modalCancel]} onPress={closeModal}>
                        <Text style={styles.modalButtonText}>Cancelar</Text>
                      </Pressable>
                      <Pressable style={[styles.modalButton, styles.modalSave]} onPress={handleSaveField}>
                        <Text style={[styles.modalButtonText, styles.modalSaveText]}>Salvar</Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </Modal>

              <Modal
                visible={fotoCameraVisible}
                transparent={true}
                animationType="fade"
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.fotoCameraModal}>
                    <Text style={styles.modalTitle}>Atualizar foto</Text>
                    <Pressable
                      style={styles.fotoOption}
                      onPress={handleTirarFoto}
                    >
                      <Ionicons name="camera" size={24} color="#6A37E5" />
                      <Text style={styles.fotoOptionText}>Tirar foto</Text>
                    </Pressable>
                    <Pressable
                      style={styles.fotoOption}
                      onPress={handleSelecionarFoto}
                    >
                      <Ionicons name="image" size={24} color="#6A37E5" />
                      <Text style={styles.fotoOptionText}>Galeria</Text>
                    </Pressable>
                    <Pressable
                      style={styles.fotoCancelBtn}
                      onPress={() => setFotoCameraVisible(false)}
                    >
                      <Text style={styles.fotoCancelText}>Cancelar</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>

            </View>

          </View>

        </ScrollView>

      </View>

    </KeyboardAvoidingView>
  );
}
