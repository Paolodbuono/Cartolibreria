import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator as Spinner } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType, emptyUser } from '@/types/UserType';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { gs } from '@/style/globalStyles';
import { styles } from './Home.styles';

// Paths
const bannerPath = "../../assets/images/_headerBonaguraLogo@2.png";
const footerPath = "../../assets/images/onda.jpg";
const appuntamentoPath = "../../assets/images/calendar.png";
const personalAreaPath = "../../assets/images/areaRiservata.png";
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
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("MyOrdersView") }} >
                                <Image style={styles.marginAuto} source={require(ordersPath)} />
                            </TouchableOpacity>
                            <Text style={styles.buttonLabel}>  I miei ordini </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("AppuntamentoView") }}>
                                <Image style={styles.marginAuto} source={require(appuntamentoPath)} />
                            </TouchableOpacity>
                            <Text style={styles.buttonLabel}> Appuntamento </Text>
                        </View>
                    </View>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => router.push("LogInView")}>
                                <Image style={styles.marginAuto} source={require(personalAreaPath)} />
                            </TouchableOpacity>
                            <Text style={styles.buttonLabel}> {isUserLogged ? "Area Riservata" : "Login"} </Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.buttonImportant} onPress={() => router.push("NoticeView")}>
                        <Text style={{ color: 'white', fontSize: 22 }}>Importante</Text>
                    </TouchableOpacity>
                </>}
            </View>
            <Image style={styles.imgFooter} source={require(footerPath)} />
        </View >
    );
}

export default HomeComponent;
