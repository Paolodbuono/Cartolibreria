import { bg, md, sm } from '@/constants/FontSize';
import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const isTablet = width > 768;

export const styles = StyleSheet.create({
  title: { fontSize: bg, textAlign: 'center', fontWeight: '800', color: '#EB5F19', marginBottom: 20 },
  subTitle: { fontSize: md, textAlign: 'center', fontWeight: '800', color: '#4975be', top: -5 },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 20,
    ...(!isTablet && {
      justifyContent: 'space-between',
    }),
    ...(isTablet && {
      justifyContent: "center"
    })
  },
  button: {
    flex: 1,
    backgroundColor: 'blue',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
    ...(isTablet && {
      maxWidth: 200
    })
  },
  buttonText: {
    color: 'white',
    fontSize: bg,
    textAlign: 'center',
  },
});
