import { bg, md } from '@/constants/FontSize';
import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: "center"
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 30,
        marginTop: 10
    },
    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 60,
    },
    buttonActionRow: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 40,
    },
    buttonContainer: {
        display: "flex",
        gap: 10
    },
    buttonLabel: {
        textAlign: 'center',
        fontSize: md + 2,
        color: '#4975be',
    },
    buttonImportant: {
        marginTop: 10,
        marginBottom: -30,
        backgroundColor: 'rgb(235 96 25)',
        paddingVertical: 16,
        borderRadius: 8,
        padding: 20,
    },
    image: {
        margin: "auto",
    },
    imageSemplice: {
        width: wp('80%'),
        height: 50,
    },
    imageSemplice2: {
        width: wp('80%'),
        height: 70,
    },
    imgBanner: {
        width: wp('100%'),
        height: 100,
        marginBottom: -10,
    },
    imgFooter: {
        width: wp('100%'),
        height: 100,
    },
    welcome: {
        color: '#4975be',
        fontSize: md + 2,
        fontWeight: 'bold',
        marginBottom: -20,
        marginTop: -10
    }
});
