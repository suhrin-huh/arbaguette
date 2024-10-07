import { Stack } from 'expo-router';

const BankingLayout = () => {
  return (
    <Stack initialRouteName="banking" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="payStub" />
      <Stack.Screen name="transaction" />
      <Stack.Screen name="remittance" />
    </Stack>
  );
};

export default BankingLayout;
