import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Button, Text, ActivityIndicator as Spinner } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { UserType } from '@/types/UserType';

export const ProfileComponent: React.FC<{ userLogged: UserType }> = ({ userLogged }) => {
    const router = useRouter();

    const [showSpinner, setShowSpinner] = useState<boolean>(true);
    const [sedeSelezionata, setSedeSelezionata] = useState<string>('');

    const getSedeFromStorage = async () => {
        const res = await AsyncStorage.getItem('sedeSelezionata');
        setSedeSelezionata(res ?? "");
        setShowSpinner(false);
    }

    useEffect(() => { getSedeFromStorage() }, []);

    const logOut = () => {
        setShowSpinner(true)
        const arrayAsyncStorege = [];
        arrayAsyncStorege.push(AsyncStorage.removeItem('userData'))
        arrayAsyncStorege.push(AsyncStorage.removeItem('sedeSelezionata'))
        Promise.all(arrayAsyncStorege)
            .then(() => {
                setShowSpinner(false);
                router.replace("HomeView");
            })
            .catch((e) => {
                console.log('errore durante la logOut !!!', e)
            })
    }

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
            {showSpinner && <Spinner />}
            {!showSpinner &&
                <>
                    <Text style={{ fontSize: hp('2.5%'), padding: 10 }}>
                        Bentornato {userLogged.nome}
                    </Text>
                    <View style={{ marginTop: hp('1%'), padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: hp('2.8%') }}>Ecco il riepilogo dei tuoi dati</Text>
                    </View>
                    <View style={{ marginTop: hp('1.5%'), padding: 10 }}>
                        <Text style={{ fontSize: hp('2.5%'), paddingTop: hp('1%') }}>{'Email: ' + userLogged.email}</Text>
                        <Text style={{ fontSize: hp('2.5%'), paddingTop: hp('1%') }}>{'Indirizzo: ' + userLogged.indirizzo}</Text>
                        <Text style={{ fontSize: hp('2.5%'), paddingTop: hp('1%') }}>{'Città: ' + userLogged.citta}</Text>
                        <Text style={{ fontSize: hp('2.5%'), paddingTop: hp('1%') }}>{'Cellulare: ' + userLogged.cellulare}</Text>
                    </View>
                    <View style={{ marginTop: hp('1.5%'), padding: 10 }}>
                        <Text style={{ fontSize: hp('2.5%'), paddingTop: hp('1%') }}>{'Sede presso cui sei registrato: ' + sedeSelezionata.toUpperCase()}</Text>
                    </View>
                    <Button title="LOG OUT" onPress={() => logOut()} />
                </>
            }
        </ScrollView>
    );
}
