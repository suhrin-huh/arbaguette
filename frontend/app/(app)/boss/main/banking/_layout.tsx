import { Stack } from 'expo-router';
import React from 'react';

const BankingLayout = () => {
  return (
    <Stack
      initialRouteName="banking"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" options={{ title: '빵Pay' }} />
      <Stack.Screen name="transaction" options={{ title: '송금 목록' }} />
      <Stack.Screen name="remittance" />
    </Stack>
  );
};

export default BankingLayout;
