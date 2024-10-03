import { Stack } from 'expo-router';

const TransferLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="1" />
      <Stack.Screen name="2" />
    </Stack>
  );
};

export default TransferLayout;
