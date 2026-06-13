import { useState } from "react";
import { Text, View, Image, TextInput, Pressable, ActivityIndicator } from "react-native";
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
  const [erro, setErro] = useState("");
   
  const [loading, setLoading] = useState(false);

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
    setLoading(true)
    if (validarCampos()) {
      console.log("Campos válido");

      try {
        await signIn(login, senha)
        setErro("");
      } catch (e){
        setErro("Tente novamente, verifique o email e a senha")
      }
      
    }
    setLoading(false)
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
          <Text style={styles.titulo}>Que bom ter você de volta!</Text>

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

              <Pressable onPress={() => enviar("emailRec")}>
                <Text style={styles.esenha}>Esqueci a minha senha</Text>
              </Pressable>
              {erro ? <Text style={styles.mensagemErro}>{erro}</Text> : null}
            </View>
          </View>

          <View style={styles.contEntra}>
            <View style={styles.botaoEntra}>
              <Pressable onPress={() => onSubmit()} style={({ pressed }) => [
                styles.stylesButton,
                {
                  opacity: pressed ? 0.8 : 1,
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}>
                <Text style={styles.entrarText}>Entrar</Text>
                <View style={styles.iconContainer}>
                  {loading ? (
                    <ActivityIndicator
                      color="rgba(163, 131, 251, 1)"
                      size="small"
                    />
                  ) : (
                    <AntDesign
                      name="send"
                      size={24}
                      color="rgba(163, 131, 251, 1)"
                    />
                  )}
                </View>
                
              </Pressable>
            </View>

            <View style={styles.contaNova}>
              <Text style={styles.textCadastre}>É novo por aqui? </Text>

              <Pressable onPress={() => enviar("cadastroPessoal")} style={({ pressed }) => [
                  {
                    opacity: pressed ? 0.8 : 1,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                  },
                ]}>
                <Text style={styles.linkCadastre}>Cadastre-se</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
