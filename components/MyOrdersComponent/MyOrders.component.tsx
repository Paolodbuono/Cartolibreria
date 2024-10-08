import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator as Spinner, Text, TouchableOpacity, FlatList, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { gs } from '@/style/globalStyles';
import { styles } from './MyOrders.styles';
import { OrderStatusType, OrderType } from './MyOrders.types';
import { BSub } from '../Commons/BSub.component';
import TextComponent from '../Commons/Text.component';
import { bg, md } from '@/constants/FontSize';

const orderStatuses: OrderStatusType = {
    1: "ORDINATO NUOVO",
    2: "PERVENUTO NUOVO",
    3: "IMPEGNATO NUOVO",
    4: "ACQUISTATO",
    5: "ANNULLATO",
    6: "ORDINATO USATO",
    8: "PERVENUTO USATO"
};

const MyOrdersComponent = ({ }) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [myOrders, setMyOrders] = useState<Array<OrderType>>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userData, sedeSelezionata] = await Promise.all([
                    AsyncStorage.getItem('userData'),
                    AsyncStorage.getItem('sedeSelezionata')
                ]);

                if (userData !== null) {
                    setIsLogged(true);
                    const user = JSON.parse(userData);
                    const encodedName = encodeURIComponent(user.nome);
                    const response = await fetch(`https://www.libreriabonagura.it/micro/getOrdine.asp?libreria=${sedeSelezionata ? sedeSelezionata.toLowerCase() : "pompei"}&cliente=${encodedName}`);
                    const risposta = await response.json();
                    const allOrders: Array<OrderType> = risposta.data;

                    console.log("response", JSON.stringify(response));
                    console.log("risposta", risposta);

                    const parsedOrders = allOrders.map((element) => ({ ...element, stato: orderStatuses[element.flag] }));

                    setMyOrders(parsedOrders);
                    setIsLoading(false);
                } else {
                    console.log('vai prima alla login !!!!!!!!')
                    setIsLoading(false);
                    setIsLogged(false);
                }
            } catch (e) {
                console.log('Errore', e);
            }
        };

        fetchData();
    }, []);


    const RenderMyOrders = ({ info }: { info: { item: OrderType, index: number } }) => {
        console.log('renderMyOrders', info.item, info.index);
        return (
            <View
                style={{
                    display: "flex",
                    backgroundColor: info.index % 2 === 0 ? '#e9e9e9' : '#fff',
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: hp('20%'),
                    width: wp('100%'),
                    marginTop: info.index === 0 ? hp('2%') : 0,
                }}
            >
                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '95%',
                    width: '95%'
                }}
                >
                    <TextComponent style={{ fontSize: md, color: '#000' }}>{`ISBN: - ${info.item.ISBN}`}</TextComponent>
                    <TextComponent style={{ fontSize: md, color: '#000' }}>{`Titolo: - ${info.item.TITOLO}`}</TextComponent>
                    <TextComponent style={{ fontSize: md, color: '#000' }}>{`Quantità: - ${info.item.TCOPIE} Prezzo: - ${info.item.prezzo}`}</TextComponent>
                    <TextComponent style={{ fontSize: md, color: '#000' }}>{`Stato: - ${info.item.stato}`}</TextComponent>
                </View>
            </View>
        )

    }


    return (
        <View>
            {isLoading && <View style={gs.spinner} children={<Spinner size="large" />} />}
            {!isLoading && <>
                {isLogged && <>
                    <Image style={{ maxWidth: wp('100%'), height: 120, marginTop: 10 }} source={require('../../assets/images/ordini_images.png')} />
                    <FlatList
                        style={{ width: '100%' }}
                        data={myOrders}
                        renderItem={(item) => <RenderMyOrders info={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </>}
                {!isLogged && <>
                    <View style={styles.container}>
                        <View>
                            <TextComponent style={styles.title}>Non hai effettuato l'accesso, per poter usufruire questo servizio c'è bisogno di essere autenticati</TextComponent>
                            <TextComponent style={styles.subTitle}>Vai nell'area riservata ed effettua l'accesso!</TextComponent>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => { router.push("MyProfileView") }}>
                            <Image source={require("../../assets/images/areaRiservata.png")} />
                            <TextComponent style={{ textAlign: 'center', fontSize: bg, color: '#4975be', marginTop: 10 }}>
                                Accedi
                            </TextComponent>
                        </TouchableOpacity>
                    </View>
                </>}
            </>}
        </View>
    );
};


export default MyOrdersComponent