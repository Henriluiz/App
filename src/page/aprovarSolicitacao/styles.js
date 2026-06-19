import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  // ── Layout base ─────────────────────────────────────────────────────────────
  container: {
    flex: 1,
    backgroundColor: "#EDE9FF",
  },

  scroll: {
    marginTop: 15,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 50,
    gap: 16,
  },

  // ── Badge de tipo ────────────────────────────────────────────────────────────
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 50,
    borderWidth: 1.5,
    gap: 8,
  },

  badgeTexto: {
    fontSize: 13,
    fontWeight: "700",
  },

  // ── Subtítulo explicativo ────────────────────────────────────────────────────
  subtitulo: {
    fontSize: 14,
    color: "#555",
    lineHeight: 21,
    fontWeight: "400",
  },

  // ── Card branco genérico ─────────────────────────────────────────────────────
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    shadowColor: "#8E7CFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    gap: 12,
  },

  cardTitulo: {
    fontSize: 16,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 4,
  },

  // ── Card "nova proposta" com borda roxa ──────────────────────────────────────
  cardNovo: {
    borderWidth: 1.5,
    borderColor: "#C4BBFF",
    backgroundColor: "#FAF9FF",
  },

  cardNovoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  // ── Linha de info ────────────────────────────────────────────────────────────
  infoBox: {
    backgroundColor: "#F7F5FF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  infoBoxNovo: {
    backgroundColor: "#EDE9FF",
    borderColor: "#D5CEFF",
  },

  infoLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 3,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  infoValor: {
    fontSize: 14,
    color: "#444",
    fontWeight: "400",
  },

  // ── Psicólogo row ────────────────────────────────────────────────────────────
  psicRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EDE9FF",
    alignItems: "center",
    justifyContent: "center",
  },

  psicNome: {
    fontSize: 15,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 2,
  },

  psicBio: {
    fontSize: 13,
    color: "#8E7CFF",
    fontWeight: "500",
  },

  // ── Footer fixo ──────────────────────────────────────────────────────────────
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 15,
    backgroundColor: "#EDE9FF",
    gap: 12,
  },

  botaoAceitar: {
    backgroundColor: "#8E7CFF",
    borderRadius: 50,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoAceitarTexto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  botaoRecusar: {
    borderRadius: 50,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FF5A5F",
    backgroundColor: "transparent",
  },

  botaoRecusarTexto: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FF5A5F",
  },

  // ── Modal sucesso ─────────────────────────────────────────────────────────────
  successOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  successContainer: {
    alignItems: "center",
    gap: 16,
  },

  successIconWrap: {
    marginBottom: 8,
  },

  successTexto: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
});