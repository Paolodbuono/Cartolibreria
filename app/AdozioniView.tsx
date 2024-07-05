import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useNavigation } from "expo-router";
import { AdozioniComponent } from "@/components/AdozioniComponent/Adozioni.component";

export default function AdozioniView() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <Stack.Screen options={{ headerTitle: "Adozioni" ,headerTitleStyle: { fontFamily: "Allan-Regular" } }} />
            <AdozioniComponent />
        </View>
    );
}
