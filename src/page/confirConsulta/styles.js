import { StyleSheet, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  // Container principal
  container: {
    flex: 1,
    backgroundColor: "#EDE9FF",
  },
 
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 160,
  },
 
  // CABEÇALHO
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
    gap: 10,
  },
 
  headerVoltar: {
    padding: 4,
  },
 
  headerTitulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#8E7CFF",
  },
 
  // CARD BRANCO
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#8E7CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
 
  cardTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 20,
  },
 
  // CAIXAS DE INFO
  infoBox: {
    backgroundColor: "#F7F5FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,

    // Sombra (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 }, // simula "distribuição"
    shadowOpacity: 0.15,
    shadowRadius: 4, // desfoque

    // Sombra (Android)
    elevation: 3,
  },
 
  infoLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 4,
  },
 
  infoValor: {
    fontSize: 14,
    color: "#444",
    fontWeight: "400",
  },
 
  infoEspecialidade: {
    fontSize: 13,
    color: "#8E7CFF",
    fontWeight: "500",
    marginTop: 2,
  },
 
  // LINHA DE VALOR
  valorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 4,
  },
 
  valorLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
 
  valorPreco: {
    fontSize: 15,
    fontWeight: "700",
    color: "#290041",
  },
 
  // FOOTER COM BOTÕES
  footer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#EDE9FF",
    gap: 12,
  },
 
  botaoSolicitar: {
    backgroundColor: "#8E7CFF",
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
 
  botaoSolicitarTexto: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
 
  botaoVoltar: {
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#8E7CFF",
    backgroundColor: "transparent",
  },
 
  botaoVoltarTexto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8E7CFF",
  },
});