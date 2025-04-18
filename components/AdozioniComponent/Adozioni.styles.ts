import { bg, md, sm } from "@/constants/FontSize";
import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: hp('2%'),
        height: hp("100%"),
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
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    imagesContainer: {
        alignItems: 'center',
        width: '100%',
    },
    imageWrapper: {
        width: wp('80%'),
        aspectRatio: 16 / 9,
        marginVertical: hp('2%'),
    },
    sedeContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 4,
        borderColor: 'transparent',
    },
    selectedSede: {
        borderColor: 'green',
    },
    sedeImage: {
        width: '100%',
        height: '100%',
    },
    bookImage: {
        width: 100,
        height: 150,
        alignSelf: "center"
    },
    step: {
        borderWidth: 1, 
        borderColor: '#D3D3D3', 
        borderRadius: 10, 
        padding: 15, 
        marginVertical: 10, 
        backgroundColor: 'white', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2, 
    },
    disabledImage: {
        filter: "grayscale(100%)"
    },
});
