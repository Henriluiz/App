import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({

    container: {
        flex: 1,
        // alignItems: "center"
    },

    // Flex : 1
    logo: {
        width: wp("35%"),
        height: hp("25%"),
        marginTop: hp("3%"),
        alignItems: "center"
    },

    containerLogo: {
        alignItems: "center"
    },

    // Flex : 2
    container2: {
        flex: 1,
        backgroundColor: "#A383FB",
        borderTopStartRadius: wp("18%"),
        borderTopEndRadius: wp("18%"),
        justifyContent:"center",
    },

    titulo: {
        fontSize: wp("10%"),
        marginTop: hp("4%"),
        textAlign: "center",
        color: "white",
        fontWeight: "bold"
    },

    containerCheck: {
        flex: 0.65,
        justifyContent: "center",
        alignItems: "center",
    },

    check: {
        width: wp("37%"),
        height: hp("19%"),
    },

    // Flex 4: Botão de entrada
    contEntra: {
        alignSelf: "center",
    },

    botaoEntra: {
        height: hp("7%"),
        width: wp("60%"),
        backgroundColor: "rgba(255, 255, 255, 1)",
        borderRadius: wp("20%"),
        justifyContent: "center",
        alignItems: "center",
    },

    entrarText: {
        fontSize: wp("5%"),
        color: "rgba(163, 131, 251, 1)",
    },

});
