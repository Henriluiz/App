import React, { use, useState } from "react";
import {Text,View,Image,Pressable,ScrollView,KeyboardAvoidingView,Platform,}from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import {useAuth} from "../../context/AuthContext"

export default function CadastroFoto({ route }) {
  const { verificarDisponibilidade } = useAuth()

  const [imagem, setImagem] = useState(null);

  const {nome, nickname, telefone, dataNasc, genero, cpf} = route.params;

  const navigation = useNavigation();

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

  async function enviar() {

      console.log("Entrei 3!!")
      navigation.navigate("cadastroConta", {
        nome: nome,
        nickname: nickname,
        telefone: telefone,
        dataNasc: dataNasc,
        genero: genero,
        cpf: cpf,
      });
  
    }

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
        <Text style={styles.titulo}>Adicione sua foto</Text>
        <View style={styles.fotoContainer}>
          <Pressable style={styles.fotoPerfil} onPress={tirarFoto}>
            {imagem ?
              <Image source={{ uri: imagem }} style={styles.imagem}/> : <Ionicons name="person-outline" size={75} color="white"  style={styles.fotoPerfil2}/>
            }
          </Pressable>

          <View style={styles.iconeEditar}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>

        </View>
        <View style={styles.containerBotoes}> 

          <Pressable onPress={escolherDaGaleria} style={styles.btn}>
            <Text style={{fontSize: 20, color: "white"}}>Escolher da Galeria</Text>
          </Pressable>

          
        </View>
        <View style={styles.containerBotoes2}>
          <Pressable
            onPress={() => navigation.navigate("cadastroPessoal")}
            style={styles.btnVoltar}
          >
            <Text style={styles.setaVoltar}>{"<"}</Text>
          </Pressable>

          <Pressable style={styles.btnProximo} onPress={enviar}>
            {imagem ? <Text style={styles.textoProximo}>Próximo</Text> : <Text style={styles.textoProximo}>Pular</Text>}

            <View style={styles.circuloSeta}>
              <Text style={styles.setaProximo}>{">"}</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

