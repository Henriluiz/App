import { useState } from "react";
import { Text, View, Image, TextInput, Pressable } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../../context/AuthContext";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Login() {
  const navigation = useNavigation();

  const { signIn } = useAuth();

  const [login, setLogin] = useState(""); // * Login aqui é o Email!!
  const [senha, setSenha] = useState("");

  const enviar = (tela) => {
    navigation.navigate(tela);
  };

  const validarCampos = () => {
    const emailLimpo = login.trim();
    const senhaLimpa = senha.trim();

    if (!emailLimpo) {
      console.log("Email vazio");
      return false;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);

    if (!emailOk) {
      console.log("Email inválido");
      return false;
    }

    if (!senhaLimpa) {
      console.log("Senha vazia");
      return false;
    }

    if (senhaLimpa.length < 6) {
      console.log("Senha muito curta");
      return false;
    }

    return true;
  };

  const onSubmit = async() => {
    if (validarCampos()) {
      console.log("Campos válido");

      await signIn(login, senha)
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={30}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image style={styles.logo} source={require("./img/logo.png")} />
        </View>

        <View style={styles.container2}>
          <Text style={styles.titulo}>QUE BOM TER VOCÊ DE VOLTA!</Text>

          <Text style={styles.descricao}>
            Sua próxima sessão está quase lá.
          </Text>

          <View style={styles.contEntradas}>
            <View>
              <Text style={styles.label}>Email</Text>

              <View style={styles.Continput}>
                <MaterialIcons name="email" size={24} color="#A383FB" />

                <TextInput
                  style={styles.input}
                  onChangeText={setLogin}
                  value={login}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={100}
                />
              </View>
            </View>

            <View>
              <Text style={styles.label}>Senha</Text>

              <View style={styles.Continput}>
                <MaterialIcons name="password" size={24} color="#A383FB" />

                <TextInput
                  style={styles.input}
                  onChangeText={setSenha}
                  value={senha}
                  secureTextEntry
                  maxLength={20}
                />
              </View>

              <Pressable onPress={() => enviar("esquecerSenha")}>
                <Text style={styles.esenha}>Esqueci a minha senha</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.contEntra}>
            <View style={styles.botaoEntra}>
              <Pressable onPress={() => onSubmit()} style={styles.stylesButton}>
                <Text style={styles.entrarText}>Entrar</Text>

                <AntDesign
                  name="send"
                  size={24}
                  color="rgba(163, 131, 251, 1)"
                  style={styles.iconEnviar}
                />
              </Pressable>
            </View>

            <View style={styles.contaNova}>
              <Text style={styles.textCadastre}>É novo por aqui?</Text>

              <Pressable onPress={() => enviar("cadastroPessoal")}>
                <Text style={styles.linkCadastre}>Cadastre-se</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}