import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";
import NavBar from "../../components/NavBar";
import ModalApp from "../../components/modalApp";
import { useAuth } from "../../context/AuthContext";

import { useNavigation } from "@react-navigation/native";

export default function Pagamento({ route }) {
  const navigation = useNavigation();

  const { id } = route.params ?? {};

  const { verPsicologo } = useAuth();

  const [modal, setModal] = useState(false);
 
  const [userPerfil, setUserPerfil] = useState(null)
  const [psicologo, setPsicologo] = useState(null)
  const [loading, setLoading] = useState(true);
 
  // ─── Dados estáticos para desenvolvimento ───────────────────────────────────
  // TODO: Remover os dados abaixo e usar os vindos de route.params
    useEffect(() => {
        async function fetchPsicologo() {
        try {
            const response = await verPsicologo(id);
            console.log(response);
            setUserPerfil(response.user);
            setPsicologo(response.psicologo);

        } catch (error) {
            console.log("Erro ao buscar psicólogo", error);
        } finally {
            setLoading(false);
        }
        }

        fetchPsicologo();
    }, [id]); // importante

  // ────────────────────────────────────────────────────────────────────────────
 
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >        
        {/* CARD RESUMO */}
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Resumo da Sessão</Text>

            <View style={styles.fotoContainer}>
                <View style={styles.fotoPerfil}>
                    {userPerfil?.foto_perfil ? (
                    <Image
                        source={{ uri: `http://localhost:8000/storage/${userPerfil.foto_perfil}` }}
                        style={styles.imagem}
                        resizeMode="cover"
                    />
                    ) : (
                    <Ionicons
                        name="person-outline"
                        size={120}
                        color="white"
                        style={styles.fotoPerfil2}
                    />
                    )}
                </View>
            </View>
 
          {/* Psicólogo */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Psicólogo</Text>
            <Text style={styles.infoValor}>Luiz</Text>
            <Text style={styles.infoEspecialidade}>Sobre mim</Text>
          </View>
 
          {/* Data */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Data</Text>
            <Text style={styles.infoValor}>data</Text>
          </View>
 
          {/* Horário */}
          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>Horário</Text>
            <Text style={styles.infoValor}>data</Text>
          </View>
 
          {/* Valor */}
          <View style={styles.valorRow}>
            <Text style={styles.valorLabel}>Valor da Consulta</Text>
            <Text style={styles.valorPreco}>R$10000</Text>
          </View>
        </View>
      </ScrollView>
 
      {/* BOTÕES FIXOS NA BASE */}
      <View style={styles.footer}>
        <Pressable
          style={[styles.botaoSolicitar, agendando && { opacity: 0.7 }]}
          onPress={() => {setModal(true)}}
          disabled={agendando}
        >
          {agendando ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.botaoSolicitarTexto}>Solicitar Agendamento</Text>
          )}
        </Pressable>
 
        <Pressable style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
          <Text style={styles.botaoVoltarTexto}>Voltar</Text>
        </Pressable>
      </View>



      <NavBar tela="pesquisa" />
    </View>
  );
}