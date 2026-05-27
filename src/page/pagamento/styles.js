import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9FF",
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 180,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
    gap: 10,
  },

  headerVoltar: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "rgba(142, 124, 255, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#8E7CFF",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 24,
    shadowColor: "#8E7CFF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 6,
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 20,
  },

  fotoContainer: {
    alignItems: "center",
    marginBottom: 18,
  },

  fotoPerfil: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#8E7CFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  imagem: {
    width: "100%",
    height: "100%",
  },

  infoBox: {
    backgroundColor: "#F7F5FF",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },

  infoLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 6,
  },

  infoValor: {
    fontSize: 15,
    color: "#242424",
    fontWeight: "600",
  },

  infoEspecialidade: {
    fontSize: 13,
    color: "#8E7CFF",
    fontWeight: "500",
    marginTop: 4,
  },

  valorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
    paddingHorizontal: 4,
  },

  valorLabel: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },

  valorPreco: {
    fontSize: 18,
    fontWeight: "700",
    color: "#290041",
  },

  footer: {
    position: "absolute",
    bottom: 72,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
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
