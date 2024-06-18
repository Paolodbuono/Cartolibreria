import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useNavigation } from "expo-router";
import AppuntamentoComponent from "@/components/AppuntamentoComponent/Appuntamento.component";

export default function RestorePasswordView() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Appuntamento" }} />
      <AppuntamentoComponent />
    </View>
  );
}
