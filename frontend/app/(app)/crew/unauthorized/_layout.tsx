import { Redirect, Stack } from 'expo-router';

import useRootStore from '@/zustand';

const UnAuthorizedLayout = () => {
  const { crewStatus } = useRootStore();

  if (crewStatus === 'SIGNED') {
    return <Redirect href="/crew/authorized" />;
  }

  const initialRouteName = crewStatus === 'UNSIGNED' ? 'contract' : 'wait';

  return (
    <Stack initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="wait" />
      <Stack.Screen name="contract" />
      <Stack.Screen name="pdf" options={{ presentation: 'modal', headerShown: true }} />
      <Stack.Screen name="signature" options={{ presentation: 'modal', headerShown: true }} />
      <Stack.Screen name="success" />
    </Stack>
  );
};

export default UnAuthorizedLayout;
