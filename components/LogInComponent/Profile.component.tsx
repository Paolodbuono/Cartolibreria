import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, Button, Text, ActivityIndicator as Spinner } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { UserType } from '@/types/UserType';
import { gs } from '@/style/globalStyles';
import { styles } from './Profile.styles';

export const ProfileComponent: React.FC<{ userLogged: UserType }> = ({ userLogged }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sedeSelezionata, setSedeSelezionata] = useState<string>('');

    const getSedeFromStorage = async () => {
        const res = await AsyncStorage.getItem('sedeSelezionata');
        setSedeSelezionata(res ?? "");
        setIsLoading(false);
    }

    useEffect(() => { getSedeFromStorage() }, []);

    const logOut = () => {
        setIsLoading(true)
        const arrayAsyncStorege = [];
        arrayAsyncStorege.push(AsyncStorage.removeItem('userData'))
        arrayAsyncStorege.push(AsyncStorage.removeItem('sedeSelezionata'))
        Promise.all(arrayAsyncStorege)
            .then(() => {
                setIsLoading(false);
                router.replace("HomeView");
            })
            .catch((e) => {
                console.log('errore durante la logOut !!!', e)
            })
    }

    return (
        <>
            {isLoading && <View style={gs.spinner} children={<Spinner size="large" />} />}
            {!isLoading &&
                <View style={styles.wrapper}>
                    <Text style={styles.title}>
                        Bentornato <BTitle title={userLogged.nome} />
                    </Text>
                    <View style={{ marginTop: hp('1%'), padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.subTitle}>Ecco il riepilogo dei tuoi dati</Text>
                    </View>
                    <View style={{ marginTop: hp('1.5%'), padding: 10 }}>
                        <Text style={styles.subTitle}>Email: <BSub title={userLogged.email} /> </Text>
                        <Text style={styles.subTitle}>Indirizzo: <BSub title={userLogged.indirizzo} /> </Text>
                        <Text style={styles.subTitle}>Città: <BSub title={userLogged.citta} /> </Text>
                        <Text style={styles.subTitle}>Cellulare: <BSub title={userLogged.cellulare} /> </Text>
                    </View>
                    <View style={{ marginTop: hp('1.5%'), padding: 10 }}>
                        <Text style={styles.subTitle}>Sede presso cui sei registrato: <BSub title={sedeSelezionata.toUpperCase()} /> </Text>
                    </View>
                    <View style={styles.btnPosition}>
                        <Button title="LOG OUT" onPress={() => logOut()} />
                    </View>
                </View>
            }
        </>
    );
}


const BTitle: React.FC<{ title: string }> = ({ title }) => {
    return <Text style={styles.titleBOLD}> {title} </Text>
}

const BSub: React.FC<{ title: string }> = ({ title }) => {
    return <Text style={styles.subTitleBOLD}> {title} </Text>
}