import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal
} from "react-native";

import { useAuth } from "../../context/AuthContext"
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import NavBar from "../../components/NavBar";

export default function VisualizarPsi({ navigation }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const user = {
    nome: "Dr. João Silva",
    username: "joaopsi",
    avaliacao: 4.9,
    totalAvaliacoes: 267,
    tempoExperiencia: "5 anos",
    pacientes: "+300 pacientes atendidos",
    sobre: "Psicólogo dedicado ao cuidado da saúde mental, com foco no acolhimento, escuta ativa e desenvolvimento pessoal.",
    especialidades: "Ansiedade, Autoestima, Relacionamentos",
    abordagem: "Terapia Cognitivo-Comportamental, Abordagem Humanista",
    atende: "Adultos, Adolescentes",
    formacao: "Psicologia - USP",
    crp: "06/12345",
    experiencia: "5 anos atendendo pacientes com foco em terapia cognitivo-comportamental e abordagem humanista.",
    valor: "R$ 80,00 por sessão"
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

          {/* TOPO */}
          <View style={styles.topo}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={26} color="#000" />
            </Pressable>

            <Pressable onPress={() => setMenuAberto(true)}>
              <Ionicons name="ellipsis-vertical" size={26} color="#000" />
            </Pressable>
          </View>

          <View style={styles.header} />

          {/* CARD DO PSICÓLOGO */}
          <View style={styles.card}>
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

            <Text style={styles.nomePessoa}>{user.nome}</Text>
            <Text style={styles.nickname}>@{user.username}</Text>

            <View style={styles.infoContainer}>
              <View style={styles.estrelas}>
                {[1,2,3,4,5].map((item) => (
                  <Ionicons key={item} name="star" size={16} color="#FFD700" />
                ))}
              </View>

              <Text style={styles.textoAvaliacao}>
                {user.avaliacao} 
                <Text style={{ color: "#6C63FF" }}> ({user.totalAvaliacoes} avaliações)</Text>
              </Text>

              <View style={styles.linhaInfo}>
                <Ionicons name="school-outline" size={18} color="#6C63FF" />
                <Text style={styles.textoInfo}>{user.tempoExperiencia} de experiência</Text>
              </View>

              <View style={styles.linhaInfo}>
                <Ionicons name="people-outline" size={18} color="#6C63FF" />
                <Text style={styles.textoInfo}>{user.pacientes}</Text>
              </View>
            </View>

            {/* INFORMAÇÕES */}
            <View style={styles.container2}>
              <Text style={styles.tituloCard}>Informações</Text>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Sobre</Text>
                <Text style={styles.texto}>{user.sobre}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Especialidades</Text>
                <Text style={styles.texto}>{user.especialidades}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Abordagem</Text>
                <Text style={styles.texto}>{user.abordagem}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Atende</Text>
                <Text style={styles.texto}>{user.atende}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Formação</Text>
                <Text style={styles.texto}>{user.formacao}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>CRP</Text>
                <Text style={styles.texto}>{user.crp}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Experiência</Text>
                <Text style={styles.texto}>{user.experiencia}</Text>
              </View>

              <View style={styles.rowWrap}>
                <Text style={styles.label}>Valor</Text>
                <Text style={styles.texto}>{user.valor}</Text>
              </View>

            </View>

          </View>
        </ScrollView>

        <NavBar tela="visualizarPsi" />

        {/* MODAL ESTILO INSTAGRAM */}
        <Modal
          visible={menuAberto}
          transparent={true}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setMenuAberto(false)}
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
          </Pressable>
        </Modal>

        {/* MODAL AGENDAR CONSULTA CENTRALIZADO */}
        <Modal visible={modalAgendar} transparent animationType="fade">
          <View style={styles.modalOverlayCenter}>
            <View style={styles.modalBoxCenter}>
              <Text style={styles.modalTitulo}>Escolha dia e horário</Text>

              <Text>Dias:</Text>
              <View style={styles.linhaChips}>
                {dias.map((dia) => (
                  <Pressable
                    key={dia}
                    style={[
                      styles.chip,
                      diaSelecionado === dia && { backgroundColor: "#8E7CFF" },
                    ]}
                    onPress={() => setDiaSelecionado(dia)}
                  >
                    <Text
                      style={[
                        styles.chipTexto,
                        diaSelecionado === dia && { color: "#fff" },
                      ]}
                    >
                      {dia}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Text style={{ marginTop: 10 }}>Horários:</Text>
              <View style={styles.linhaChips}>
                {horarios.map((hora) => (
                  <Pressable
                    key={hora}
                    style={[
                      styles.chip,
                      horaSelecionada === hora && { backgroundColor: "#8E7CFF" },
                    ]}
                    onPress={() => setHoraSelecionada(hora)}
                  >
                    <Text
                      style={[
                        styles.chipTexto,
                        horaSelecionada === hora && { color: "#fff" },
                      ]}
                    >
                      {hora}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View style={styles.modalButtons}>
                <Pressable
                  style={styles.btnCancelar}
                  onPress={() => setModalAgendar(false)}
                >
                  <Text style={styles.btnTextoCancelar}>Cancelar</Text>
                </Pressable>

                <Pressable
                  style={styles.btnConfirmar}
                  onPress={agendarConsulta}
                >
                  <Text style={styles.btnTextoConfirmar}>Confirmar</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
}