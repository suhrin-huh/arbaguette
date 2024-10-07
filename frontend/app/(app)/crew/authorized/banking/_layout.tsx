import { router, Stack } from 'expo-router';

import BellButton from '@/components/crew/BellButton';
import Theme from '@/styles/Theme';

const BankingLayout = () => {
  return (
    <Stack
      initialRouteName="banking"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerRight: () => <BellButton onPress={() => router.navigate('/crew/authorized/management/contract')} />,
      }}>
      <Stack.Screen name="index" options={{ headerTitle: '뱅킹' }} />
      <Stack.Screen name="payStub" options={{ headerTitle: '' }} />
      <Stack.Screen name="transaction" options={{ headerTitle: '빵Pay' }} />
      <Stack.Screen name="remittance" options={{ headerShown: false }} />
    </Stack>
  );
};

export default BankingLayout;