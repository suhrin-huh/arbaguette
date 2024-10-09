import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import Colors from '@/constants/Colors';

const SeperationLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerBackground: () => <View style={{ backgroundColor: Colors.PRIMARY, width: '100%', height: 100 }} />,
      }}
      initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="first" />
      <Stack.Screen name="near" />
      <Stack.Screen name="firstModal" options={{ presentation: 'transparentModal' }} />
    </Stack>
  );
};

export default SeperationLayout;
