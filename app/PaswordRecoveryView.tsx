import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useNavigation } from "expo-router";
import PaswordRecoveryComponent from "@/components/PaswordRecoveryComponent/PasswordRecovery.component";

export default function RestorePasswordView() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Recupera Password" ,headerTitleStyle: { fontFamily: "Allan-Bold" } }} />
      <PaswordRecoveryComponent />
    </View>
  );
}
