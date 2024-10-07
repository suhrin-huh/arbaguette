import { router, Stack } from 'expo-router';
import React from 'react';

import BellButton from '@/components/crew/BellButton';

const BankingLayout = () => {
  return (
    <Stack
      initialRouteName="banking"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerRight: () => <BellButton onPress={() => router.navigate('/crew/authorized/management/contract')} />,
      }}>
      <Stack.Screen name="index" options={{ title: '빵Pay' }} />
      <Stack.Screen name="transaction" options={{ title: '송금 목록' }} />
      <Stack.Screen name="remittance" />
    </Stack>
  );
};

export default BankingLayout;
