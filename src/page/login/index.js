// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Text, View, Image, TextInput, Pressable, ImageBackground} from 'react-native';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const enviar = (idModal) => {
        navigation.navigate(idModal)
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    style={styles.logo}
                    source={require('./img/logo.png')}/>
            </View>
            <View style={styles.container2}>

                <Text style={styles.titulo}>QUE BOM TER VOCÊ DE VOLTA!</Text>
                <Text style={styles.descricao}>Sua próxima sessão está quase lá.</Text>

                <View style={styles.contEntradas}>
                    <View>
                        <Text style={styles.label}>Email</Text>
                        <View style={styles.Continput}>
                            <Image source={require('./img/email.png')}/>
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                underlineColorAndroid="transparent" // Remove aquela linha em baixo das palavras, enquanto escrevemos!
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.label}>Senha</Text>
                        <View style={styles.Continput}>
                            <Image source={require('./img/cadeado.png')}/>
                            <TextInput
                                style={styles.input}
                                onChangeText={setSenha}
                                value={senha}
                                keyboardType="default"
                                underlineColorAndroid="transparent" // Remove aquela linha em baixo das palavras, enquanto escrevemos!
                            />
                        </View>
                        <Pressable onPress={() => enviar('dadoConta')}>
                            <Text style={styles.esenha}>Esqueci a minha senha</Text>
                        </Pressable>
                    </View>
                </View>
                
                <View style={styles.contEntra}>
                    <View style={styles.botaoEntra}>
                        <Pressable onPress={() => enviar('dadoPessoal')} style={styles.stylesButton}>
                            <Text style={styles.entrarText}>Entrar</Text>
                            <View>
                                <ImageBackground style={styles.imgfSeta} source={require('./img/fundoIcone.png')}/>
                                <ImageBackground style={styles.seta} source={require('./img/seta.png')}/>
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.contaNova}>
                        <Text style={styles.textCadastre}>É novo por aqui? </Text>
                        <Text style={styles.linkCadastre}>Cadastre-se</Text>
                    </View>
                </View>

            </View>
        </View>
    )
}