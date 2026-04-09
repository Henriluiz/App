import React, { useEffect, useState } from "react";
import {
  Text, View, ScrollView, KeyboardAvoidingView,
  Platform, Pressable, Modal, ActivityIndicator
} from "react-native";

import { useAuth } from "../../context/AuthContext"
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import * as Animatable from 'react-native-animatable';

export default function VisualizarPsi({ navigation }) {

  const { user } = useAuth();

  const [menuAberto, setMenuAberto] = useState(false);
  const [userPerfil, setUserPerfil] = useState(null)
  const [psicologo, setPsicologo] = useState(null)
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(23)

  const {verPsicologo} = useAuth();
  

  useEffect(() => {
    async function fetchPsicologo() {
      try {
        const response = await verPsicologo(id);
        setUserPerfil(response.data.user);
        setPsicologo(response.data.psicologo);

      } catch (error) {
        console.log("Erro ao buscar psicólogo", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPsicologo();
  }, [id]); // importante

  if (loading) return <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <ActivityIndicator size="large" color="#2E7D32" /></View>;
  if (!userPerfil) return <Text>Erro ao carregar dados</Text>;


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          {/* TOPO */}
          <View style={styles.topo}>
            <Pressable onPress={() => navigation.navigate("menu")}>
              <Ionicons name="arrow-back" size={26} color="#000" />
            </Pressable>

            <Pressable onPress={() => setMenuAberto(true)}>
              <Ionicons name="ellipsis-vertical" size={26} color="#000" />
            </Pressable>
          </View>

          <View style={styles.header} />

          <View style={styles.card}>

            {/* FOTO */}
            <View style={styles.fotoContainer}>
              <View style={styles.fotoPerfil}>
                <Ionicons
                  name="person-outline"
                  size={50}
                  color="white"
                  style={styles.fotoPerfil2}
                />
              </View>
            </View>

            <Text style={styles.nomePessoa}>{userPerfil
            .nome}</Text>
            <Text style={styles.nickname}>@{userPerfil.username}</Text>

            <View style={styles.infoContainer}>

              {/* ⭐ ESTRELAS */}
              <View style={styles.estrelas}>
                {[1,2,3,4,5].map((item) => (
                  <Ionicons key={item} name="star" size={16} color="#FFD700" />
                ))}
              </View>

              {/* <Text style={styles.textoAvaliacao}>
                {userPerfil.avaliacao} 
                <Text style={{ color: "#6C63FF" }}>
                  {" "}({userPerfil.totalAvaliacoes} avaliações)
                </Text>
              </Text> */}

              {/* 🧠 EXPERIÊNCIA
              <View style={styles.linhaInfo}>
                <Ionicons name="school-outline" size={18} color="#6C63FF" />
                <Text style={styles.textoInfo}>{userPerfil.tempoExperiencia} de experiência</Text>
              </View> */}

              {/* 👥 PACIENTES
              <View style={styles.linhaInfo}>
                <Ionicons name="people-outline" size={18} color="#6C63FF" />
                <Text style={styles.textoInfo}>{userPerfil.pacientes}</Text>
              </View> */}

            </View>

            <View style={styles.container2}>
              <Text style={styles.tituloCard}>Informações</Text>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Sobre</Text>
                <Text style={styles.texto}>{psicologo.biografia}</Text>
              </View>

              {/* <View style={styles.rowWrap}>
                <Text style={styles.label}>Especialidades</Text>
                <Text style={styles.texto}>{userPerfil.especialidades}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Abordagem</Text>
                <Text style={styles.texto}>{userPerfil.abordagem}</Text>
              </View> */}

              {/* <View style={styles.rowWrap}>
                <Text style={styles.label}>Atende</Text>
                <Text style={styles.texto}>{userPerfil.atende}</Text>
              </View> */}

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Formação</Text>
                <Text style={styles.texto}>{psicologo.grau_formacao}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>CRP</Text>
                <Text style={styles.texto}>{psicologo.crp}</Text>
              </View>

              {/* <View style={styles.rowWrap}>
                <Text style={styles.label}>Experiência</Text>
                <Text style={styles.texto}>{userPerfil.experiencia}</Text>
              </View> */}

              {/* <View style={styles.rowWrap}>
                <Text style={styles.label}>Valor</Text>
                <Text style={styles.texto}>{psicologo.preco_sessao}</Text>
              </View> */}

            </View>
          </View>

        </ScrollView>

        {/* <NavBar tela="visualizarPsi" /> */}

        {/* MODAL ESTILO INSTAGRAM */}
        <Modal
          visible={menuAberto}
          transparent={true}
        >
          <View style={styles.modalOverlay}>
            <Animatable.View animation={"fadeInUp"} duration={800} style={{flex: 1, justifyContent: "flex-end"}}
            >
              <View style={styles.bottomSheet}>

                <View style={styles.handle} />

                <Text style={styles.modalTitulo}>Opções</Text>

                <Pressable style={styles.opcao}>
                  <Text style={styles.textoOpcao}>Ver avaliações</Text>
                </Pressable>

                <Pressable style={styles.opcao}>
                  <Text style={styles.textoOpcao}>Agendar consulta</Text>
                </Pressable>

                <Pressable
                  style={[styles.opcao, { marginTop: 10 }]}
                  onPress={() => setMenuAberto(false)}
                >
                  <Text style={[styles.textoOpcao, { color: "red" }]}>
                    Cancelar
                  </Text>
                </Pressable>

              </View>
            </Animatable.View>
          </View>
        </Modal>

      </View>
    </KeyboardAvoidingView>
  );
}