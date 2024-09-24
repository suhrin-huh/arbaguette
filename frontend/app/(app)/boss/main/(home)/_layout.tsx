import { Stack } from 'expo-router';
import React from 'react';

const HomeLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default HomeLayout;
