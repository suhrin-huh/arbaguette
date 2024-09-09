import { Stack } from 'expo-router';

const CrewRootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="main" />
    </Stack>
  );
};

export default CrewRootLayout;
