import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Button, Image, TouchableOpacity, ActivityIndicator as Spinner } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType, emptyUser } from '@/types/UserType';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { gs } from '@/style/globalStyles';

// Paths
const bannerPath = "../../assets/images/_headerBonaguraLogo@2.png";
const footerPath = "../../assets/images/onda.jpg";
const appuntamentoPath = "../../assets/images/calendar.png";
const personalAreaPath = "../../assets/images/areaRiservata.png";
const adozioniPath = "../../assets/images/listaScuole.png";
const ordersPath = "../../assets/images/ordini.png";

const HomeComponent: React.FC<{}> = () => {
    const router = useRouter();

    const [stateUser, setStateUser] = useState<UserType>(emptyUser);
    const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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
                setIsLoading(false);
            } catch (e) {
                console.log('Error fetching data from AsyncStorage:', e);
            }
        };

        getData();
    }, []);



    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerBackVisible: false }} />
            <Image style={styles.imgBanner} source={require(bannerPath)} />
            <View style={styles.content}>
                {isLoading && <View style={gs.spinner} children={<Spinner size="large" />} />}
                {!isLoading && <>
                    <Text style={styles.welcome}>Benvenuto {stateUser.nome}!</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => { }}>
                            <Image style={styles.button} source={require(ordersPath)} />
                            <Text style={{ textAlign: 'center', fontSize: hp("2.5%"), color: '#4975be' }}>
                                I miei ordini
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }}>
                            <Image style={styles.button} source={require(adozioniPath)} />
                            <Text style={{ textAlign: 'center', fontSize: hp("2.5%"), color: '#4975be' }}>
                                Adozioni
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity onPress={() => { router.push("AppuntamentoView") }}>
                            <Image style={styles.button} source={require(appuntamentoPath)} />
                            <Text style={{ textAlign: 'center', fontSize: hp("2.5%"), color: '#4975be' }}>
                                Appuntamento
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push("LogInView")}>
                            <Image style={styles.button} source={require(personalAreaPath)} />
                            <Text style={{ textAlign: 'center', fontSize: hp("2.5%"), color: '#4975be' }}>
                                {isUserLogged ? "Area Riservata" : "Login"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>}
            </View>
            <Image style={styles.imgFooter} source={require(footerPath)} />
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 60,
        marginTop: 10
    },
    buttonRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 60,
    },
    button: {
        margin: "auto",
    },
    imgBanner: {
        width: wp('100%'),
        height: 55,
    },
    imgFooter: {
        width: wp('100%'),
        height: 200,
    },
    welcome: { color: '#4975be', fontSize: hp('2.5%'), fontWeight: 'bold' }
});

export default HomeComponent;
