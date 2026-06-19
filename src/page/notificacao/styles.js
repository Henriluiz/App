import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDE9FF",
  },

  header: {
    backgroundColor: "#8E7CFF",
    paddingTop: 45,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerContent: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  // ABAS
  tabsContainer: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F0E9FF",
  },

  tabsContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },

  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "transparent",
  },

  tabAtiva: {
    backgroundColor: "#8E7CFF",
  },

  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#BBBBBB",
  },

  tabTextAtiva: {
    color: "#FFFFFF",
  },

  // LISTA DE NOTIFICAÇÕES
  notificacoesList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  notificacaoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#F3EEFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  notificacaoContent: {
    flex: 1,
  },

  notificacaoTitulo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 4,
  },

  notificacaoDescricao: {
    fontSize: 13,
    color: "#999999",
    lineHeight: 18,
  },

  notificacaoRight: {
    alignItems: "center",
    gap: 8,
  },

  notificacaoHora: {
    fontSize: 12,
    color: "#BBBBBB",
    fontWeight: "500",
  },

  indicadorNaoLido: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#8E7CFF",
  },

  centroFeedback: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    gap: 12,
  },

  feedbackTexto: {
    color: "#9CA3AF",
    fontSize: 15,
    textAlign: "center",
    paddingHorizontal: 32,
  },

  tentarNovamente: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#8E7CFF",
  },

  tentarNovamenteTexto: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
});