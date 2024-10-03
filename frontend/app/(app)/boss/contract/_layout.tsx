import { Stack } from 'expo-router';

const ContractRootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="DaySetModal" options={{ presentation: 'transparentModal' }} />
      <Stack.Screen name="2" />
      <Stack.Screen name="3" />
      <Stack.Screen name="4" />
      <Stack.Screen name="5" />
    </Stack>
  );
};

export default ContractRootLayout;
