import { Stack } from 'expo-router';

const BankingLayout = () => {
  return (
    <Stack
      initialRouteName="banking"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" options={{ headerTitle: '뱅킹' }} />
      <Stack.Screen name="payStub" options={{ headerTitle: '' }} />
      <Stack.Screen name="transaction" options={{ headerTitle: '빵Pay' }} />
      <Stack.Screen name="remittance" options={{ headerShown: false }} />
    </Stack>
  );
};

export default BankingLayout;
