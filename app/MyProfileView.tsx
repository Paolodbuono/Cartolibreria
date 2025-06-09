import React from "react";
import { useEffect } from "react";
import { View } from "react-native";
import { Stack, useNavigation } from "expo-router";
import MyProfileComponent from "@/components/MyProfileComponent/MyProfile.component";
import { bg } from "@/constants/FontSize";

export default function MyProfileView() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: true });
    }, [navigation]);

    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
            <Stack.Screen options={{ headerTitle: "Profilo", headerTitleStyle: { fontFamily: "Allan-Regular",  fontSize: bg } }} />
            <MyProfileComponent />
        </View>
    );
}
