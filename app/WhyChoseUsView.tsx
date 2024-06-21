import React from "react";
import { SafeAreaView, Image, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WhyChoseUsView() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image style={{ maxWidth: wp('100%'), height: hp('90%') }} resizeMode="contain" source={require('../assets/images/perche.png')} />
      </View>
    </SafeAreaView>
  );
}