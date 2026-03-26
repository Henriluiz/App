import React, { use, useState } from "react";
import {Text,View,Image,Pressable,ScrollView,KeyboardAvoidingView,Platform,}from "react-native";
import styles from "./styles";

import { Ionicons } from "@expo/vector-icons";
import {useAuth} from "../../context/AuthContext"

export default function CadastroFoto({ navigation }) {
  const { verificarDisponibilidade } = useAuth()

  const [imagem, setImagem] = useState(null);

  const solicitarPermissoes = async () => {
    const camera = await ImagePicker.requestCameraPermissionsAsync();
    const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (camera.status !== 'granted' || galeria.status !== 'granted') {
      Alert.alert('Permissão negada', 'É necessário permitir acesso à câmera e galeria.');
      return false;
    }

    return true;
  };

  const tirarFoto = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
    console.log(resultado.assets)
  };

  const escolherDaGaleria = async () => {
    const permissoes = await solicitarPermissoes();
    if (!permissoes) return;

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri);
    }
  };

  /* ================= RENDER ================= */

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.containerImg}>
            <Image
            style={styles.logo}
            source={require('./img/logo.png')}/>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.fotoContainer}>
          <View style={styles.fotoPerfil}>
            <Ionicons name="person-outline" size={75} color="white"  style={styles.fotoPerfil2}/>
          </View>

          <View style={styles.iconeEditar}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>

        </View>
        <View style={styles.containerBotoes}> 

          <Pressable onPress={escolherDaGaleria} style={styles.btn} ><Text style={{fontSize: 20}}>🖼️  Escolher da Galeria</Text></Pressable>

          {imagem && (
            <Image source={{ uri: imagem }} style={styles.imagem} />
          )}
        </View>
        <View style={styles.containerBotoes}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.btnVoltar}
          >
            <Text style={styles.setaVoltar}>{"<"}</Text>
          </Pressable>

          <Pressable style={styles.btnProximo}>
            <Text style={styles.textoProximo}>Próximo</Text>

            <View style={styles.circuloSeta}>
              <Text style={styles.setaProximo}>{">"}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

