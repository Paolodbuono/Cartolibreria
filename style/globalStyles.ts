import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const gs = StyleSheet.create({
    spinner: {
        color: "blue",
        height: hp("100%"),
        width: wp("100%"),
        display: "flex",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999
    },
});