import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useNavigation } from "expo-router";
import AppuntamentoComponent from "@/components/AppuntamentoComponent/Appuntamento.component";
import { bg } from "@/constants/FontSize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const isTablet = wp('100%') > 600; // Condizione per determinare se è tablet

export default function RestorePasswordView() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: isTablet ? "center" : "", alignItems: "center", backgroundColor: "white" }}>
      <Stack.Screen options={{ headerTitle: "Appuntamento", headerTitleStyle: { fontFamily: "Allan-Regular", fontSize: bg } }} />
      <AppuntamentoComponent />
    </View>
  );
}
