import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext"; // ajuste o path conforme o projeto
import styles from "./styles";
import ModalApp from "../../components/modalApp";

// ─────────────────────────────────────────
// Intervalo de polling para novas mensagens
// ─────────────────────────────────────────
const POLLING_INTERVAL_MS = 5000;

// ─────────────────────────────────────────────────────────────────────────────
// Normaliza a mensagem vinda da API para o formato interno da tela.
// ─────────────────────────────────────────────────────────────────────────────
function normalizeMessage(msg, userId) {
  const horaFormatada = msg.data_envio
    ? new Date(msg.data_envio).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return {
    id: msg.id_mensagem,
    sender: msg.id_remetente === userId ? "user" : "therapist",
    text: msg.conteudo ?? "",
    time: horaFormatada,
    created_at: msg.data_envio,
    lida: msg.status_mensagem === "lida",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente de ticks estilo WhatsApp para mensagens do usuário
// ─────────────────────────────────────────────────────────────────────────────
function MessageTicks({ sending, lida }) {
  if (sending) {
    // Relógio enquanto está enviando
    return (
      <Ionicons
        name="time-outline"
        size={13}
        color="#667781"
        style={styles.tickIcon}
      />
    );
  }

  // Duas marcas: azul = lida, cinza = entregue/enviada
  const tickColor = lida ? "#53BDEB" : "#667781";

  return (
    <View style={{ flexDirection: "row", marginLeft: 3 }}>
      {/* Primeiro tick */}
      <Ionicons name="checkmark" size={13} color={tickColor} />
      {/* Segundo tick sobreposto levemente para imitar o ✓✓ do WhatsApp */}
      <Ionicons
        name="checkmark"
        size={13}
        color={tickColor}
        style={{ marginLeft: -6 }}
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────────────────────────────────────
export default function Chat({ navigation, route }) {
  const scrollViewRef = useRef(null);
  const pollingRef    = useRef(null);
  const activeChatId  = useRef(route?.params?.chatId ?? null);

  const [messages,      setMessages]      = useState([]);
  const [messageText,   setMessageText]   = useState("");
  const [modalVisible,  setModalVisible]  = useState(false);
  const [rating,        setRating]        = useState(0);
  const [loading,       setLoading]       = useState(true);
  const [sending,       setSending]       = useState(false);
  const [erro,          setErro]          = useState(null);
  const [tituloModal,   setTituloModal]   = useState("ERR0");
  const [tipoModal,     setTipoModal]     = useState("erro");
  const [modalErro,     setModalErro]     = useState(false);
  const [mensagemErro,  setMensagemErro]  = useState("");
  const userPhoto = route?.params?.userPhoto ?? null;

  const {
    user,
    iniciarChatCont,
    enviarMensagemCont,
    historicoChatCont,
    visualizarChatCont,
    avaliarC,
  } = useAuth();

  const psicologoId    = route?.params?.psicologoId;
  const doctorName     = route?.params?.userName    ?? "Psicólogo";
  const avatarInitials = route?.params?.userAvatar  ?? "PS";

  // ─── Carrega o histórico de mensagens ───────────────────────────────────────
  const carregarHistorico = useCallback(
    async (chatId, silencioso = false) => {
      if (!chatId) return;
      if (!silencioso) setLoading(true);

      const resultado = await historicoChatCont(chatId);

      if (resultado.sucesso) {
        const lista = resultado.dados?.mensagens ?? resultado.dados ?? [];
        const normalizadas = lista.map((m) => normalizeMessage(m, user?.id_usuario));
        setMessages(normalizadas);
        setErro(null);
      } else if (!silencioso) {
        setErro("Não foi possível carregar as mensagens.");
      }

      if (!silencioso) setLoading(false);
    },
    [historicoChatCont, user?.id]
  );

  // ─── Inicia o polling de novas mensagens ────────────────────────────────────
  const iniciarPolling = useCallback(
    (chatId) => {
      stopPolling();
      pollingRef.current = setInterval(() => {
        carregarHistorico(chatId, true);
      }, POLLING_INTERVAL_MS);
    },
    [carregarHistorico]
  );

  function stopPolling() {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }

  // ─── Bootstrap: inicia ou recupera o chat ───────────────────────────────────
  useEffect(() => {
    async function bootstrap() {
      setLoading(true);

      let chatId = activeChatId.current;

      if (!chatId && psicologoId) {
        const resultado = await iniciarChatCont({ psicologo_id: psicologoId });

        if (resultado.sucesso) {
          chatId = resultado.dados?.chat?.id ?? resultado.dados?.id;
          activeChatId.current = chatId;
        } else {
          Alert.alert("Erro", "Não foi possível iniciar o chat.");
          navigation.goBack();
          return;
        }
      }

      if (!chatId) {
        setErro("Chat não encontrado.");
        setLoading(false);
        return;
      }

      await carregarHistorico(chatId);
      await visualizarChatCont(chatId);
      iniciarPolling(chatId);
    }

    bootstrap();

    return () => stopPolling();
  }, []);

  // ─── Scroll automático ao chegarem novas mensagens ──────────────────────────
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 80);
    }
  }, [messages.length]);

  // ─── Envio de mensagem ───────────────────────────────────────────────────────
  const handleSend = async () => {
    const texto  = messageText.trim();
    const chatId = activeChatId.current;

    if (!texto || sending || !chatId) return;

    const tempId  = `temp_${Date.now()}`;
    const tempMsg = {
      id:      tempId,
      sender:  "user",
      text:    texto,
      time:    new Date().toLocaleTimeString("pt-BR", {
        hour:   "2-digit",
        minute: "2-digit",
      }),
      lida:    false,
      sending: true,
    };

    setMessages((prev) => [...prev, tempMsg]);
    setMessageText("");
    setSending(true);

    const resultado = await enviarMensagemCont({
      id_chat:  chatId,
      conteudo: texto,
    });

    setSending(false);

    if (resultado.sucesso) {
      const msgReal = normalizeMessage(
        resultado.dados?.mensagem ?? resultado.dados,
        user?.id_usuario
      );
      setMessages((prev) =>
        prev.map((m) => (m.id === tempId ? msgReal : m))
      );
    } else {
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
      setMessageText(texto);
      Alert.alert("Erro", "Não foi possível enviar a mensagem. Tente novamente.");
    }
  };

  // ─── Avaliação ───────────────────────────────────────────────────────────────
  const handleSubmitReview = async () => {
    if (rating === 0) {
      setMensagemErro("Selecione uma nota de 1 a 5 estrelas.");
      setModalErro(true);
      return;
    }

    try {
      const resultado = await avaliarC(psicologoId, Number(rating));

      if (resultado?.error) {
        setMensagemErro("Não foi possível enviar sua avaliação.");
        setModalErro(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setModalErro(false);
        return;
      }

      setModalVisible(false);
      setRating(0);

      setTituloModal("Avaliação enviada");
      setMensagemErro("Obrigado por avaliar seu psicólogo.");
      setTipoModal("sucesso");
      setModalErro(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setModalErro(false);
      setTipoModal("erro");
    } catch (error) {
      console.log(error);
      setMensagemErro("Ocorreu um erro ao enviar sua avaliação.");
      setModalErro(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setModalErro(false);
    }
  };

  const handleContentSizeChange = () => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  };

  // ─── Loading inicial ─────────────────────────────────────────────────────────
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1F2640" />
      </View>
    );
  }

  // ─── Estado de erro ──────────────────────────────────────────────────────────
  if (erro && messages.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", paddingHorizontal: 24 }]}>
        <Ionicons name="cloud-offline-outline" size={48} color="#A9B3C1" />
        <Text style={{ color: "#A9B3C1", fontSize: 15, marginTop: 12, textAlign: "center" }}>
          {erro}
        </Text>
        <Pressable
          onPress={() => carregarHistorico(activeChatId.current)}
          style={{ marginTop: 16, paddingVertical: 10, paddingHorizontal: 24, backgroundColor: "#1F2640", borderRadius: 8 }}
        >
          <Text style={{ color: "#fff", fontSize: 14 }}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  // ─── Render principal ────────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </Pressable>

        <View style={styles.profileInfo}>
          {userPhoto ? (
            <Image source={{ uri: userPhoto }} style={styles.avatar} />
          ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarInitials}</Text>
            </View>
          )}

          <View style={styles.nameWrapper}>
            <Text style={styles.name} numberOfLines={1}>
              {doctorName}
            </Text>
            <Text style={styles.subtitle}>Psicólogo(a)</Text>
          </View>
        </View>

        <Pressable
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="ellipsis-vertical" size={22} color="#ffffff" />
        </Pressable>
      </View>

      {/* ── Modal de avaliação ──────────────────────────────────────────────── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        />
        <View style={styles.modalContainer}>
          <View style={styles.modalCloseRow}>
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#1F2640" />
            </Pressable>
          </View>
          <View style={styles.modalAvatarCircle}>
            {userPhoto ? (
              <Image source={{ uri: userPhoto }} style={styles.avatarModal} />
            ) : (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{avatarInitials}</Text>
            </View>
          )}


          </View>
          <Text style={styles.modalTitle}>Avalie seu psicólogo</Text>
          <Text style={styles.modalSubtitle}>
            Sua opinião é muito importante para melhorarmos sempre.
          </Text>
          <Text style={[styles.modalQuestion, styles.modalQuestionCenter]}>
            Como foi sua experiência?
          </Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable
                key={star}
                onPress={() => setRating(star)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={star <= rating ? "star" : "star-outline"}
                  size={28}
                  color="#F7B731"
                  style={styles.starIcon}
                />
              </Pressable>
            ))}
          </View>
          <Pressable
            style={styles.modalSubmitButton}
            onPress={handleSubmitReview}
            activeOpacity={0.8}
          >
            <Text style={styles.modalSubmitText}>Enviar avaliação</Text>
          </Pressable>
        </View>
      </Modal>

      {/* ── Lista de mensagens ──────────────────────────────────────────────── */}
      <View style={styles.chatCard}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onContentSizeChange={handleContentSizeChange}
        >
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>Hoje</Text>
          </View>

          {messages.length === 0 && (
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Ionicons name="chatbubble-ellipses-outline" size={40} color="#3211d969" />
              <Text style={{ color: "#3211d969", fontSize: 14, marginTop: 8 }}>
                Nenhuma mensagem ainda. Diga olá! 👋
              </Text>
            </View>
          )}

          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === "user"
                  ? styles.userBubble
                  : styles.therapistBubble,
                message.sending && { opacity: 0.55 },
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  message.sender === "user" && styles.userMessageText,
                ]}
              >
                {message.text}
              </Text>

              {/* ── Rodapé: hora + ticks (só nas mensagens do usuário) ── */}
              <View style={styles.messageFooter}>
                <Text style={styles.messageTime}>{message.time}</Text>

                {message.sender === "user" && (
                  <MessageTicks
                    sending={!!message.sending}
                    lida={!!message.lida}
                  />
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* ── Rodapé / Input ──────────────────────────────────────────────────── */}
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="attach"
            size={20}
            color="#A9B3C1"
            style={styles.inputIcon}
          />

          <TextInput
            style={styles.input}
            placeholder="Digita uma mensagem..."
            placeholderTextColor="#A9B3C1"
            value={messageText}
            onChangeText={setMessageText}
            autoFocus={false}
            returnKeyType="send"
            blurOnSubmit={false}
            onSubmitEditing={handleSend}
            multiline
          />
        </View>

        <Pressable
          style={[
            styles.sendButton,
            (!messageText.trim() || sending) && { opacity: 0.45 },
          ]}
          activeOpacity={0.8}
          onPress={handleSend}
          disabled={!messageText.trim() || sending}
        >
          {sending ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Ionicons name="send" size={20} color="#FFFFFF" />
          )}
        </Pressable>
      </View>

      <ModalApp
        visible={modalErro}
        titulo={tituloModal}
        mensagem={mensagemErro}
        tipo={tipoModal}
        semBotao
      />
    </KeyboardAvoidingView>
  );
}