import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // Usa isso, no lugar de pixels ex: wp("10%") e hp("10%")

export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#A288FF', 
    },
    header: {
      height: '30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoImage: {
        width: wp("35%"),
        height: hp("25%"),
        marginTop: 25,
        alignItems: "center"
    },
    brandName: {
      fontSize: 28,
      color: 'white',
      fontWeight: '600',
      marginTop: 5,
    },
    whiteCard: {
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      paddingHorizontal: 40,
      paddingTop: 40,
      alignItems: 'center',
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
});

