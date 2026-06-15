import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
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
    text: "Sim! Já estou ansiosa, queria confirmar: 4 quarto às 14h, certo?",
    time: "10:39",
  },
];

export default function Chat({ navigation }) {
  const [messageText, setMessageText] = useState("");

  const handleScroll = () => {
    // Scroll tracking if needed for future features
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
            <Text style={styles.avatarText}>EA</Text>
          </View>

          <View style={styles.nameWrapper}>
            <Text style={styles.name} numberOfLines={1}>
              Dra. Eloísa Almeida
            </Text>
            <Text style={styles.subtitle}>Psicóloga clínica</Text>
          </View>
        </View>
      </View>

      <View style={styles.chatCard}>
        <ScrollView
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
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