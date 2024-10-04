import { Stack } from 'expo-router';
import React from 'react';

const BossScheduleLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="apply" options={{ presentation: 'transparentModal' }} />
    </Stack>
  );
};

export default BossScheduleLayout;
