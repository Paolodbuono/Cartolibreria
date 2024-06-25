import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import LogInComponent from "@/components/AccediComponent/LogIn.component";

export default function AccediView() {

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <Stack.Screen options={{ headerTitle: "Accedi" }} />
      <LogInComponent /> */}
    </View>
  );
}
