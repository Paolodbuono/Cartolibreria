import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator as Spinner, Text, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { gs } from '@/style/globalStyles';
import { styles } from './MyOrders.styles';
import { OrderStatusType, OrderType } from './MyOrders.types';
import { BSub } from '../Commons/BSub.component';

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
                    const response = await fetch(`https://www.libreriabonagura.it/micro/getOrdine.asp?libreria=${sedeSelezionata.toLowerCase()}&cliente=${encodedName}`);
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
                    <Text style={{ fontSize: hp('2%'), color: '#000' }}>{`ISBN: - ${info.item.ISBN}`}</Text>
                    <Text style={{ fontSize: hp('2%'), color: '#000' }}>{`Titolo: - ${info.item.TITOLO}`}</Text>
                    <Text style={{ fontSize: hp('1.8%'), color: '#000' }}>{`Quantità: - ${info.item.TCOPIE} Prezzo: - ${info.item.prezzo}`}</Text>
                    <Text style={{ fontSize: hp('2%'), color: '#000' }}>{`Stato: - ${info.item.stato}`}</Text>
                </View>
            </View>
        )

    }


    return (
        <SafeAreaView>
            {isLoading && <View style={gs.spinner} children={<Spinner size="large" />} />}
            {!isLoading && <>
                {isLogged && <>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('1.8%') }}>
                        <Text style={styles.title}>Ricorda da noi non farai mai file chilometriche</Text>
                    </View>
                    <View style={{ padding: 10, marginTop: hp('1%') }}>
                        <Text style={styles.subTitle}>Per te che devi solo ritirare c’è una <BSub title="CORSIA PREFERENZIALE!" /></Text>
                        <Text style={styles.subTitle}>Visto che hai già un ordine in essere puoi anche <BSub title="ORDINARE TELEFONICAMENTE" />anziché fare file in libreria!</Text>
                        <Text style={styles.subTitle}>Qualche libro acquistato erroneamente, te lo <BSub title="SOSTITUIREMO PRONTAMENTE!" /></Text>
                        <Text style={styles.subTitle}>Consegnaci subito i tuoi libri usati non più in uso: <BSub title="LI VALUTIAMO AL 40%!" /></Text>
                    </View>
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
                            <Text style={styles.title}>Non hai effettuato l'accesso, per poter usufruire questo servizio c'è bisogno di essere autenticati</Text>
                            <Text style={styles.subTitle}>Vai nell'area riservata ed effettua l'accesso!</Text>
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => router.push("LogInView")}>
                            <Image source={require("../../assets/images/areaRiservata.png")} />
                            <Text style={{ textAlign: 'center', fontSize: hp("2.5%"), color: '#4975be' }}>
                                Accedi
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>}
            </>}
        </SafeAreaView>

    );
};


export default MyOrdersComponent