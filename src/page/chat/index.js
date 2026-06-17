import React, { useRef, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const messages = [
  {
    id: 1,
    sender: "therapist",
    text: "Olá! Tudo bem com você?",
    time: "10:30",
  },
  {
    id: 2,
    sender: "user",
    text: "Oi Dra. Eloísa! Estou bem, obrigada!",
    time: "10:32",
  },
  {
    id: 3,
    sender: "therapist",
    text: "Que bom! Como tem sido sua semana?",
    time: "10:33",
  },
  {
    id: 4,
    sender: "user",
    text: "Bem melhor que a anterior. Consegui aplicar as técnicas que vimos hoje conversarmos.",
    time: "10:35",
  },
  {
    id: 5,
    sender: "therapist",
    text: "Excelente! Fico muito feliz em saber. Vamos conversar mais sobre isso na nossa próxima sessão, combinado?",
    time: "10:37",
  },
  {
    id: 6,
    sender: "user",
    text: "Sim! Já estou ansiosa, queria confirmar: quarta às 14h, certo?",
    time: "10:39",
  },
  {
    id: 7,
    sender: "therapist",
    text: "Sim! está confirmado. Nos vemos na quarta às 14h. Tenha um ótimo dia!",
    time: "10:40",
  },
];

export default function Chat({ navigation, route }) {
  const scrollViewRef = useRef(null);
  const [messageText, setMessageText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const doctorName = route?.params?.userName ?? "Dra. Eloísa Almeida";
  const avatarInitials = route?.params?.userAvatar ?? "EA";

  const handleScroll = () => {
    // Scroll tracking if needed for future features
  };

  const handleSubmitReview = () => {
    setModalVisible(false);
    Alert.alert("Avaliação enviada", "Obrigado por avaliar seu psicólogo.");
  };

  const handleContentSizeChange = (_, contentHeight) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.profileInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{avatarInitials}</Text>
          </View>

          <View style={styles.nameWrapper}>
            <Text style={styles.name} numberOfLines={1}>
              {doctorName}
            </Text>
            <Text style={styles.subtitle}>Psicóloga clínica</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          activeOpacity={0.7}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="ellipsis-vertical" size={22} color="#ffffff" />
        </TouchableOpacity>
      </View>

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
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#1F2640" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalAvatarCircle}>
            <Text style={styles.modalAvatarText}>EA</Text>
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
              <TouchableOpacity
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
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={styles.modalSubmitButton}
            onPress={handleSubmitReview}
            activeOpacity={0.8}
          >
            <Text style={styles.modalSubmitText}>Enviar avaliação</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.chatCard}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onContentSizeChange={handleContentSizeChange}
        >
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>Hoje</Text>
          </View>

          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.sender === "user"
                  ? styles.userBubble
                  : styles.therapistBubble,
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

              <Text style={styles.messageTime}>{message.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

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
          />
        </View>

        <TouchableOpacity style={styles.sendButton} activeOpacity={0.8}>
          <Ionicons name="send" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}