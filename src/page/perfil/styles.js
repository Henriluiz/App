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
    width: 140,
    height: 140,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    backgroundColor: "#6C63FF"
  },

  fotoPerfil2: {
    width: "100%",
    height: "100%",
    margin: 40,
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
    marginHorizontal: 20,
  },

  // 🔥 MAIS ESPAÇO GERAL
  container2: {
    flex: 1,
    marginTop: height * 0.04,
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: height * 0.02,
  },

  colunaEsquerda: {
    width: 150,
  },

  colunaDireita: {
    width: 150,
  },

  // 🔥 MAIS ESPAÇO ENTRE LINHAS
  rowWrap: {
    flexDirection: "row",
    gap: 15,
    marginTop: 20,
  },

  colunaFlex: {
    flex: 1,
  },

  // 🔥 LABEL MAIS ESPAÇADO
  label: {
    fontSize: width * 0.04,
    color: "#000000",
    marginTop: 10,
    marginBottom: 8,
    fontWeight: "600",
  },

  dados: {
    width: "100%",
    height: 30,
    borderColor: "transparent",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 8,
    fontSize: width * 0.04,
    textAlignVertical: "center",
  },

  inputEditando: {
    borderWidth: 1.5,
    borderColor: "#A383FB",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
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
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 12,
    height: 35,
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

  botaoExcluir: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
  },

  textoExcluir: {
    color: "#FF4B4B",
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