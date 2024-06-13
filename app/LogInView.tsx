import { View } from "react-native";
import { Stack, useNavigation } from "expo-router";

import SignInComponent from "@/components/SignInComponent/SignIn.component";
import { useEffect } from "react";

export default function LogInView() {

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: true });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          headerTitle: "Accedi",
        }}
      />
      LogInView
    </View>
  );
}
