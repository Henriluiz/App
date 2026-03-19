import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")

export default StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: "center"
    },

    // Flex : 1
    logo: {
        width: wp("35%"),
        height: hp("25%"),
        marginTop: 20,
        alignItems: "center"
    },

    // Flex : 2

    titulo: {
        textAlign: "center",
        fontSize: 53,
        color: "#A383FB",
    },

    caixaTitulos: {
        padding: 15,
        top: -30,
    },

    titulo2: {
        fontSize: 50,
        color: 'black',
    },

    // Flex : 3

    descricao: {
        fontSize: 32,
        fontFamily: "Arial",
        marginRight: 44,
    },

    // Flex : 4
    containerBotoes: {
        textAlign: "left",
        alignItems: "flex-start",
        marginTop: hp("6%"),
        gap: 35,
    },

    descricao2: {
        textAlign: "left",
        fontSize: 24,
        marginTop: 30,
        marginRight: 230,
        fontWeight: "bold",
    },

    botaoPsicologo: {
        width: 315,
        height: 50,
        backgroundColor: "rgba(163, 131, 251, 0.5)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        borderColor: "rgba(163, 131, 251, 1)",
        borderWidth: 3,
    },

    textPsicologo: {
        fontSize: 24,
        fontFamily: "Arial",
        color: "#484848",
        fontWeight: "bold"
    },

    botaoPaciente: {
        width: 315,
        height: 50,
        backgroundColor: "rgba(172, 244, 226, 0.4)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        borderColor: "rgba(172, 244, 226, 1)",
        borderWidth: 3,
    },

    textPaciente: {
        fontSize: 24,
        fontFamily: "Arial",
        color: "#484848",
        fontWeight: "bold"
    }
});