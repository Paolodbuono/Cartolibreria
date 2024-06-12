import { Text, View } from "react-native";

import SignInComponent from "@/components/SignInComponent/SignIn.component";

export default function Index() {

  const navigate = { navigation: () => "" };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <SignInComponent navigation={navigate} />
    </View>
  );
}
