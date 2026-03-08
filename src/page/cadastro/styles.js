import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: "center"
    },

    // Flex : 1
    logo: {
        maxWidth: 373,
        width: 250,
        height: 260,
        marginTop: 20,
    },

    // Flex : 2

    titulo: {
        textAlign: "center",
        fontSize: 70,
        color: "#A383FB",
    },

    caixaTitulos: {
        padding: 20,
        top: -30,
    },

    titulo2: {
        fontSize: 53,
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
    },

    descricao2: {
        textAlign: "left",
        alignItems: "flex-start",
        fontSize: 24,
        marginTop: 21,
        marginRight: 230,
        fontWeight: "bold",
    },

    containerBotoes: {
        marginTop: 40,
        gap: 52,
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