import { bg, md, sm } from "@/constants/FontSize";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: hp('2%'),
        height: hp("100%")
    },
    title: {
        fontSize: bg - 2,
        textAlign: 'center',
        fontWeight: '800',
        color: '#EB5F19',
    },
    subTitle: {
        fontSize: md - 2,
        fontWeight: '600',
        color: '#4975be',
    },
    buttonText: {
        color: 'white',
        fontSize: sm,
        textAlign: 'center'
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: "center"
    }
});
