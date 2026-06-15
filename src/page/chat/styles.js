import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FB",
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginTop: 10,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#00000050",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    marginRight: 12,
  },

  profileInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },

  nameWrapper: {
    flex: 1,
    minWidth: 0,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    backgroundColor: "#D8E7F7",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#5D46FF",
    fontWeight: "700",
    fontSize: 16,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2640",
    flexShrink: 1,
  },

  subtitle: {
    fontSize: 12,
    color: "#66E4D5",
    marginTop: 2,
  },

  chatCard: {
    flex: 1,
    backgroundColor: "#66E4D5",
    paddingHorizontal: 16,
    paddingBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },

  tagContainer: {
    alignSelf: "center",
    backgroundColor: "#95E1F7",
    paddingVertical: 6,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginBottom: 18,
    marginTop: 12,
  },

  tagText: {
    color: "#0000009a",
    fontSize: 12,
    fontWeight: "700",
  },

  messageList: {
    paddingBottom: 24,
  },

  messageBubble: {
    maxWidth: "85%",
    padding: 14,
    borderRadius: 22,
    marginBottom: 12,
  },

  therapistBubble: {
    backgroundColor: "#F5F8FF",
    alignSelf: "flex-start",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 22,
  },

  userBubble: {
    backgroundColor: "#949BF1",
    alignSelf: "flex-end",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 22,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#000000",
  },

  userMessageText: {
    color: "#000000",
  },

  messageTime: {
    fontSize: 11,
    color: "#9EA7C4",
    marginTop: 8,
    alignSelf: "flex-end",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 18,
    marginTop: 10,
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },

  inputIcon: {
    marginRight: 12,
  },

  input: {
    flex: 1,
    color: "#525966",
    fontSize: 15,
    minWidth: 0,
  },

  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#50C9AA",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    shadowColor: "#50C9AA",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
});