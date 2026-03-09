// import { StatusBar } from 'expo-status-bar';
import { use, useState } from "react";
import { Text, View, Image, TextInput, Pressable, ActivityIndicator } from 'react-native';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useAuth } from "../../context/AuthContext";

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Login({onLogin}) {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aprovado, setAprovado] = useState(false);
    const [loading, setLoading] = useState(false)
    const enviar = (idModal) => {
        navigation.navigate(idModal)
    }

    const { signIn } = useAuth();

    async function handleLogin() {
        if (validarCampos(email, password)) {

            if (!email.trim() || !password.trim()) {
                Alert.alert("Atenção", "Preencha email e senha");
                return;
                }
    
                try {
                    setLoading(true);
                    await signIn(email, password);
                } catch (error) {
                    Alert.alert("Erro", error.message || "Não foi possível entrar");
                } finally {
                    setLoading(false);
            }
        }
  }

    const validarCampos = (email, senha) => {
        const emailLimpo = email.trim();
        const senhaLimpa = senha.trim();

        if (!emailLimpo) {
            console.log("Email está vazio");
            return false;
        }

        // Funciona para verificar a existência de um "@"
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo);
        if (!emailOk) {
            console.log("Email inválido");
            return false;
        }

        // Verifica senha forte
        if (!senhaLimpa) {
            console.log("Senha está vazia");
            return false;
        }
    
        if (senhaLimpa.length < 6 || senhaLimpa.length > 25) {
            console.log("Senha deve ter entre 6 e 25 caracteres");
            return false;
        }

        return true;
    };

    const onSubmit = () => {
        const ok = validarCampos(email, password);
        setAprovado(ok);

        if (ok) {
            console.log("Formulário válido, enviando...");
            enviar("dadoPessoal");
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
                <Image
                    style={styles.logo}
                    source={require('./img/logo.png')}
                />
            </View>

            <View style={styles.container2}>

                <Text style={styles.titulo}>
                    QUE BOM TER VOCÊ DE VOLTA!
                </Text>

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
                                onChangeText={setEmail}
                                value={email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent"
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
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={true}
                                underlineColorAndroid="transparent"
                                maxLength={20}
                                SecureTextEntry
                            />
                        </View>

                        <Pressable onPress={() => enviar('dadoConta')}>
                            <Text style={styles.esenha}>
                                Esqueci a minha senha
                            </Text>
                        </Pressable>
                    </View>

                </View>

                <View style={styles.contEntra}>

                    <View style={styles.botaoEntra}>
                        <Pressable onPress={handleLogin} style={styles.stylesButton}>
                            <Text style={styles.entrarText}>Entrar</Text>
                            { loading ? <ActivityIndicator size="small" color="#A383FB"/>
                            
                            :<AntDesign
                                name="send"
                                size={24}
                                color="rgba(163, 131, 251, 1)"
                                style={styles.iconEnviar}
                            />}
                        </Pressable>
                    </View>
                    
                    <View style={styles.contaNova}>
                        <Text style={styles.textCadastre}>
                            É novo por aqui?
                        </Text>

                        <Pressable onPress={() => enviar('cadastro')}>
                            <Text style={styles.linkCadastre}>
                                Cadastre-se
                            </Text>
                        </Pressable>
                    </View>

                </View>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
}
