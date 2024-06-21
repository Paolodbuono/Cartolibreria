import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',

    backgroundColor: '#FFFFFF',
    height: hp('100%'),
    width: wp('80%'),
  },
  modalContainer: {
    padding: hp('10%'),
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4975be',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: { fontSize: hp('2.6%'), textAlign: 'center', fontWeight: '800', color: '#EB5F19', top: -30 },
  subTitle: { fontSize: hp('2.4%'), textAlign: 'center', fontWeight: '800', color: '#4975be', top: -20 },
  calendar: { width: wp('95%'), marginTop: hp('1.5%'), borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 5, },
  containerRiepilogoPrenotazione: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') },
  containeButtonCancella: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: hp('2.5%'), textAlign: 'center', },
  textRiepilogoPrenotazione: { flexDirection: 'column', fontSize: hp('2.5%'), color: '#4975be', fontWeight: "800", alignSelf: 'center' },
  codicePrenotazione: { flexDirection: 'column', fontSize: hp('2.5%'), color: '#4975be', fontWeight: "400", alignSelf: 'center' },
  textRiepilogoNumeroPrenotazione: { fontSize: hp('10%'), fontWeight: "bold", color: '#EB5F19', marginTop: 40, paddingBottom: 40 },
  timeContainer: { width: wp('80%'), marginTop: hp('2%'), marginBottom: hp('2%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 60, },
  timeCell: { height: 39, width: 100, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 5, backgroundColor: "#FFFFFF" },
});
