import { Stack } from 'expo-router';

const BankingLayout = () => {
  return (
    <Stack initialRouteName="banking" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="transaction" />
    </Stack>
  );
};

export default BankingLayout;
