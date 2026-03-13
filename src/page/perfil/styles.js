import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  //ESTOU EM DUVIDA ENTRE ESSES DOIS MODOS
  header: {
    paddingTop: height * 0.24,
    //height: 120,
  },

botaoEditar: {
  backgroundColor: "#4400ff",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
  marginTop: 20
},

textoBotao: {
  color: "#000000",
  fontWeight: "bold",
  fontSize: 16
},

  card: {
  flex: 1,
  backgroundColor: "#66E4D5",
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  },

fotoContainer: {
  alignItems: "center",
  marginTop: -60,
  marginBottom: 10,
},

fotoPerfil: {
  width: 110,
  height: 110,
  borderRadius: 60,
  borderWidth: 4,
  borderColor: "#fff",
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

  nomePessoa: {
  color: "#ffffff",
  fontSize: 25,
  marginBottom: 10,
  textAlign: "center",
},

nickname: {
  fontSize: 20,
  marginBottom: 20,
  textAlign: "center",
  color: "#A383FB",
},

botaoEditar: {
  backgroundColor: "#ffffff",
  width: "25%",
  height: 25,
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "center",
},

  tituloCard: {
    fontSize: width * 0.07,
    color: "#A383FB",
    marginTop: height * 0.03,
    marginHorizontal: 20,
},

  container2: {
    flex: 1,
    marginTop: height * 0.05,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: height * 0.02,
},

  rowWrap: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
},

  colunaFlex: {
    flex: 1,
},

  label: {
    fontSize: width * 0.04,
    color: "#000000",
    marginTop: 10,
    marginBottom: 5,
},

  input: {
    width: "100%",
    height: 50,
    borderColor: "transparent",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: width * 0.04,
},

  inputEditando: {
    borderWidth: 1.5,
    borderColor: "#A383FB",
},

  inputEmail: {
    width: "100%",
    height: 50,
    borderColor: "transparent",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: width * 0.04,
},

  pickerContainer: {
    width: "100%",
    height: 50,
    borderColor: "transparent",
    borderWidth: 1.5,
    borderRadius: 12,
    justifyContent: "center",
},

  pickerEditando: {
    borderWidth: 1.5,
    borderColor: "#A383FB",
},

  nicknameContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 15,
},

  nicknameEditando: {
    borderWidth: 1.5,
    borderColor: "#A383FB",
},

  arroba: {
    color: "#999",
    fontSize: width * 0.04,
    marginRight: 4,
},

  nicknameInput: {
    flex: 1,
    width: "100%",
    fontSize: width * 0.04,
},

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    //padding: 15,
    padding: 40,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
},
  topo: {
  position: "absolute",
  top: 50,
  right: 20,
  zIndex: 10,
},

  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 20,
},

  fecharModal: {
    position: "absolute",
    top: 50,
    right: 20,
},

  modalTitulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
},

  opcao: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
},
});