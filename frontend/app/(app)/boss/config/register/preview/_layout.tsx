import { Stack } from 'expo-router';

const PreviewLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="complete" />
    </Stack>
  );
};

export default PreviewLayout;
