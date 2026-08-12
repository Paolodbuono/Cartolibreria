import React, { useState } from 'react';
import { View, Modal, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, usePathname, Href } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { md } from '@/constants/FontSize';
import { loadFonts } from '@/constants/fonts';
import TextComponent from '@/components/Commons/Text.component';
import LogoButtonComponent from '@/components/Commons/LogoButton.component';
import BurgerButtonComponent from '@/components/Commons/BurgerButton.component';
import { routes, RoutesType, ValidRoutes } from '@/constants/routes';

import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export default function Layout() {
  const router = useRouter();
  const pathName = usePathname();
  const [fontsLoaded] = useFonts(loadFonts);

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [routesList, setRoutesList] = useState<RoutesType[]>([...routes]);

  const { width } = Dimensions.get('window');

  const isTablet = width > 768;

  const navigateToComponent = (componentName: ValidRoutes) => {
    router.push(componentName);
    setSideBarOpen(false);
  };



  const getRoutes = async () => {
    try {
      const isLogged = isWeb ? !!localStorage.getItem('userData') : !!await AsyncStorage.getItem('userData');
      const filteredRoutes = routes.filter(el =>
        isLogged ? el.name !== "Accedi" : el.name !== "Area riservata"
      );
      setRoutesList(filteredRoutes);
    } catch (e) {
      console.error('Error fetching data from AsyncStorage:', e);
    } finally {
      setSideBarOpen(true);
    }
  };

  const isActiveRoute = (route: string) => pathName === route;


  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TextComponent>Caricamento...</TextComponent>
      </View>
    );
  }

  const styles = StyleSheet.create({
    modalOverlay: {
      width: '100%',
      height: '100%',
      justifyContent: 'flex-start', // Cambiato per evitare il centramento verticale
      alignItems: 'flex-end', // Allinea a destra
      backgroundColor: 'rgba(0,0,0,0.5)', // Sfondo semi-trasparente
    },
    modalContainer: {
      width: isTablet ? 200 : '75%', // Larghezza dinamica in base al dispositivo
      height: '100%',
      backgroundColor: 'white',
      padding: 20,
      // Aggiunto box-shadow opzionale per estetica
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5, // Ombra per Android
    },
    componentName: {
      padding: 20,
      fontSize: md + 3,
      color: "#2478d2",
    },
    currentComponentName: {
      padding: 20,
      backgroundColor: "#e1eeff",
      color: "#2478d2",
      borderRadius: 10,
      fontSize: md + 3,
      width: 1000
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTintColor: '#f4511e',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitle: () => <LogoButtonComponent />,
          headerRight: () => <BurgerButtonComponent onPress={getRoutes} />,
          headerShadowVisible: false,
          headerStyle: {
            height: isTablet ? 100 : 45,
            backgroundColor: isTablet ? "unset" : ""
          },
        }}
      >
      </Stack>
      <Modal visible={sideBarOpen} animationType="fade" transparent onRequestClose={() => setSideBarOpen(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setSideBarOpen(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={routesList}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToComponent(item.root)}>
                  <TextComponent style={!pathName || isActiveRoute(item.root) ? styles.currentComponentName : styles.componentName}>
                    {item.name}
                  </TextComponent>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </View>
  );
}


