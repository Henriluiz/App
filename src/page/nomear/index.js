// import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable, ScrollView} from 'react-native';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";
import {LinkService} from '../../components/abrirLinkExterno';

export default function Nomear() {
    const navigation = useNavigation();

    const abrir_cadastro = (idModal) => {
        navigation.navigate(idModal)
    }

    const linkExterno = "https://rodrigo-uxzz.github.io/Zenith_Web/"

    return (
        <View style={styles.container}>
            <View style={styles.containerImg}>
                <Image
                style={styles.logo}
                source={require('./img/logo.png')}/>
            </View>
            <View style={styles.containertext}>
                <Text style={styles.caixaTitulos}>
                    <Text style={[styles.titulo, {textAlign: "left"}]}>Olá,{"\n"}</Text>
                    <Text style={styles.titulo2}>Boas vindas</Text>
                </Text>
                <Text style={styles.descricao}>Para começarmos,{"\n"}identifique-se:</Text>
            </View>
            
            <View style={styles.containerBotoes}>
                <Text style={styles.descricao2}>Eu sou:</Text>
                <Pressable onPress={() => abrir_cadastro("login")} style={styles.botaoPaciente}>
                    <Text style={styles.textPaciente}>PACIENTE</Text>
                </Pressable>
                <Pressable onPress={() => LinkService.open(linkExterno)} style={styles.botaoPsicologo}>
                    <Text style={styles.textPsicologo}>PSICÓLOGO</Text>
                </Pressable>
            </View>
        </View>
    )
}