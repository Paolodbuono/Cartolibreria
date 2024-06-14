import React from 'react';
import { Stack, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button } from 'react-native';

const HomeComponent: React.FC<{}> = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{}} />
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

export default HomeComponent;
