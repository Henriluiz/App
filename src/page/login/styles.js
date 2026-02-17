import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")

export default StyleSheet.create ({
    container: {
        flex: 1,
        // alignItems: "center"
    },

    // Flex : 1
    logo: {
        width: wp("35%"),
        height: hp("25%"),
        marginTop: 25,
        alignItems: "center"
    },

    
    containerLogo: {
        alignItems: "center"
    },

    // Flex : 2

    container2: {
        flex: 1,
        backgroundColor: "#A383FB",
        borderTopStartRadius: 65,
        borderTopEndRadius: 65,
    },

    titulo: {
        fontSize: 25,
        marginTop: hp("7%"),
        marginLeft: 25,
        color: "white",
    },

    descricao: {
        fontSize: 15,
        marginLeft: 27,
        color: "white",
    },

    // Flex 3: Label em diante.
    contEntradas: { // Container central dos Inputs
        marginTop: hp("2%"),
        alignItems: "center",
        gap: hp("1%"),
    },

    label: {
        fontSize: 18,
        marginLeft: 10,
        color: "white",
    },

    Continput: { // Um container simulando um inputText, apenas para colocar a imagem.
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        borderRadius: 15,
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    },

    input: { // O InputText em si
        paddingLeft: 15,
        height: 45,
        width: wp("75%"),
    },

    esenha: { // Esqueceu Senha
        color: "white",
        textDecorationLine: "underline",
        marginLeft: 10,
        marginTop: 5,
    },

    // Flex 4: Botão de entrada
    contEntra: {
        alignSelf: "center",
        marginTop: hp("5%")
    },

    botaoEntra: {
        height: 55,
        width: 222,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
        
    },

    entrarText: {
        fontSize: 25,
        color: "rgba(163, 131, 251, 1)",
        // marginLeft: 24.7,
        // marginTop: 8,
    },

    iconEnviar: {
        marginTop: hp("0.6%")
    },

    stylesButton: {
        display: "flex",
        flexDirection: "row",
        gap: wp("25%"),
    },

    contaNova: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        margin: hp("0.5%")
    },
    
    textCadastre: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 15,
    },

    linkCadastre: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 16,
        textDecorationLine: "underline", 
        fontWeight: "bold"
    },

});