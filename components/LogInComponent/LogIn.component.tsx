import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator as Spinner } from 'react-native';

import { ProfileComponent } from './Profile.component';
import { UserType, emptyUser } from '@/types/UserType';
import { gs } from '@/style/globalStyles';
import { NotLoggedComponent } from './NotLogged.component';

export const LogInComponent: React.FC<{}> = ({ }) => {

    const [isLogged, setIsLogged] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);
    const [userLogged, setUserLogged] = useState<UserType>(emptyUser);

    useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const parsedValue: UserType = JSON.parse(value);
                    if (!parsedValue) return;
                    setUserLogged(parsedValue);
                    setIsLogged(true);
                }
                setShowSpinner(false);
            } catch (e) {
                console.log('Error fetching data from AsyncStorage:', e);
            }
        };

        getData();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {showSpinner && <View style={gs.spinner} children={<Spinner size="large" />} />}
            {!showSpinner && <>
                {!isLogged && <NotLoggedComponent />}
                {isLogged && <ProfileComponent userLogged={userLogged} />}
            </>}
        </SafeAreaView>
    );
}

export default LogInComponent;
