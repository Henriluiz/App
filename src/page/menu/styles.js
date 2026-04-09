import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },
  header: {
    backgroundColor: "#8E7CFF",
    padding: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTop: {
    marginBottom: 20,
  },

  
  greeting: {
    color: "#fff",
    fontSize: 18,
  },
  name: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    position: "absolute",
    right: 0,
    top: 0,
    flexDirection: "row",
  },
  sessionCard: {
    backgroundColor: "#A99EFF",
    borderRadius: 15,
    padding: 15,
  },
  sessionTitle: {
    color: "#fff",
    fontSize: 14,
  },
  sessionDate: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  sessionButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  sessionButtonText: {
    color: "#6C63FF",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginHorizontal: 20,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  actionCard: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 15,
    borderRadius: 15,
    elevation: 3,
  },
  actionTitle: {
    fontWeight: "bold",
    marginTop: 10,
  },
  actionSubtitle: {
    fontSize: 12,
    color: "#888",
  },
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    marginHorizontal: 20,
  },
  moodButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 50,
    elevation: 2,
  },
  recommendations: {
    flexDirection: "row",
    margin: 20,
    justifyContent: "space-between",
  },
  recommendCard: {
    backgroundColor: "#D6D1FF",
    width: "48%",
    height: 100,
    borderRadius: 15,
    padding: 10,
    justifyContent: "flex-end",
  },
  recommendText: {
    fontWeight: "bold",
    color: "#5A54C4",
  },
});

export default styles;