import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    backgroundColor: "#F4F8FB",
  },
 
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: Platform.OS === "android" ? 10 : 0,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#A383FB",
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 14,
    height: 44,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#1F2640",
    padding: 0,
  },

  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },

  conversationItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginHorizontal: 8,
    marginVertical: 6,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#D8E7F7",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5D46FF",
  },

  onlineIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#66E4D5",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    position: "absolute",
    bottom: 0,
    right: 0,
  },

  conversationContent: {
    flex: 1,
    justifyContent: "center",
  },

  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },

  conversationName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2640",
    flex: 1,
  },

  conversationTime: {
    fontSize: 13,
    color: "#999",
    marginLeft: 8,
  },

  conversationMessage: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },

  emptyStateText: {
    fontSize: 16,
    color: "#999",
    marginTop: 16,
    fontWeight: "500",
  },
});