import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome } from "@expo/vector-icons";
import NavBar from "../../components/NavBar";
import { useAuth } from "../../context/AuthContext"; // ajuste o path conforme o projeto
import styles from "./styles";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function getInitials(name = "") {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────────────
// Avatar com fallback para iniciais quando a foto falha ou não existe
// ─────────────────────────────────────────────────────────────────────────────
function AvatarPsicologo({ fotoUrl, initials, style, textStyle }) {
  const [fotoError, setFotoError] = useState(false);

  if (fotoUrl && !fotoError) {
    return (
      <Image
        source={{ uri: fotoUrl }}
        style={style}
        onError={() => setFotoError(true)}
      />
    );
  }

  return (
    <View style={style}>
      <Text style={textStyle}>{initials}</Text>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────────────────────
export default function InicioChat({ navigation, route }) {
  const [searchText,   setSearchText]   = useState("");
  const [psicologos,   setPsicologos]   = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [loadingChat,  setLoadingChat]  = useState(null); // ID do psicólogo em carregamento

  const {
    FOTO,
    listarMeusPsicologosCont,
    iniciarChatCont,
    user
  } = useAuth();

  // ─── Busca a lista de psicólogos do paciente ─────────────────────────────
  const carregarPsicologos = useCallback(async () => {
    setLoading(true);
    const resultado = await listarMeusPsicologosCont();
    console.log(resultado);
    console.log(resultado.dados);
    if (resultado.sucesso) {
      setPsicologos(resultado.dados?.psicologos ?? []);
    }
    setLoading(false);
  }, [listarMeusPsicologosCont]);

  useEffect(() => {
    carregarPsicologos();
  }, []);

  // ─── Abre (ou cria) o chat com o psicólogo selecionado ───────────────────
  const handleOpenChat = async (psicologo) => {
    const idPsicologo = psicologo.psicologo?.id_psicologo;
    setLoadingChat(psicologo.id_usuario);

    const resultado = await iniciarChatCont({ id_paciente: user.id_paciente, id_psicologo: idPsicologo });

    setLoadingChat(null);

    if (!resultado.sucesso) {
      console.log("🔴 Falhou ao iniciar chat:", resultado.erro);
      Alert.alert("Erro", resultado.erro || "Não foi possível iniciar o chat.");
      return;
    }

    const chatId = resultado.dados?.chat?.id_chat;

    navigation.navigate("chat", {
      chatId,
      psicologoId: idPsicologo,
      userName:    psicologo.nome,
      userAvatar:  getInitials(psicologo.nome),
      userPhoto:   psicologo.foto_perfil ? `${FOTO}${psicologo.foto_perfil}` : null,
    });
  };
  // ─── Filtro de pesquisa ──────────────────────────────────────────────────
  const filteredPsicologos = psicologos.filter((p) =>
    p.nome.toLowerCase().includes(searchText.toLowerCase())
  );

  // ─── Item da lista ───────────────────────────────────────────────────────
  const renderConversation = ({ item }) => {
    const isLoading = loadingChat === item.id_usuario;
    const fotoUrl = item.foto_perfil ? `${FOTO}${item.foto_perfil}` : null;
    const initials   = getInitials(item.nome);
    const especialidade =
      item.especialidade ||
      item.area ||
      "Psicólogo(a)";

    return (
      <Pressable
        style={styles.conversationItem}
        onPress={() => handleOpenChat(item)}
        activeOpacity={0.7}
        disabled={isLoading}
      >
        {/* Avatar com foto real + fallback de iniciais */}
        <View style={styles.avatarContainer}>
          <AvatarPsicologo
            fotoUrl={fotoUrl}
            initials={initials}
            style={styles.avatar}
            textStyle={styles.avatarText}
          />
          {item.status_usuario === "ativo" && (
            <View style={styles.onlineIndicator} />
          )}
        </View>

        {/* Nome e especialidade */}
        <View style={styles.conversationContent}>
          <View style={styles.conversationHeader}>
            <Text style={styles.conversationName} numberOfLines={1}>
              {item.nome}
            </Text>
          </View>
          <Text style={styles.conversationMessage} numberOfLines={1}>
            {especialidade}
          </Text>
        </View>

        {/* Indicador de carregamento ou seta */}
        {isLoading ? (
          <ActivityIndicator size="small" color="#A383FB" />
        ) : (
          <Feather name="chevron-right" size={20} color="#D0D5DD" />
        )}
      </Pressable>
    );
  };

  // ─── Render ──────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Conversas</Text>
        <Pressable activeOpacity={0.7} onPress={carregarPsicologos}>
          <Feather name="refresh-cw" size={20} color="#A383FB" />
        </Pressable>
      </View>

      {/* Barra de pesquisa */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText !== "" && (
          <Pressable onPress={() => setSearchText("")} activeOpacity={0.7}>
            <Feather name="x" size={18} color="#999" />
          </Pressable>
        )}
      </View>

      {/* Loading inicial */}
      {loading ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color="#A383FB" />
        </View>
      ) : filteredPsicologos.length > 0 ? (
        <FlatList
          data={filteredPsicologos}
          renderItem={renderConversation}
          keyExtractor={(item, index) => String(item?.id_usuario ?? index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          onRefresh={carregarPsicologos}
          refreshing={loading}
        />
      ) : (
        /* Estado vazio */
        <View style={styles.emptyState}>
          <FontAwesome name="inbox" size={48} color="#D0D5DD" />
          <Text style={styles.emptyStateText}>
            {searchText
              ? "Nenhum resultado para sua pesquisa"
              : "Você ainda não tem conversas"}
          </Text>
        </View>
      )}

      <NavBar tela="chat" />
    </SafeAreaView>
  );
}