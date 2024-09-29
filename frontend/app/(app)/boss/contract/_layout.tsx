import { Stack } from 'expo-router';

const ContractRootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      {/* <Stack.Screen name="main/management/register/2" /> */}
      {/* <Stack.Screen name="main/management/register/3" /> */}
      {/* <Stack.Screen name="main/management/register/4" /> */}
    </Stack>
  );
};

export default ContractRootLayout;
