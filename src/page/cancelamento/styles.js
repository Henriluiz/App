import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  // 🔹 BASE
  containerAgenda: {
    flex: 1,
    backgroundColor: "#F5F3FF",
  },

  scrollAgenda: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 140, // evita botão sobrepor conteúdo
  },

  // 🔹 HEADER
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 12,
  },

  headerBackButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F4F0FF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#8E7CFF",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },

  headerTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
  },

  headerSubtitulo: {
    fontSize: 13,
    color: "#8E7CFF",
  },

  // 🔹 CARD PADRÃO
  cardAgenda: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  tituloCard: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8E7CFF",
    marginBottom: 16,
  },

  // 🔴 ALERTA (CANCELAMENTO)
  alertaCard: {
    backgroundColor: "#FFF5F5",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#FF6B6B",
    marginBottom: 16,
  },

  alertaTitulo: {
    color: "#FF3B3B",
    fontWeight: "700",
    marginBottom: 4,
  },

  alertaTexto: {
    color: "#FF3B3B",
    fontSize: 13,
    marginBottom: 10,
  },

  alertaNome: {
    fontSize: 15,
    fontWeight: "700",
    color: "#290041",
  },

  alertaInfo: {
    fontSize: 13,
    color: "#444",
  },

  // 🔹 MOTIVOS (UX MELHORADA)
  motivoButton: {
    backgroundColor: "#F4F6FB",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  motivoSelecionado: {
    backgroundColor: "#8E7CFF",
    borderColor: "#8E7CFF",
  },

  motivoTexto: {
    color: "#444",
    fontWeight: "500",
  },

  motivoTextoSelecionado: {
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // 🔹 DATA (mais clean)
  seletorDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 10,
    backgroundColor: "#F4F6FB",
    borderRadius: 14,
  },

  setaBotao: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#ECEBFF",
  },

  setaBotaoDesabilitado: {
    opacity: 0.4,
  },

  dataDisplayContainer: {
    alignItems: "center",
  },

  dataDisplayDia: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },

  dataDisplayData: {
    fontSize: 28,
    fontWeight: "700",
    color: "#290041",
  },

  dataDisplayMes: {
    fontSize: 12,
    color: "#999",
  },

  // 🔹 HORÁRIOS
  horariosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  horaButton: {
    width: "48%",
    paddingVertical: 14,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: "#F4F6FB",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  horaButtonSelected: {
    backgroundColor: "#8E7CFF",
    borderColor: "#8E7CFF",
  },

  horaTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#555",
  },

  horaTextoSelected: {
    color: "#FFFFFF",
  },

  // 🔹 EMPTY / LOADING
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  vazioContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },

  vazioTexto: {
    fontSize: 14,
    color: "#999",
    marginTop: 10,
    textAlign: "center",
  },

  // 🔹 FOOTER FIXO
  footerAgenda: {
    position: "absolute",
    bottom: 70,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,

    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },

  // 🔴 BOTÃO CANCELAR (PRINCIPAL)
  botaoCancelarFinal: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",

    shadowColor: "#FF6B6B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },

  botaoCancelarFinalTexto: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  // 🔵 BOTÃO PADRÃO
  botaoConfirmar: {
    backgroundColor: "#8E7CFF",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  botaoConfirmarTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  // 🔥 CARD SESSÃO
  sessaoCard: {
    backgroundColor: "#F4EDFF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D6CCFF",

    shadowColor: "#8E7CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  sessaoStatus: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 4,
  },

  sessaoNome: {
    fontSize: 15,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 6,
  },

  sessaoHorarioRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  sessaoHorario: {
    fontSize: 13,
    color: "#666",
  },

  sessaoToque: {
    marginTop: 8,
    fontSize: 12,
    color: "#8E7CFF",
    fontWeight: "600",
  },
});