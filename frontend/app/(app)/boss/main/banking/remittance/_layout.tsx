import { Stack } from 'expo-router';

const RemittanceLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="1" />
      <Stack.Screen name="2" />
    </Stack>
  );
};

export default RemittanceLayout;
