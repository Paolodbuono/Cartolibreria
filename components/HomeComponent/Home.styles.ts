import { bg, md } from '@/constants/FontSize';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 60,
        marginTop: 10
    },
    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 60,
    },
    buttonContainer: {
        display: "flex",
        gap: 10
    },
    buttonLabel: {
        textAlign: 'center',
        fontSize: md + 2,
        color: '#4975be',
        marginTop: 10
    },
    buttonImportant: {
        marginTop: 10,
        marginBottom: -20,
        backgroundColor: 'rgb(235 96 25)',
        paddingVertical: 16,
        borderRadius: 8,
        padding: 20,
    },
    marginAuto: {
        margin: "auto",
    },
    imgBanner: {
        marginTop: 10,
        width: wp('100%'),
        height: 55,
    },
    imgFooter: {
        width: wp('100%'),
        height: 130,
    },
    welcome: {
        color: '#4975be',
        fontSize: md + 2,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: -30
    }
});
