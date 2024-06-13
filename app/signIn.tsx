import { Text, View } from "react-native";

import SignInComponent from "@/components/SignInComponent/SignIn.component";
import { Stack } from "expo-router";

export default function SignIn() {

  const navigate = { navigation: () => "" };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen
        options={{
          headerTitle:"Registrazione",
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center', // Centra il titolo nell'header
        }}
      />
      <SignInComponent navigation={navigate} />
    </View>
  );
}
