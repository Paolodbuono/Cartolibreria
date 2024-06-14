import React from 'react';

import LogoButtonComponent from '@/components/LogoButtonComponent/LogoButton.component';
import { Stack } from 'expo-router';

export default function Layout() {

  return (
    <Stack
      screenOptions={{
        headerTintColor: '#f4511e',
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitle: props => <LogoButtonComponent />,
      }}>
      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="SignInView" options={{}} />
      <Stack.Screen name="LogInView" options={{}} />
    </Stack>
  )
}