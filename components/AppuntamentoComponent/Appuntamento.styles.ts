import { bg, md, sm } from '@/constants/FontSize';
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Platform } from 'react-native';

const isTablet = wp('100%') > 600; // Condizione per determinare se è tablet

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
    backgroundColor: 'white',
    justifyContent: 'flex-start', // Cambiato da 'center' a 'flex-start'
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4975be',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20, // Aggiunto spazio extra per separare i Picker dal pulsante
    marginBottom:  Platform.OS === 'web' ? 150 : 0,
    zIndex: 0, // Impostato per assicurare che il pulsante stia sotto i Picker
    position: 'relative',
  },
  buttonText: {
    color: 'white',
    fontSize: sm,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontSize: bg,
    textAlign: 'center',
    fontWeight: '800',
    color: '#EB5F19',
    top: -30,
    width: wp('90%'),
    ...(isTablet && {
      marginTop: 170,
  })
  },
  subTitle: {
    fontSize: md,
    textAlign: 'center',
    fontWeight: '800',
    color: '#4975be',
    top: -20,
  },
  calendar: {
    width: wp('95%'),
    marginTop: hp('1.5%'),
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
  },
  containerRiepilogoPrenotazione: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('5%'),
  },
  containeButtonCancella: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    textAlign: 'center',
  },
  textRiepilogoPrenotazione: {
    flexDirection: 'column',
    fontSize: bg,
    color: '#4975be',
    fontWeight: '800',
    alignSelf: 'center',
    marginBottom: 20,
  },
  textRiepilogoNumeroPrenotazione: {
    flexDirection: 'column',
    fontSize: 100,
    color: '#EB5F19',
    alignSelf: 'center',
  },
  codicePrenotazione: {
    flexDirection: 'column',
    fontSize: bg,
    color: '#4975be',
    alignSelf: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    position: 'relative', // Aggiunto per stabilizzare il layout
    zIndex: 1, // Priorità rispetto al pulsante
  },
  timeCell: {
    flex: 1,
    alignItems: 'center',
  },
  timeLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  realTimePicker: {
    width: 100,
    height: 50,
    marginRight: 10,
    marginLeft: 10,
    zIndex: 1, // Assicura che i Picker stiano sopra il pulsante
  },
  timePicker: {
    marginTop: 10,
  },
  pickerItem: {
    fontSize: 18,
    textAlign: 'center',
  },
});
