import React, { useEffect, useState } from 'react';
import { View, Button, Modal, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import LogoButtonComponent from '@/components/ButtonsComponent/LogoButton.component';
import BurgerButtonComponent from '@/components/ButtonsComponent/BurgerButton.component';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ComponentItem = {
  name: string;
  root: string;
};

const componentsList: ComponentItem[] = [
  { name: 'Registrati', root: "SignInView" },
  { name: 'Accedi', root: "LogInView" },
  // Aggiungi qui altri componenti della tua app
];

export default function Layout() {
  const router = useRouter();

  const [sideBarOpen, isSideBarOpen] = useState(false);
  const [routesList, setRoutesList] = useState(componentsList);

  const navigateToComponent = (componentName: string) => {
    router.push(componentName)
    isSideBarOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('userData');
        if (value !== null) {
          const _routesList = routesList.filter(el => el.name !== "Registrati" && el.name !== "Accedi");
          setRoutesList(_routesList)
        } else {
          setRoutesList(componentsList);
        }
      } catch (e) {
        console.log('Error fetching data from AsyncStorage:', e);
      }
    };

    getData();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerTintColor: '#f4511e',
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitle: () => <LogoButtonComponent />,
          headerRight: () => <BurgerButtonComponent onPress={() => isSideBarOpen(true)} />,
        }}
      >
        <Stack.Screen name="LogInView" options={{}} />
        <Stack.Screen name="SignInView" options={{}} />
        {/* Aggiungi qui altri Stack.Screen per i tuoi componenti */}
      </Stack>
      <Modal visible={sideBarOpen} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={routesList}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => navigateToComponent(item.root)}>
                  <Text style={styles.componentName}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Button onPress={() => isSideBarOpen(false)} title="Close Menu" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  componentName: {
    padding: 10,
    fontSize: 18,
  },
});
