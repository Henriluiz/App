import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A383FB",
  },

  header: {
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.07,
  },

  titulo1: {
    fontSize: width * 0.08,
    color: "#ffffff",
  },

  destaque: {
    color: "#9bf3ff",
    fontSize: width * 0.09,
    fontWeight: "bold",
  },

  descricao: {
    fontSize: width * 0.045,
    marginTop: height * 0.02,
    color: "#ffffff",
  },

  card: {
    flex: 1,
    marginTop: height * 0.04,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: width * 0.06,
  },

  tituloCard: {
    fontSize: width * 0.07,
    marginBottom: 10,
    color: "#A383FB",
  },

  contInput: {
    marginTop: 10,
  },

  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  colunaFlex: {
    flex: 1,
    minWidth: 140,
  },

  label: {
    fontSize: width * 0.04,
    color: "#A383FB",
    marginTop: 15,
  },

  input: {
    width: "100%",
    height: 50,
    borderColor: "#A383FB",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: width * 0.04,
  },

  nicknameContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#A383FB",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
  },

  arroba: {
    color: "#A383FB",
    fontSize: width * 0.04,
    marginRight: 4,
  },

  nicknameInput: {
    flex: 1,
    width: "100%",
    fontSize: width * 0.04,
  },

  pickerContainer: {
    width: "100%",
    height: 50,
    borderColor: "#A383FB",
    borderWidth: 1.5,
    borderRadius: 12,
    justifyContent: "center",
  },

  mensagemErro: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },


  containerBotoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: height * 0.05,
  },

  btnVoltar: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 100,
    backgroundColor: "#A383FB",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },

  setaVoltar: {
    color: "#ffffff",
    fontSize: width * 0.07,
    marginBottom: 7,
    marginRight: 3,
    fontWeight: "bold",
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
    fontSize: width * 0.07,
    marginBottom: 5,
    marginLeft: 3,
    fontWeight: "bold",
  },
});
