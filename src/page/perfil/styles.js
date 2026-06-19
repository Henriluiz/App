import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    paddingTop: height * 0.15,
  },

  card: {
    flex: 1,
    backgroundColor: "#8E7CFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  fotoContainer: {
    alignItems: "center",
    marginTop: -60,
    marginBottom: 15,
  },

  fotoPerfil: {
    width: width * 0.35,
    height: width * 0.35,
    maxWidth: 140,
    maxHeight: 140,
    minWidth: 110,
    minHeight: 110,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
  },

  fotoPerfil2: {
    width: 50,
    height: 50,
  },

  nomePessoa: {
    color: "#ffffff",
    fontSize: 25,
    marginBottom: 8,
    textAlign: "center",
  },

  nickname: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  },

  tituloCard: {
    fontSize: width * 0.07,
    color: "#A383FB",
    marginTop: height * 0.04,
    marginBottom: 10,
    marginHorizontal: width * 0.05,
  },

  // 🔥 MAIS ESPAÇO GERAL
  container2: {
    flex: 1,
    marginTop: height * 0.04,
    paddingHorizontal: width * 0.05,
    paddingBottom: 40,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: width * 0.03,
  },

  colunaEsquerda: {
    flex: 1,
    marginRight: 10,
    minWidth: 0,
  },

  colunaDireita: {
    flex: 1,
    minWidth: 0,
  },

  // 🔥 MAIS ESPAÇO ENTRE LINHAS
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "stretch",
    justifyContent: "space-between",
    gap: 15,
    marginTop: 20,
  },

  colunaFlex: {
    flex: 1,
    minWidth: 0,
  },

  // 🔥 LABEL MAIS ESPAÇADO
  label: {
    fontSize: width * 0.04,
    color: "#000000",
    marginTop: 10,
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    width: "100%",
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#F7F7FB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: width * 0.04,
    color: "#000",
  },

  fieldValue: {
    width: "100%",
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: "#F7F7FB",
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
  },

  fieldValueText: {
    fontSize: width * 0.04,
    color: "#000",
  },

  inputEditando: {
    borderWidth: 1.5,
    borderColor: "#A383FB",
    backgroundColor: "#FFFFFF",
  },

  dadoEmail: {
    width: "100%",
    fontSize: width * 0.04,
    marginTop: 5,
    textAlign: "left",
  },

  nicknameContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    height: 46,
    backgroundColor: "#F7F7FB",
    paddingHorizontal: 12,
  },

  arroba: {
    color: "#999",
    fontSize: width * 0.04,
    marginRight: 4,
  },

  topo: {
    position: "absolute",
    top: 25,
    right: 20,
    zIndex: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "#F8F4FF",
    paddingTop: 60,
    paddingHorizontal: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  fecharModal: {
    position: "absolute",
    top: 40,
    right: 20,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  imagem: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 80,
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

  botaoEditar: {
    backgroundColor: "#ffffff",
    width: "25%",
    height: 25,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },

  modalTitulo: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#6C63FF",
  },

  modalSubtitulo: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },

  opcao: {
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  opcaoConteudo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  opcaoTextoContainer: {
    flex: 1,
  },

  opcaoTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#141414",
  },

  opcaoLegenda: {
    marginTop: 4,
    color: "#7A7A7A",
    fontSize: 14,
  },

  opcaoSaida: {
    borderColor: "#FF4B4B",
    borderWidth: 1,
  },

  botaoExcluir: {
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  textoExcluir: {
    color: "#FF4B4B",
    fontWeight: "bold",
  },

  textoBotao: {
    fontSize: 16,
    color: "#6C63FF",
    fontWeight: "bold",
  },

  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalContainer2: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },

  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },

  icon: {
    fontSize: 30,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },

  warningText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },

  userInfo: {
    fontSize: 14,
    color: '#999',
    marginBottom: 15,
  },

  confirmContainer: {
    width: '100%',
    marginBottom: 20,
  },

  confirmText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },

  boldText: {
    fontWeight: 'bold',
    color: '#ff4444',
  },

  confirmInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  cancelButton: {
    backgroundColor: '#f0f0f0',
  },

  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },

  deleteButton: {
    backgroundColor: '#ff4444',
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

});