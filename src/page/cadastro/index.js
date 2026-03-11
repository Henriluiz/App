// import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable} from 'react-native';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";

export default function Cadastro() {
    const navigation = useNavigation();

    const abrir_cadastro = (idModal) => {
        navigation.navigate(idModal)
    }

    return (
        <View style={styles.container}>
            <Image
            style={styles.logo}
            source={require('./img/logo.png')}/>
            <Text style={styles.caixaTitulos}>
                <Text style={styles.titulo}>Olá,{"\n"}</Text>
                <Text style={styles.titulo2}>Boas vindas</Text>
            </Text>
            <Text style={styles.descricao}>Para começarmos,{"\n"}identifique-se:</Text>
            <Text style={styles.descricao2}>Eu sou:</Text>
            
            <View style={styles.containerBotoes}>
                <Pressable onPress={() => abrir_cadastro('dadoPessoal')} style={styles.botaoPsicologo}>
                    <Text style={styles.textPsicologo}>PSICÓLOGO</Text>
                </Pressable>
                <Pressable onPress={() => abrir_cadastro('dadoPessoal')} style={styles.botaoPaciente}>
                    <Text style={styles.textPaciente}>PACIENTE</Text>
                </Pressable>
            </View>
        </View>
    )
}