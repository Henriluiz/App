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
    color: "#999",
    marginBottom: 20,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  summaryText: {
    flex: 1,
  },

  summaryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 4,
  },

  summarySpecialty: {
    fontSize: 14,
    color: "#5DE2D4",
    fontWeight: "600",
  },

  priceTag: {
    backgroundColor: "#F4EEFF",
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  priceTagText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#5F3DC4",
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },

  detailItem: {
    flex: 1,
    backgroundColor: "#F7F5FF",
    borderRadius: 18,
    padding: 16,
  },

  detailLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#8984A4",
    marginBottom: 6,
  },

  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2B1C52",
  },

  summaryFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8E1FF",
  },

  summaryFooterLabel: {
    fontSize: 14,
    color: "#7E7491",
    fontWeight: "600",
  },

  summaryFooterValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#290041",
  },

  section: {
    marginTop: 26,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#999",
    marginBottom: 16,
  },

  pixCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
    flexDirection: "column",
    gap: 18,
    shadowColor: "#8E7CFF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },

  pixCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#999",
    marginBottom: 6,
  },

  pixCardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  pixIconBox: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "#F3EEFF",
    alignItems: "center",
    justifyContent: "center",
  },

  pixDetails: {
    flex: 1,
  },

  pixLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 6,
  },

  pixDescription: {
    fontSize: 13,
    color: "#6B4AC4",
    lineHeight: 18,
  },

  pixButton: {
    backgroundColor: "#8E7CFF",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  pixButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  pixHint: {
    marginTop: 14,
    fontSize: 13,
    color: "#7E7491",
    lineHeight: 18,
  },

  uploadCard: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    borderStyle: "dashed",
    borderWidth: 1.5,
    borderColor: "#D8CEFF",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },

  uploadIcon: {
    marginBottom: 6,
  },

  uploadTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#290041",
    marginBottom: 4,
  },

  uploadSubtitle: {
    fontSize: 13,
    color: "#7E7491",
    textAlign: "center",
    marginBottom: 8,
  },

  uploadHint: {
    fontSize: 13,
    color: "#BBB6CC",
  },

  footer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 22,
    backgroundColor: "#EDE9FF",
  },

  actionButton: {
    backgroundColor: "#52BE80",
    borderRadius: 50,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  actionButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  footerNote: {
    marginTop: 10,
    fontSize: 13,
    color: "#7E7491",
    textAlign: "center",
  },

    psicologoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: "#D6A16D",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  infoText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#777",
  },

  valorRow: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  valorLabel: {
    fontSize: 14,
    color: "#666",
  },

  valorValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  pixContainer: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  pixHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  pixTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#999",
    marginBottom: 12,
  },

  pixHeaderText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#8E7CFF",
    fontWeight: "600",
  },

  copyButton: {
    marginLeft: "auto",
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },

  copyButtonText: {
    fontSize: 11,
    color: "#888",
  },

  pixContent: {
    flexDirection: "row",
  },

  qrCode: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  pixDescription2: {
    fontSize: 12,
    color: "#555",
  },

  alertBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFE8FF",
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },

  alertText: {
    flex: 1,
    fontSize: 11,
    color: "#5F3DC4",
    marginLeft: 6,
  },

  uploadContainer: {
    marginTop: 20,
  },

  uploadLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#444",
    marginBottom: 8,
  },

  uploadArea: {
    backgroundColor: "#F3EEFF",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#BBAAFF",
    borderRadius: 12,
    paddingVertical: 28,
    alignItems: "center",
  },

  uploadAreaText: {
    marginTop: 8,
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },

  fileText: {
    marginTop: 8,
    fontSize: 11,
    color: "#999",
  },
});