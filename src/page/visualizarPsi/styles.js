import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  container: {
    backgroundColor: "#EAE0FF",
    alignItems: "center",
    paddingTop: 0
  },

  card: {
    // flex: 0.7,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: hp("80%"),
    marginHorizontal: 30,
    marginVertical: 25,
  },

  fotoContainer: {
    alignItems: "center",
    marginVertical: 10,
  },

  fotoPerfil: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#ffffff",
    backgroundColor: "#8E7CFF",
    alignItems: "center",
    justifyContent: "center"
  },

  fotoPerfil2: {
    marginTop: 30,
  },

  nomePessoa: {
    color: "#290041",
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
    marginInline: 25,
  },

  nickname: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
    color: "black",
    fontWeight: "bold"
  },

  container2: {
    flex: 1,
    paddingHorizontal: 20,
    // paddingVertical: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: height * 0.02,
  },

  tituloCard: {
    color: "#290041",
    marginBottom: 10,
    fontSize: 20,
    fontWeight: '600'
  },

  rowWrap: {
    marginTop: 5,
    marginBottom: 15,
  },

  rowCont: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
  },

  profissao: {
    textAlign: "center",
    color: "#A383FB",
    fontSize: 15,
  },

  label: {
    fontSize: 16,
    color: "#000000",
    marginTop: 10,
    marginBottom: 8,
  },

  texto: {
    fontSize: width * 0.035,
    color: '#666',
    lineHeight: 20,
  },

  textoCont: {
    fontSize: width * 0.035,
    color: '#666',
  },

  /* MODAL MENU */
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
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  estrelas: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  textoAvaliacao: {
    fontSize: 18,
    color: "#F89034",
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

  botao: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#8E7CFF",
    borderRadius: 12,
    marginTop: 12,
    width: "100%",
    height: 50,
    elevation: 3,
  },
  
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15, 
  },


});