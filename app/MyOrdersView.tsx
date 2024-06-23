import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useNavigation } from "expo-router";
import MyOrdersComponent from "@/components/MyOrdersComponent/MyOrders.component";

export default function LogInView() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Stack.Screen options={{ headerTitle: "I Miei Ordini" }} />
            <MyOrdersComponent />
        </View>
    );
}
