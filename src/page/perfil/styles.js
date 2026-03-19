import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  //ESTOU EM DUVIDA ENTRE ESSES DOIS MODOS
  header: {
    paddingTop: height * 0.15,
    //height: 120,
  },

  //BOTÃO DE EDITAR TESTE
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
    backgroundColor: "#8E7CFF",
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
    marginTop: height * 0.03,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: height * 0.02,
  },

  colunaEsquerda: {
    width: 150, // Largura fixa
  },

  colunaDireita: {
    width: 150, // Largura fixa
  },

  rowWrap: {
    flexDirection: "row",
    gap: 15,
    marginTop: 5,
  },

  colunaFlex: {
    flex: 1, // Divide o espaço igualmente
    // alignItems: 'center', // Centraliza o conteúdo horizontalmente
  },

  label: {
    fontSize: width * 0.04,
    color: "#000000",
    marginTop: 10,
    marginBottom: 5,
  },

  dados: {
    width: "100%",
    height: 25,
    borderColor: "transparent",
    borderWidth: 1.5,
    borderRadius: 12,
    paddingHorizontal: 5,
    fontSize: width * 0.04,
    textAlignVertical: "center",
    textAlign: "center",
},

  inputEditando: {
    borderWidth: 1.5,
    borderColor: "#A383FB",
},

  dadoEmail: {
    width: "100%",
    fontSize: width * 0.04,
    marginTop: 5,
    textAlign: "left",
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
    alignItems: "left",
    borderWidth: 1.5,
    borderColor: "transparent",
    borderRadius: 12,
    height: 30,
    paddingHorizontal: 12,
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
    padding: 25,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
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
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 10,
    padding: 30
  },
    
    textoExcluir: {
    color: "#FF4B4B",
    fontWeight: "bold",
  },

  // _____ SOBRE O MODAL DE CONFIRMAÇÃO DE DELETE_______
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