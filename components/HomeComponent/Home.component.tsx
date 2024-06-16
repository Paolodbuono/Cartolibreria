import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType, emptyUser } from '@/types/UserType';

const HomeComponent: React.FC<{}> = () => {
    const router = useRouter();

    const [stateUser, setStateUser] = useState<UserType>(emptyUser);
    const [isUserLogged, setIsUserLogged] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const parsedValue: UserType = JSON.parse(value);
                    setStateUser(parsedValue);
                    setIsUserLogged(true)
                } else {
                    setIsUserLogged(false)
                }
            } catch (e) {
                console.log('Error fetching data from AsyncStorage:', e);
            }
        };

        getData();
    }, []);



    return (
        <View style={styles.container}>
            <Stack.Screen options={{}} />
            {isUserLogged && <>
                <Text>Ciao {stateUser.nome}</Text>
                <Button title="Area Personale" onPress={() => router.push("LogInView")} />
            </>}
            {!isUserLogged && <>
                <Text>Effettua l'accesso!</Text>
                <Button title="Registrati!" onPress={() => router.push("SignInView")} />
                <Button title="Accedi!" onPress={() => router.push("LogInView")} />
            </>}
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
