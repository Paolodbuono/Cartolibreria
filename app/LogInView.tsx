import React from "react";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { Stack, useNavigation } from "expo-router";
import LogInComponent from "@/components/LogInComponent/LogIn.component";

export default function LogInView() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ headerTitle: "Accedi" }} />
      <LogInComponent />
    </View>
  );
}
