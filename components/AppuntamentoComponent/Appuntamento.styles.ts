import { bg, md, sm } from '@/constants/FontSize';
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
    fontSize: sm,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: { fontSize: bg, textAlign: 'center', fontWeight: '800', color: '#EB5F19', top: -30, width: wp('90%') },
  subTitle: { fontSize: md, textAlign: 'center', fontWeight: '800', color: '#4975be', top: -20 },
  calendar: { width: wp('95%'), marginTop: hp('1.5%'), borderWidth: 1, borderColor: '#CCCCCC', borderRadius: 5, },
  containerRiepilogoPrenotazione: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: hp('5%') },
  containeButtonCancella: { flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 25, textAlign: 'center', },
  textRiepilogoPrenotazione: { flexDirection: 'column', fontSize: bg, color: '#4975be', fontWeight: "800", alignSelf: 'center', marginBottom: 20 },
  textRiepilogoNumeroPrenotazione: { flexDirection: 'column', fontSize: 100, color: '#EB5F19', alignSelf: 'center' },
  codicePrenotazione: { flexDirection: 'column', fontSize: bg, color: '#4975be', alignSelf: 'center' },
  timeContainer: {
    width: wp('100%'),
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp('5%')
  },
  timeCell: {
    height: 45,
    width: wp("40%"),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    position: 'relative', marginTop: 30
  },
  timeLabel: {
    marginTop: 10,
    width: wp("70%"),
    fontWeight: '800',
    alignSelf: "center",
    position: 'absolute',
    top: -28,
    left: 55,
  },
  timePicker : {
    position: 'absolute',
    top: 1,
    left: 1,
    right: 60,
    bottom: 0,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
    width: 100
  },
  realTimePicker: {
    width: wp("40%"),
  }
});
