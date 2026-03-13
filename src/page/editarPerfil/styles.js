import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerBotoes: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: height * 0.05,
  },

  btnVoltar: {
    marginHorizontal: height * 0.02,
    width: width * 0.13,
    height: width * 0.13,
    borderRadius: 100,
    backgroundColor: "#0000004b",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.8,
  },

  setaVoltar: {
    color: "#ffffff",
    fontSize: width * 0.07,
    fontWeight: "bold",
  },

  card: {
    flex: 1,
    backgroundColor: "#66E4D5",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  item: {
    backgroundColor: "#FFFFFF",
    marginTop: height * 0.01,
    padding: 30,
    borderRadius: 15,
    marginBottom: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  texto: {
    fontSize: 16,
    color: "#444",
  },

  botoesContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginTop: 30,
},

botaoExcluir: {
  flex: 1,
  backgroundColor: "#FFF",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
  marginRight: 10,
  padding: 30
},

botaoSalvar: {
  flex: 1,
  backgroundColor: "#E8EBFF",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
  padding: 30
},

textoExcluir: {
  color: "#FF4B4B",
  fontWeight: "bold",
},

textoSalvar: {
  color: "#6A6FEF",
  fontWeight: "bold",
},

  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 40,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
});