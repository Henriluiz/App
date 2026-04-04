import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  header: {
    paddingTop: height * 0.15,
  },

  topo: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 10,
  },

  card: {
    flex: 1,
    backgroundColor: "#5DE2D4",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  fotoContainer: {
    alignItems: "center",
    marginTop: -60,
    marginBottom: 10,
  },

  fotoPerfil: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#ffffff",
    backgroundColor: "#6C63FF"
  },

  fotoPerfil2: {
    margin: 40,
  },

  nomePessoa: {
    color: "#ffffff",
    fontSize: 25,
    marginBottom: 5,
    textAlign: "center",
  },

  nickname: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },

  container2: {
    flex: 1,
    marginTop: height * 0.05,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: height * 0.02,
  },

  tituloCard: {
    fontSize: width * 0.07,
    color: "#A383FB",
    marginBottom: 10,
  },

  rowWrap: {
    marginTop: 20,
  },

  label: {
    fontSize: width * 0.04,
    color: "#000000",
    marginTop: 10,
    marginBottom: 8,
    fontWeight: "bold",
  },

  texto: {
    fontSize: width * 0.035,
    color: '#666',
    lineHeight: 22,
  },

  /* MODAL */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },

  handle: {
    width: 40,
    height: 5,
    backgroundColor: "#ccc",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 10,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  opcao: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  textoOpcao: {
    fontSize: 16,
    textAlign: "center",
  },

  infoContainer: {
    alignItems: "center",
    marginTop: 5,
  },

  estrelas: {
    flexDirection: "row",
    gap: 3,
  },

  textoAvaliacao: {
    fontSize: 14,
    marginTop: 4,
    color: "#6C63FF",
  },

  linhaInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 6,
  },

  textoInfo: {
    color: "#6C63FF",
    fontSize: 14,
  },
});