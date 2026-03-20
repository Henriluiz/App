import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable
} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons, Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from '@react-navigation/native';

import styles from "./styles";

export default function NavBar({ tela }) {

    const navigation = useNavigation();
    const route = useRoute();

    return (
    <View>

        {tela === 'home' && (
            <View style={styles.bottomNav}>
                <Pressable onPress={() => navigation.navigate('menu')}>
                    <Ionicons
                    name="home"
                    size={24}
                    color={route.name === "Home" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable>
                    {/* onPress={() => navigation.navigate("Curtidas")} */}
                    <Ionicons
                    name="heart-outline"
                    size={24}
                    color={route.name === "Curtidas" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable>
                    {/*  onPress={() => navigation.navigate("Chat")} */}
                    <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color={route.name === "Chat" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable onPress={() => navigation.navigate('perfil')}>
                    <Ionicons
                    name="person-outline"
                    size={24}
                    color={route.name === "Perfil" ? "#6C63FF" : "#999"}
                    />
                </Pressable>

            </View>
        )}

        {tela === 'central' && (
            <View style={styles.bottomNav}>
                <Pressable onPress={() => navigation.navigate('menu')}>
                    <Ionicons
                    name="home-outline"
                    size={24}
                    color={route.name === "Home" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable>
                    {/* onPress={() => navigation.navigate("Central")} */}
                    <Ionicons
                    name="heart"
                    size={24}
                    color={route.name === "Central" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable>
                    {/*  onPress={() => navigation.navigate("Chat")} */}
                    <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color={route.name === "Chat" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable onPress={() => navigation.navigate('perfil')}>
                    <Ionicons
                    name="person-outline"
                    size={24}
                    color={route.name === "Perfil" ? "#6C63FF" : "#999"}
                    />
                </Pressable>

            </View>
        )}

        {tela === 'chat' && (
            <View style={styles.bottomNav}>
                <Pressable onPress={() => navigation.navigate('menu')}>
                    <Ionicons
                    name="home-outline"
                    size={24}
                    color={route.name === "Home" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable>
                    {/* onPress={() => navigation.navigate("Curtidas")} */}
                    <Ionicons
                    name="heart-outline"
                    size={24}
                    color={route.name === "Curtidas" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable>
                    {/*  onPress={() => navigation.navigate("Chat")} */}
                    <Ionicons
                    name="chatbubble"
                    size={24}
                    color={route.name === "Chat" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable onPress={() => navigation.navigate('perfil')}>
                    <Ionicons
                    name="person-outline"
                    size={24}
                    color={route.name === "Perfil" ? "#6C63FF" : "#999"}
                    />
                </Pressable>

            </View>
        )}

        {tela === 'perfil' && (
            <View style={styles.bottomNav}>
                <Pressable onPress={() => navigation.navigate('menu')}>
                    <Ionicons
                    name="home-outline"
                    size={24}
                    color={route.name === "Home" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable>
                    {/* onPress={() => navigation.navigate("Curtidas")} */}
                    <Ionicons
                    name="heart-outline"
                    size={24}
                    color={route.name === "Curtidas" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable>
                    {/*  onPress={() => navigation.navigate("Chat")} */}
                    <Ionicons
                    name="chatbubble-outline"
                    size={24}
                    color={route.name === "Chat" ? "#6C63FF" : "#999"}
                    />
                </Pressable>
    
                <Pressable onPress={() => navigation.navigate('perfil')}>
                    <Ionicons
                    name="person"
                    size={24}
                    color={route.name === "Perfil" ? "#6C63FF" : "#999"}
                    />
                </Pressable>

            </View>
        )}
    </View>        
  );
}