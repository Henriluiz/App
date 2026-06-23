import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A383FB",
  },

  header: {
    paddingTop: height * 0.02,
    paddingHorizontal: width * 0.07,
  },

  /* ================= TITULOS ================= */

  titulo1: {
    marginTop: height * 0.06,
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

  /* ================= CARD ================= */

  card: {
    flex: 1,
    marginTop: height * 0.05,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: width * 0.06,
  },

  tituloCard: {
    fontSize: width * 0.07,
    marginBottom: height * 0.015,
    color: "#A383FB",
  },

  contInput: {
    marginTop: height * 0.001,
  },

  /* ================= INPUTS ================= */

  label: {
    fontSize: width * 0.04,
    color: "#A383FB",
    marginTop: height * 0.02,
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
  
  inputSenha: {
    width: "100%",
    height: 50,
    borderColor: "#A383FB",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: width * 0.04,
  },

  

  inputErro: {
    borderColor: "red",
  },

  mensagemErro: {
    marginTop: height * 0.008,
    color: "red",
    fontSize: width * 0.035,
  },

  /* ================= CHECKBOX ================= */

  containerCheckbox: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: height * 0.025,
  },

  checkbox: {
    width: width * 0.055,
    height: width * 0.055,
    borderWidth: 2,
    borderColor: "#8E6CEF",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: width * 0.025,
  },

  checkboxAtivo: {
    backgroundColor: "#8E6CEF",
  },

  check: {
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  textoTermos: {
    flex: 1,
    fontSize: width * 0.035,
    color: "#8E6CEF",
  },

  link: {
    fontWeight: "bold",
  },

  botaoDesativado: {
    opacity: 0.5,
  },

  /* ================= BOTÕES ================= */

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

  // Adicione estas novas propriedades ao seu StyleSheet
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#A383FB",
    borderWidth: 1.5,
    borderRadius: 12,
    width: "100%",
    height: 50,
    paddingHorizontal: 15,
  },

  inputSenhaWithIcon: {
    flex: 1,
    height: 50,
    fontSize: width * 0.04,
    paddingRight: 10,
    color: "#A383FB",
  },

  iconEye: {
    paddingHorizontal: 5,
  },
});
