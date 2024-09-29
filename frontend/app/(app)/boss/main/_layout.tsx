import { Tabs } from 'expo-router';
import React from 'react';

import TabBar from '@/components/common/Tabbar';

const BossMainLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }} initialRouteName="(home)" tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="(home)" options={{ title: '홈' }} />
      <Tabs.Screen name="schedule" options={{ title: '스케쥴' }} />
      <Tabs.Screen name="management" options={{ title: '직원 관리', href: null }} />
      <Tabs.Screen name="banking" options={{ title: '뱅킹' }} />
    </Tabs>
  );
};

export default BossMainLayout;
