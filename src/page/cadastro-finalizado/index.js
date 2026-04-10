// import { StatusBar } from 'expo-status-bar';
import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from "@react-navigation/native";

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function CadastroFin() {

    const navigation = useNavigation();

    const finalizar = () => {
        navigation.navigate("login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image
                    style={styles.logo}
                    source={require('./img/logo.png')}
                />
            </View>

            <View style={styles.container2}>
                <Text style={styles.titulo}>Cadastro Finalizado!</Text>
                
                <View style={styles.containerCheck}>
                    <Image
                        style={styles.check}
                        source={require('./img/check.png')}
                    />
                </View>

                <View style={styles.contEntra}>
                    <View style={styles.botaoEntra}>
                        <Pressable onPress={finalizar} style={styles.stylesButton}>
                            <Text style={styles.entrarText}>Finalizar</Text>
                        </Pressable>
                    </View>    
                </View>
            </View>
        </View>
    );
}
