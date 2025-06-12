import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator as Spinner, Platform} from 'react-native';

import { gs } from '@/style/globalStyles';
import { UserType, emptyUser } from '@/types/UserType';

import { ProfileComponent } from './Profile.component';
import { NotLoggedComponent } from './NotLogged.component';

const isWeb = Platform.OS === "web";

export const LogInComponent: React.FC<{}> = ({ }) => {

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userLogged, setUserLogged] = useState<UserType>(emptyUser);

    useEffect(() => {
        const getData = async () => {
            try {
                const value = isWeb ? localStorage.getItem('userData') : await AsyncStorage.getItem('userData');
                if (value !== null) {
                    const parsedValue: UserType = JSON.parse(value);
                    if (!parsedValue) return;
                    setUserLogged(parsedValue);
                    setIsLogged(true);
                }
                setIsLoading(false);
            } catch (e) {
                console.log('Error fetching data from AsyncStorage:', e);
            }
        };

        getData();
    }, []);


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {isLoading && <View style={gs.spinner} children={<Spinner size="large" />} />}
            {!isLoading && <>
                {!isLogged && <NotLoggedComponent />}
                {isLogged && <ProfileComponent userLogged={userLogged} />}
            </>}
        </View>
    );
}

export default LogInComponent;
