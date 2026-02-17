import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: "#A383FB",
        // alignItems: "center"
    },

    header:{
    paddingTop: 90,
    paddingHorizontal: 27,
},


    // Flex : 1
    titulo1: {
        marginTop: 60,
        fontSize: 38,
        color: "#ffffff",
    },

        destaque: {
        color: "#9bf3ff",
        fontSize: 43,
        fontWeight: "bold",
    },

    descricao: {
        fontSize: 24,
        marginTop: 30,
        color: "#ffffff",
    },

    // Flex : 2
    card: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "70%",
        backgroundColor: "#ffffff",
        borderTopStartRadius: 64,
        borderTopEndRadius: 65,
        padding:25,
    },

    tituloCard: {
        fontSize: 32,
        marginTop: 28,
        marginLeft: 27,
        color: "#A383FB",
    },

    contInput: { // Container central dos Inputs
        marginTop: 30,
        marginLeft: 25,
        gap: 1,
    },

    label: {
        fontSize: 18,
        color: "#A383FB",
        marginBottom: 3,
        marginTop: 20,  
    },

    input: {
        width: "90%",
        height: 50,
        borderColor: "#A383FB",
        borderWidth: 1.5,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
    },

    picker: {
        borderColor: "#A383FB",
        borderRadius: 12,
        paddingHorizontal: 15,
        height: 50,
        width: "77%",
        borderWidth: 1.5,
    }, 

    // Flex 4: Botão de entrada
    // Adicione estes estilos ao seu StyleSheet.create

containerBotoes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 60, // Ajuste conforme necessário
    width: '100%',
},

btnVoltar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#A383FB', // Cor lilás do fundo
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8, // Para o efeito suave da imagem
},

setaVoltar: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
},

btnProximo: {
    flexDirection: 'row',
    backgroundColor: '#A383FB',
    width: '70%', // Ocupa a maior parte da largura
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 40,
    paddingRight: 10,
},

textoProximo: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '500',
},

circuloSeta: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#FFFFFF', // Círculo branco dentro do botão
    justifyContent: 'center',
    alignItems: 'center',
},

setaProximo: {
    color: '#A383FB',
    fontSize: 25,
    fontWeight: 'bold',
},
});