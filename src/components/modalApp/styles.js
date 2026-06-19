import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
 
  caixa: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
  },
 
  icone: {
    marginBottom: 16,
  },
 
  titulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
    textAlign: "center",
    marginBottom: 10,
  },
 
  mensagem: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
 
  // ── Modo duplo ──
  botoesLinha: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
 
  botaoCancelar: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#C5BCFF",
    alignItems: "center",
    justifyContent: "center",
  },
 
  botaoCancelarTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: "#8E7CFF",
  },
 
  botaoConfirmar: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#8E7CFF",
    alignItems: "center",
    justifyContent: "center",
  },
 
  botaoConfirmarTexto: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
 
  // ── Modo padrão ──
  botaoOk: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#8E7CFF",
    alignItems: "center",
    justifyContent: "center",
  },
 
  botaoOkTexto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});