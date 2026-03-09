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
    },

    titulo: {
        fontSize: wp("10%"),
        marginTop: hp("7%"),
        marginLeft: wp("4%"),
        color: "white",
    },

    descricao: {
        fontSize: wp("5%"),
        marginTop: hp("2%"),
        marginLeft: wp("4%"),
        color: "white",
    },

    subdescricao: {
        fontSize: wp("4%"),
        marginTop: hp("2%"),
        marginLeft: wp("4%"),
        color: "rgba(255, 255, 255, 1)",
    },

    // Flex 4: Botão de entrada
    contEntra: {
        alignSelf: "center",
        marginTop: hp("30%")
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
