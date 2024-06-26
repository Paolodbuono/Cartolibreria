import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { View,  Button, Text, ActivityIndicator as Spinner } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useRouter } from 'expo-router';
import { UserType } from '@/types/UserType';
import { gs } from '@/style/globalStyles';
import { styles } from './Profile.styles';
import { BTitle } from '../Commons/BTitle.component';
import { BSub } from '../Commons/BSub.component';
import TextComponent from '../Commons/Text.component';

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
                    <TextComponent style={styles.title}>
                        Bentornato <BTitle title={userLogged.nome} />
                    </TextComponent>
                    <View style={{ marginTop: hp('1%'), padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <TextComponent style={styles.subTitle}>Ecco il riepilogo dei tuoi dati</TextComponent>
                    </View>
                    <View style={{ marginTop: hp('1.5%'), padding: 10 }}>
                        <TextComponent style={styles.subTitle}>Email: <BSub title={userLogged.email} /> </TextComponent>
                        <TextComponent style={styles.subTitle}>Indirizzo: <BSub title={userLogged.indirizzo} /> </TextComponent>
                        <TextComponent style={styles.subTitle}>Città: <BSub title={userLogged.citta} /> </TextComponent>
                        <TextComponent style={styles.subTitle}>Cellulare: <BSub title={userLogged.cellulare} /> </TextComponent>
                    </View>
                    <View style={{ marginTop: hp('1.5%'), padding: 10 }}>
                        <TextComponent style={styles.subTitle}>Sede presso cui sei registrato: <BSub title={sedeSelezionata.toUpperCase()} /> </TextComponent>
                    </View>
                    <View style={styles.btnPosition}>
                        <Button title="LOG OUT" onPress={() => logOut()} />
                    </View>
                </View>
            }
        </>
    );
}


