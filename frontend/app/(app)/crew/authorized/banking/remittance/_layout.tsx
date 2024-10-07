import { Stack } from 'expo-router';

const RemittanceLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="1" />
      <Stack.Screen name="2" />
      <Stack.Screen name="3" />
      <Stack.Screen name="success" />
      {/* <Stack.Screen name="spreadMoney" /> */}
    </Stack>
  );
};

export default RemittanceLayout;
