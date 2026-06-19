import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FB",
  },

  // 🔹 HEADER
  header: {
    backgroundColor: "#8E7CFF",
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 10,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
    elevation: 3,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
  },

  filtros: {
    flexDirection: "row",
    marginTop: 15,
    gap: 10,
    alignItems: "center",
  },

  filtroBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    gap: 6,
    elevation: 3,
  },

  filtroTexto: {
    color: "#6B5EFF",
    fontWeight: "bold",
    fontSize: 13,
  },

  chip: {
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
    marginRight: 8,
    marginBottom: 8,
    elevation: 2,
  },

  chipTexto: {
    color: "#6B5EFF",
    fontWeight: "600",
    fontSize: 13,
  },

  // 🔹 TITULO
  titulo: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingBottom: 10,
  },

  // 🔹 CARD
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 18,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  topoCard: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#E0E0E0",
    marginRight: 12,
  },

  nome: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },

  especialidade: {
    color: "#5DE2D4",
    fontSize: 13,
    marginTop: 2,
  },

  area: {
    color: "#6B5EFF",
    fontSize: 12,
    marginTop: 4,
  },

  rating: {
    backgroundColor: "#FFE9A8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  // 🔹 FOOTER
  footerCard: {
    marginTop: 12,
  },

  linhaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  horario: {
    color: "#6B5EFF",
    fontSize: 13,
  },

  sessao: {
    color: "#888",
    fontWeight: "600",
    fontSize: 11,
  },

  aviso: {
    fontSize: 16,
    color: "red",
    textAlign: 'center',
    padding: 15
  },

  preco: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#222",
  },

  botao: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#8E7CFF",
    borderRadius: 12,
    marginTop: 12,
    width: "100%",
    height: 48,
    elevation: 3,
  },

  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  // 🔹 MODAL
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },

  btnCancelar: {
    padding: 10,
  },

  btnConfirmar: {
    backgroundColor: "#8E7CFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },

});