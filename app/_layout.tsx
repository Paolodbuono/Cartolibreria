import React, { useState } from 'react';
import { View, Button, Modal, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import LogoButtonComponent from '@/components/Commons/LogoButton.component';
import BurgerButtonComponent from '@/components/Commons/BurgerButton.component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import TextComponent from '@/components/Commons/Text.component';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

type ComponentItem = {
  name: string;
  root: string;
};

const componentsList: ComponentItem[] = [
  { name: 'Home', root: "HomeView" },
  { name: 'Accedi', root: "MyProfileView" },
  { name: 'Prenota appuntamento', root: "AppuntamentoView" },
  { name: 'Chi Siamo', root: "WhoAreWeView" },
  { name: 'Avvisi Importanti', root: "NoticeView" },
  { name: 'Perchè sceglierci', root: "WhyChoseUsView" },
  { name: 'I miei ordini', root: "MyOrdersView" },
  { name: 'Area riservata', root: "MyProfileView" },
];

export default function Layout() {
  const router = useRouter();
  const pathName = usePathname();
  const [fontsLoaded] = useFonts({
    'Allan-Regular': require('@/assets/fonts/Allan-Regular.ttf'),
    'Allan-Bold': require('@/assets/fonts/Allan-Bold.ttf'),
  });

  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [routesList, setRoutesList] = useState(componentsList);

  const navigateToComponent = (componentName: string) => {
    router.push(componentName)
    setSideBarOpen(false);
  };

  const getRoutes = async () => {
    try {
      const value = await AsyncStorage.getItem('userData');
      if (value !== null) { // Vuol dire che è loggato
        const _routesList = routesList.filter(el => el.name !== "Accedi");
        setRoutesList(_routesList)
      } else {
        const _routesList = routesList.filter(el => el.name !== "Area riservata");
        setRoutesList(_routesList);
      }
    } catch (e) {
      console.log('Error fetching data from AsyncStorage:', e);
    }

    setSideBarOpen(true);
  }

  if (!fontsLoaded) return <></>;

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTintColor: '#f4511e',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitle: () => <LogoButtonComponent />,
          headerRight: () => <BurgerButtonComponent onPress={getRoutes} />,
        }}
      >
      </Stack>
      <Modal visible={sideBarOpen} animationType="fade" transparent={true} onRequestClose={() => { setSideBarOpen(false); }}>
        <View style={styles.modalOverlay}>
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
                    <TextComponent style={pathName === "/" + item.root ? styles.currentComponentName : styles.componentName}>{item.name}</TextComponent>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    width: wp('100%'),
    height: hp("100%"),
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: wp('75%'),
    height: hp("100%"),
    backgroundColor: 'white',
    padding: 20,
  },
  componentName: {
    padding: 20,
    fontSize: 28,
  },
  currentComponentName: {
    padding: 20,
    backgroundColor: "#e1eeff",
    color: "#2478d2",
    borderRadius: 10,
    fontSize: 28,
  },
});
