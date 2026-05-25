import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8E7CFF",
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
    backgroundColor: "#00000050",
    justifyContent: "center",
    alignItems: "center",
  },

  btnVoltarPressed: {
    backgroundColor: "#A383FB",
  },

  setaVoltar: {
    color: "#ffffff",
    fontSize: width * 0.07,
    fontWeight: "bold",
  },

  card: {
    flex: 1,
    backgroundColor: "#8E7CFF",
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
    paddingHorizontal: 22,
    paddingVertical: 18,
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

  itemTextContainer: {
    flex: 1,
    marginRight: 12,
  },

  previewText: {
    color: "#444",
    fontSize: 14,
    fontWeight: "600",
    flexShrink: 1,
    textAlign: "right",
    marginRight: 10,
  },

  fieldCard: {
    backgroundColor: "#FFFFFF",
    marginTop: height * 0.01,
    padding: 20,
    borderRadius: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },

  input: {
    width: "100%",
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#8E7CFF",
    backgroundColor: "#F8F4FF",
    fontSize: 16,
    color: "#000",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(142, 124, 255, 0.18)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalContent: {
    width: "100%",
    backgroundColor: "#F8F4FF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#6C63FF",
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
    borderWidth: 1,
    borderColor: "#E6E0FF",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#6C63FF",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },

  modalButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  modalCancel: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8D0FF",
    marginRight: 10,
  },

  modalSave: {
    backgroundColor: "#8E7CFF",
  },

  modalButtonText: {
    color: "#6C63FF",
    fontWeight: "bold",
  },

  modalSaveText: {
    color: "#FFFFFF",
  },

  texto: {
    fontSize: 16,
    color: "#444",
    flex: 1,
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