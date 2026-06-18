import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A288FF',
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    // Altura fixa para o header roxo — ajuste conforme precisar
    height: hp("28%"),
  },
  logoImage: {
    width: wp("54%"),
    height: hp("25%"),
    alignItems: "center",
  },
  brandName: {
    fontSize: 28,
    color: 'white',
    fontWeight: '600',
    marginTop: 5,
  },
  whiteCard: {
    // Ocupa todo o espaço restante + cresce com o scroll
    flexGrow: 1,
    minHeight: hp("72%"),        // garante que chegue ao fundo mesmo sem teclado
    backgroundColor: "white",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingHorizontal: 40,
    paddingTop: 40,
    paddingBottom: 40,           // espaço no fundo para não colar no botão home
    alignItems: "center",
  },
  mainTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A288FF',
    textAlign: 'center',
    lineHeight: 28,
  },
  description: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  otpInput: {
    width: 50,
    height: 60,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  resendText: {
    color: '#A288FF',
    fontSize: 13,
    alignSelf: 'flex-start',
    marginBottom: 40,
  },
  buttonEnviar: {
    backgroundColor: '#A288FF',
    width: '100%',
    height: 55,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  tipText: {
    fontSize: 11,
    color: '#BDBDBD',
    textAlign: 'center',
    paddingHorizontal: 20,
  },

  mensagemErro: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
    fontSize: 14,
    marginBottom: -20,
  },
});