import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  // ─────────────────────────────────────────
  // CONTAINER PRINCIPAL
  // ─────────────────────────────────────────
  containerAgenda: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    marginBottom: 20,
  },

  scrollAgenda: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },

  // ─────────────────────────────────────────
  // CABEÇALHO (MinhasSessoes)
  // ─────────────────────────────────────────
  headerSessoes: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerVoltar: {
    marginRight: 12,
    padding: 4,
  },

  headerTitulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#290041",
  },

  // ─────────────────────────────────────────
  // CARDS GENÉRICOS
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // SELETOR DE DATA COM SETAS
  // ─────────────────────────────────────────
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
    opacity: 0.4,
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

  // Faixa de data completa
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

  // ─────────────────────────────────────────
  // LISTA DE SESSÕES
  // ─────────────────────────────────────────
  sessoesLista: {
    gap: 12,
  },

  sessaoCard: {
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
  },

  sessaoStatus: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 6,
  },

  sessaoNome: {
    fontSize: 16,
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
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },

  sessaoToque: {
    fontSize: 12,
    color: "#8E7CFF",
    fontWeight: "500",
    marginTop: 10,
    textAlign: "right",
  },

  // ─────────────────────────────────────────
  // LOADING E VAZIO
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // HORÁRIOS (DataHoraConsulta)
  // ─────────────────────────────────────────
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

  // ─────────────────────────────────────────
  // FOOTER FIXO (DataHoraConsulta)
  // ─────────────────────────────────────────
  footerAgenda: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    gap: 12,
    zIndex: 10,
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

  // ─────────────────────────────────────────
  // MODAL BOTTOM SHEET (MinhasSessoes)
  // ─────────────────────────────────────────

  // Overlay escuro atrás do sheet
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  // Painel branco que sobe de baixo
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 20,
  },

  // Barra de arraste no topo do sheet
  bottomSheetHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    marginBottom: 20,
  },

  // Bloco de info da sessão dentro do sheet
  bottomSheetSessaoInfo: {
    marginBottom: 16,
  },

  bottomSheetNome: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 6,
  },

  // Divisor entre info e botões
  bottomSheetDivisor: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginBottom: 20,
  },

  // Grupo de botões
  bottomSheetBotoes: {
    gap: 12,
  },

  // Botão Reagendar (roxo sólido)
  botaoReagendar: {
    backgroundColor: "#8E7CFF",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoReagendarTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // Botão Cancelar Consulta (vermelho/rosa sólido)
  botaoCancelarConsulta: {
    backgroundColor: "#F06292",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  botaoCancelarConsultaTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // Botão Voltar (contorno roxo)
  botaoVoltarSheet: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#8E7CFF",
    backgroundColor: "transparent",
  },

  botaoVoltarSheetTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8E7CFF",
  },

  // ─────────────────────────────────────────
  // MODAL DE SUCESSO (DataHoraConsulta)
  // ─────────────────────────────────────────
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