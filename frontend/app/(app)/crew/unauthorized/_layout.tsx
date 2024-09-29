import { Redirect, Stack } from 'expo-router';

import useRootStore from '@/zustand';

const UnAuthorizedLayout = () => {
  const { crewStatus } = useRootStore();

  if (crewStatus === 'SIGNED') {
    return <Redirect href="/crew/authorized" />;
  }

  const initialRouteName = crewStatus === 'UNSIGNED' ? 'wait' : 'signature';

  return (
    <Stack initialRouteName={initialRouteName}>
      <Stack.Screen name="wait" />
      <Stack.Screen name="signature" />
    </Stack>
  );
};

export default UnAuthorizedLayout;
