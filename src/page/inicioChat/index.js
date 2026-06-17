import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome } from "@expo/vector-icons";
import NavBar from "../../components/NavBar";
import styles from "./styles";

export default function InicioChat({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [conversations] = useState([
    {
      id: 1,
      name: "Dra. Eloísa Almeida",
      lastMessage: "Sim! está confirmado. Nos vemos na quarta às 14h. Tenha um ótimo dia!",
      time: "10:40",
      isOnline: true,
      avatar: "EA",
    },
  ]);

  const filteredConversations = conversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() =>
        navigation.navigate("chat", { userName: item.name, userAvatar: item.avatar })
      }
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.avatar}</Text>
        </View>
        {item.isOnline && <View style={styles.onlineIndicator} />}
      </View>

      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        <Text style={styles.conversationMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>

      <Feather name="chevron-right" size={20} color="#D0D5DD" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Conversas</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Feather name="edit-3" size={20} color="#A383FB" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
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
          <TouchableOpacity onPress={() => setSearchText("")} activeOpacity={0.7}>
            <Feather name="x" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Conversations List */}
      {filteredConversations.length > 0 ? (
        <FlatList
          data={filteredConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome name="inbox" size={48} color="#D0D5DD" />
          <Text style={styles.emptyStateText}>Nenhuma conversa encontrada</Text>
        </View>
      )}

      <NavBar tela="chat" />
    </SafeAreaView>
  );
}