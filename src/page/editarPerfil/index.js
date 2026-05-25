import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  Modal
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

import styles from "./styles";

export default function EditarPerfil({ navigation }) {

  const { user, updateUser } = useAuth();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");

  useEffect(() => {
    if (user) {
      setNome(user.nome || "");
      setEmail(user.email || "");
      setTelefone(user.telefone || "");
    }
  }, [user]);

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

            </View>

          </View>

        </ScrollView>

      </View>

    </KeyboardAvoidingView>
  );
}