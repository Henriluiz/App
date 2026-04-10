import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")

export default StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: "center"
    },

    containerImg: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(163, 131, 251, 1)",
        width: "100%",
        borderBottomLeftRadius: 85,
        borderBottomEndRadius: 85,
        marginBottom: hp("4%")
    },

    containertext: {
        // backgroundColor: "red",
        // justifyContent: "flex-start",
        // paddingInline: wp("5%"),
        width: wp("80%"),
        marginBottom: hp("4.5%"),
    },

    // Flex : 1
    logo: {
        width: wp("35%"),
        height: hp("25%"),
        marginTop: hp("3.5%"),
        alignItems: "center"
    },

    // Flex : 2

    titulo: {
        textAlign: "center",
        fontSize: 53,
        color: "#A383FB",
    },

    caixaTitulos: {
        top: -20,
    },

    titulo2: {
        fontSize: 45,
        color: 'black',
    },

    // Flex : 3

    descricao: {
        fontSize: 32,
        textAlign: "left"
        // fontFamily: "Arial",

    },

    // Flex : 4
    containerBotoes: {
        textAlign: "left",
        alignItems: "flex-start",
        gap: hp("3.5%"),
    },

    descricao2: {
        textAlign: "center",
        fontSize: 24,
        // marginTop: 30,
        // marginRight: 230,
        fontWeight: "bold",
    },

    botaoPsicologo: {
        width: wp("80%"),
        height: hp("6.5%"),
        backgroundColor: "rgba(163, 131, 251, 1)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        // borderWidth: 3,

        // Sombra, essa é menor por ser menos relevante!
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    textPsicologo: {
        fontSize: 24,
        fontFamily: "Arial",
        color: "white",
        fontWeight: "bold"
    },

    botaoPaciente: {
        width: wp("80%"),
        height: hp("6.5%"),
        backgroundColor: "rgba(71, 184, 171, 1)",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        borderColor: "rgba(172, 244, 226, 1)",
        // borderWidth: 3,
        
        // Sombra
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 5,

    },

    textPaciente: {
        fontSize: 24,
        fontFamily: "Arial",
        color: "white",
        fontWeight: "bold"
    }
});