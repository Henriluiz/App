import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#A383FB"
    },

    containerImg: {
        justifyContent: "center",
        alignItems: "center",
    },

    container2: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },

    logo: {
        width: wp("35%"),
        height: hp("25%"),
        marginTop: 25,
        alignItems: "center"
    },

    titulo: {
      fontSize: width * 0.08,
      marginBottom: hp("7%"),
      textAlign: "center",
      color: "#A383FB",
      fontWeight: "bold"
    },

    fotoContainer: {
        alignItems: "center",
        justifyContent: "center",
        // marginTop: -60,
        // marginBottom: 10,
    },

    fotoPerfil: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: "#fff",
        backgroundColor: "#A383FB"
    },

    fotoPerfil2: {
        width: "100%",
        height: "100%",
        margin: 57,
    },

    

    iconeEditar: {
        position: "absolute",
        bottom: 5,
        right: width * 0.35,
        backgroundColor: "#A383FB",
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },

    btn: {
        width: wp("50%"),
        height: hp("5%"),
        borderColor: "#A383FB",
        borderWidth: 1.5,
        borderRadius: 12,
        fontSize: width * 0.14,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#A383FB",
    },

    mensagemErro: {
      color: "red",
      marginTop: 5,
      fontSize: 14,
    },


  containerBotoes: {
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: height * 0.05,
  },
  containerBotoes2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp("7%"),
    marginTop: hp("10%"),
  },

  btnVoltar: {
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: 100,
    backgroundColor: "#A383FB",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },

  setaVoltar: {
    color: "#ffffff",
    fontSize: width * 0.07,
    fontWeight: "bold",
    marginBottom: 4,
  },

  btnProximo: {
    flexDirection: "row",
    backgroundColor: "#A383FB",
    width: "70%",
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
  },

  textoProximo: {
    color: "#FFFFFF",
    fontSize: width * 0.05,
    fontWeight: "500",
  },

  circuloSeta: {
    width: width * 0.10,
    height: width * 0.10,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  setaProximo: {
    color: "#A383FB",
    fontSize: width * 0.06,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
