import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: { padding: 5 },
  modalContainer: {
    marginTop: hp('10%'),
    marginBottom: hp('10%'),
    marginLeft: wp('10%'),
    marginRight: wp('10%'),
    height:  hp('80%'),
    width:  wp('80%'),
    backgroundColor: "white"
  },
  title: { fontSize: hp('2.6%'), textAlign: 'center', fontWeight: '500', marginTop: 10, color: '#EB5F19' },
  subTitle: { fontSize: hp('2.4%'), marginTop: hp('2%'), textAlign: 'center', color: '#4975be', fontWeight: 'bold' },
  subTitleSecond: { fontSize: hp('2.4%'), textAlign: 'center', color: '#4975be', fontWeight: 'bold' },
  containerForm: { marginTop: hp('1.5%'), flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  inputText: { width: '80%', maxWidth: '80%' },
  backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  radio: { margin: 2 },
  text: { fontSize: hp('1.8%'), color: '#4975be' },
  containerSediForm: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: hp('1.0%'), marginLeft: wp('4%') },
  containerRiepilogoPrenotazione: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') },
  containerRiepilogoNumeroPrenotazione: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: hp('2.5%') },
  containeButtonCancella: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: hp('2.5%') },
  textRiepilogoPrenotazione: { fontSize: hp('2.5%'), color: '#4975be' },
  textCancellaPrenotazione: { fontSize: hp('2%'), color: '#4975be' },
  textRiepilogoNumeroPrenotazione: { marginTop: hp('2.2%'), fontSize: hp('10%'), fontWeight: "bold", color: '#EB5F19' },
  containerCalendar: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: hp('1.5%') },
  timeContainer: { width: wp('90%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  hours: { width: '45%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  minutes: { width: '45%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
});
