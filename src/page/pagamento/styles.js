import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A78BFA",
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 140,
  },

  // HEADER
  headerContainer: {
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  botaoBack: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#BDBDBD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  headerTitulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#9B7BFF",
  },

  // CARD RESUMO
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#8C8C8C",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  perfilRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 81,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 2,
    borderColor: "#FFA4A4", 
  },
  perfilInfo: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 4,
  },
  especialidade: {
    fontSize: 14,
    color: "#46C2BE",
    fontWeight: "600",
  },
  infoContainer: {
    gap: 12,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoTexto: {
    fontSize: 15,
    color: "#757575",
    marginLeft: 12,
  },
  divisor: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginHorizontal: -24,
    marginBottom: 20,
  },
  valorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  valorLabel: {
    fontSize: 16,
    color: "#757575",
    fontWeight: "500",
  },
  valorPreco: {
    fontSize: 22,
    fontWeight: "800",
    color: "#000000",
  },

  // SEÇÃO FORMA DE PAGAMENTO
  formaTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#310062",
    marginTop: 28,
    marginBottom: 16,
  },
  pagamentoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 3,
    borderColor: "transparent",
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  pagamentoCardSelecionado: {
    borderColor: "#76EAD7", 
  },
  pagamentoLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioIcon: {
    marginRight: 12,
  },
  textosPagamento: {
    marginLeft: 12,
  },
  pagamentoTitulo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000000",
  },
  pagamentoSub: {
    fontSize: 13,
    color: "#757575",
    marginTop: 2,
  },

  // TAG RECOMENDADO
  tagRecomendado: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#A7FFEB",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 14,
  },
  tagRecomendadoTexto: {
    fontSize: 10,
    fontWeight: "800",
    color: "#004D40",
  },

  // SELO DE SEGURANÇA
  seloSeguranca: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#46C2BE",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 10,
    backgroundColor: "rgba(70, 194, 190, 0.1)",
  },
  seloSegurancaTexto: {
    fontSize: 13,
    color: "#4A4A4A",
    marginLeft: 8,
    fontWeight: "500",
  },

  // FOOTER E BOTÃO NOVO (VERDE)
  footer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },
  botaoPagar: {
    backgroundColor: "#40BFA7",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  botaoPagarTexto: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  botaoPagarValor: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});