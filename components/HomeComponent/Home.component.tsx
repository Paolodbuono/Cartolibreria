import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { View, Image, TouchableOpacity, ActivityIndicator as Spinner, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType, emptyUser } from '@/types/UserType';
import { gs } from '@/style/globalStyles';
import { styles } from './Home.styles';
import TextComponent from '@/components/Commons/Text.component';
import { md } from '@/constants/FontSize';

// Paths
const bannerPath = "../../assets/images/bannerBonagura.png";
const footerPath = "../../assets/images/onda.jpg";
const adozioniPath = "../../assets/images/listaScuole.png";
const appuntamentoPath = "../../assets/images/calendar.png";
const personalAreaPath = "../../assets/images/areaRiservata.png";
const semplicePath = "../../assets/images/simple.png";
const semplicePath2 = "../../assets/images/simple2.png";
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
            <Stack.Screen options={{ headerBackVisible: false, headerLeft: () => undefined }} />
            <Image style={styles.imgBanner} source={require(bannerPath)} resizeMode='contain' />
            <View style={styles.content}>
                {isLoading && <View style={gs.spinner} children={<Spinner size="large" />} />}
                {!isLoading && <>
                    {stateUser?.nome && <TextComponent style={styles.welcome}> {`Ciao, ${stateUser.nome.toUpperCase()}`}</TextComponent>}
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.libreriabonagura.it')}>
                        <Image style={styles.imageSemplice2} source={require(semplicePath)} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push("/ComodamenteDaCasaView")}>
                        <Image style={styles.imageSemplice} source={require(semplicePath2)} />
                    </TouchableOpacity>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("/MyOrdersView") }} >
                                <Image style={styles.image} source={require(ordersPath)} />
                            </TouchableOpacity>
                            <TextComponent style={styles.buttonLabel}>  I miei ordini </TextComponent>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("/AdozioniView") }}>
                                <Image style={styles.image} source={require(adozioniPath)} />
                            </TouchableOpacity>
                            <TextComponent style={styles.buttonLabel}> Adozioni </TextComponent>
                        </View>
                    </View>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("/AppuntamentoView") }}>
                                <Image style={styles.image} source={require(appuntamentoPath)} />
                            </TouchableOpacity>
                            <TextComponent style={styles.buttonLabel}> Appuntamento </TextComponent>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("/MyProfileView") }}>
                                <Image style={styles.image} source={require(personalAreaPath)} />
                            </TouchableOpacity>
                            <TextComponent style={styles.buttonLabel}> {isUserLogged ? "Area Riservata" : "Login"} </TextComponent>
                        </View>
                    </View>
                    <View style={styles.buttonActionRow}>
                        <TouchableOpacity style={styles.buttonImportant} onPress={() => router.push("/NoticeView")}>
                            <TextComponent style={{ color: 'white', fontSize: md + 2 }}>Avvisi Importanti</TextComponent>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonImportant} onPress={() => router.push("/WhyChoseUsView")}>
                            <TextComponent style={{ color: 'white', fontSize: md + 2 }}>Perché Sceglierci</TextComponent>
                        </TouchableOpacity>
                    </View>

                </>}
            </View>
            <Image style={styles.imgFooter} source={require(footerPath)} />
        </View >
    );
}

export default HomeComponent;
