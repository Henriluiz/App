import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  // Container principal
  containerAgenda: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    marginBottom: 20,
  },

  scrollAgenda: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10, // Aumentado para dar espaço ao footer fixo
  },

  // CARDS
  cardAgenda: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 25,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  tituloCard: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 20,
  },

  // SELETOR DE DATA COM SETAS
  seletorDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#F4F6FB",
    borderRadius: 15,
  },

  setaBotao: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
  },

  setaBotaoDesabilitado: {
    opacity: 0.5,
  },

  dataDisplayContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  dataDisplayDia: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    marginBottom: 4,
    textTransform: "capitalize",
  },

  dataDisplayData: {
    fontSize: 32,
    fontWeight: "700",
    color: "#290041",
    lineHeight: 40,
  },

  dataDisplayMes: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    textTransform: "capitalize",
  },

  // Exibição da data selecionada completa
  dataExibicao: {
    backgroundColor: "#EAE0FF",
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 15,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#8E7CFF",
  },

  dataExibicaoTexto: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontWeight: "500",
    textTransform: "capitalize",
  },

  dataExibicaoData: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
    textTransform: "capitalize",
  },

  // HORÁRIOS
  horariosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  horaButton: {
    width: "48%",
    paddingVertical: 16,
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor: "#F4F6FB",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },

  horaButtonSelected: {
    backgroundColor: "#8E7CFF",
    borderColor: "#6B5EFF",
  },

  horaTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },

  horaTextoSelected: {
    color: "#FFFFFF",
  },

  // Loading e vazio
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  vazioContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  vazioTexto: {
    fontSize: 14,
    color: "#999",
    marginTop: 12,
    textAlign: "center",
  },

  // FOOTER COM BOTÕES - SEMPRE VISÍVEL
  footerAgenda: {
    position: "absolute",
    bottom: 60, // Deixa espaço para a NavBar
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    gap: 12,
    zIndex: 10, // Para ficar acima de outros elementos
  },

  botaoCancelar: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoCancelarTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  botaoConfirmar: {
    flex: 1.3,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#8E7CFF",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoConfirmarTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // MODAL SUCESSO
  modalOverlaySucesso: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },

  modalSucessoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  sucessoTexto: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
    marginTop: 16,
    textAlign: "center",
  },
});