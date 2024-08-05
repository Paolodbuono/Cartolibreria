import React, { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { Text, View, StyleSheet, Image, TouchableOpacity, ActivityIndicator as Spinner } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType, emptyUser } from '@/types/UserType';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { gs } from '@/style/globalStyles';
import { styles } from './Home.styles';
import TextComponent from '@/components/Commons/Text.component';
import { bg, md } from '@/constants/FontSize';

// Paths
const bannerPath = "../../assets/images/bannerBonagura.png";
const footerPath = "../../assets/images/onda.jpg";
const adozioniPath = "../../assets/images/listaScuole.png";
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
                    <TextComponent style={styles.welcome}> {stateUser?.nome ? ` Ciao, ${stateUser.nome.toUpperCase()}` : ""}</TextComponent>
                    <TouchableOpacity style={{ ...styles.buttonImportant, width: 250 }} onPress={() => router.push("ComodamenteDaCasaView")}>
                        <TextComponent style={{ color: 'white', fontSize: md + 2 }}> E' semplice acquistare e ordinare!                             </TextComponent>
                        <TextComponent style={{ color: 'white', fontSize: md + 2, textAlign: "center" }}> Comodamente da casa...  </TextComponent>
                        <TextComponent style={{ color: 'white', fontSize: md + 2, textAlign: "center" }}> come in negozio! </TextComponent>
                    </TouchableOpacity>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("MyOrdersView") }} >
                                <Image style={styles.marginAuto} source={require(ordersPath)} />
                            </TouchableOpacity>
                            <TextComponent style={styles.buttonLabel}>  I miei ordini </TextComponent>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("AdozioniView") }}>
                                <Image style={styles.marginAuto} source={require(adozioniPath)} />
                            </TouchableOpacity>
                            <TextComponent style={styles.buttonLabel}> Adozioni </TextComponent>
                        </View>
                    </View>
                    <View style={styles.buttonRow}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("AppuntamentoView") }}>
                                <Image style={styles.marginAuto} source={require(appuntamentoPath)} />
                            </TouchableOpacity>
                            <TextComponent style={styles.buttonLabel}> Appuntamento </TextComponent>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => { router.push("MyProfileView") }}>
                                <Image style={styles.marginAuto} source={require(personalAreaPath)} />
                            </TouchableOpacity>
                            <TextComponent style={styles.buttonLabel}> {isUserLogged ? "Area Riservata" : "Login"} </TextComponent>
                        </View>
                    </View>
                    <View style={styles.buttonActionRow}>
                        <TouchableOpacity style={styles.buttonImportant} onPress={() => router.push("NoticeView")}>
                            <TextComponent style={{ color: 'white', fontSize: md + 2 }}>Avvisi Importanti</TextComponent>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonImportant} onPress={() => router.push("WhyChoseUsView")}>
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
