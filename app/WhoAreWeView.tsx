import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useNavigation } from "expo-router";

import { ScrollView, Text, Linking, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextComponent from "@/components/Commons/Text.component";
import { bg, sm } from "@/constants/FontSize";

export default function WhoAreWeView() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Chi Siamo" ,headerTitleStyle: { fontFamily: "Allan-Bold" } }} />
      <View style={styles.title}>
        <TextComponent style={{ color: 'rgb(252, 115, 7)', fontWeight: 'bold', fontSize: bg }}>
          LA NOSTRA STORIA
        </TextComponent>
      </View>
      <ScrollView>
        <TextComponent style={styles.paragraph}>
          Nel lontano 1983 nasce la Cartolibreria Bonagura, già ex La Cartotecnica s.a.s., da un'idea di Giuseppe Bonagura, con l'intenzione di creare una giovane attività commerciale che si integrasse nel tessuto socio economico locale.
          In questi ormai quasi 40 anni di attività l'azienda è cresciuta, non solo strutturalmente trasferendosi nel 1998 dal "piccolo negozio" di via Roma nella grande struttura di via IV Novembre 10-12, Poggiomarino (NA), ma soprattutto nei servizi rivolti alla clientela, molti dei quali, innovativi ed unici nel settore.
        </TextComponent>
        {/* Altri paragrafi e link qui */}
        <TextComponent style={styles.paragraph} onPress={() => Linking.openURL('http://www.cartolibreriabonagura.it')}>
          Nel 2010 adeguandoci alle esigenze di un mercato sempre più dinamico e de-localizzato, abbiamo inaugurato lo shop on-line, <TextComponent style={styles.link}>www.cartolibreriabonagura.it</TextComponent>, piattaforma dalla quale è possibile acquistare tutte le ultime novità del reparto scuola avendo la possibilità di scegliere tra un'ampia gamma di prodotti ed accessori tra le numerosissime griffe del settore.
        </TextComponent>
        {/* Continua con gli altri paragrafi e link */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    "height": hp("5%"),
    "width": wp("100%"),
    "display": "flex",
    "alignItems": "center",
    marginTop: hp('1%'),
    "justifyContent": "center"
  },
  paragraph: {
    margin: 12,
    fontSize: sm,
  },
  link: {
    color: '#00C',
  },
});