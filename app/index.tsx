import { Stack, useRouter } from 'expo-router';
import { Image, Text, View, StyleSheet, Button } from 'react-native';

function LogoTitle() {
  return (
    <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
  );
}

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: props => <View><LogoTitle /> BENVENUTO</View>,
        }}
      />
      <Text>Home Screen</Text>
      <Button title="Registrati!" onPress={() => router.push("SignInView")} />
      <Button title="Accedi!" onPress={() => router.push("LogInView")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
