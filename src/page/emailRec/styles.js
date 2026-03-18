import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A88BFA', // Cor de fundo roxa do topo
  },
  header: {
    height: '38%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 12,
  },
  logoImage: {
    width: 540,
    height: 440,
    marginBottom: -100,
  },

  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#A88BFA',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#BDBDBD',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    color: '#A88BFA',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#A88BFA',
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    backgroundColor: '#A88BFA',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.8,
  },
  sendButton: {
    backgroundColor: '#A88BFA',
    flex: 1,
    marginLeft: 15,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
