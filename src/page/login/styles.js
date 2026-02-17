import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        flex: 1,
        // alignItems: "center"
    },

    // Flex : 1
    logo: {
        maxWidth: 373,
        width: 150,
        height: 150,
        marginTop: 25,
        alignItems: "center"
    },

    
    containerLogo: {
        alignItems: "center"
    },

    // Flex : 2

    container2: {
        flex: 1,
        flexWrap: "wrap",
        backgroundColor: "#A383FB",
        borderTopStartRadius: 65,
        borderTopEndRadius: 65,
    },

    titulo: {
        fontSize: 20,
        marginTop: 60,
        marginLeft: 27,
        color: "white",
    },

    descricao: {
        fontSize: 15,
        marginLeft: 27,
        color: "white",
    },

    // Flex 3: Label em diante.
    contEntradas: { // Container central dos Inputs
        marginTop: 51,
        marginLeft: 25,
        gap: 24,
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
        height: 55,
        width: 345,
        borderRadius: 15,
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    },

    input: { // O InputText em si
        paddingLeft: 15,
        height: 50,
        width: 315,
    },

    esenha: { // Esqueceu Senha
        color: "white",
        textDecorationLine: "underline",
        marginLeft: 10,
        marginTop: 5,
    },

    // Flex 4: Botão de entrada
    contEntra: {
        alignSelf: "center"
    },

    botaoEntra: {
        height: 55,
        width: 222,
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: 60,
    },

    entrarText: {
        fontSize: 25,
        color: "rgba(163, 131, 251, 1)",
        marginLeft: 24.7,
        marginTop: 8,
    },

    imgfSeta: {
        marginTop: 8,
    },

    seta: {
        marginTop: 8,
        marginLeft: 13
    },

    stylesButton: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: 50,
    },

    contaNova: {
        display: "flex",
        flexDirection: "row",
        alignSelf: "center"
    },
    
    textCadastre: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 17,
    },

    linkCadastre: {
        color: "rgba(255, 255, 255, 1)",
        fontSize: 17,
        textDecorationLine: "underline", 
        fontWeight: "bold"
    },

});