import { Foundation } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, Tabs, useSegments } from 'expo-router';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import StoreButton from '@/components/boss/StoreButton';
import BellButton from '@/components/crew/BellButton';
import Theme from '@/styles/Theme';

const TABBAR_STYLE: StyleProp<ViewStyle> = {
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  borderWidth: 0,
  elevation: 0,
  height: 60,
};

const BossMainLayout = () => {
  const segments = useSegments();

  console.log(segments);

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.color.WHITE,
          elevation: 0,
        },
        headerTitleAlign: 'center',
        headerLeftContainerStyle: { paddingHorizontal: Theme.layout.PADDING.HORIZONTAL },
        headerRightContainerStyle: { paddingHorizontal: Theme.layout.PADDING.HORIZONTAL },
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          ...TABBAR_STYLE,
        },
        tabBarLabelStyle: {
          paddingBottom: 10,
        },
      }}
      initialRouteName="(home)">
      <Tabs.Screen
        name="(home)"
        options={{
          title: '홈',
          headerRight: () => <BellButton onPress={() => router.navigate('/notification')} />,
          headerLeft: () => <StoreButton onPress={() => router.navigate('/boss/config/')} />,
          tabBarIcon: ({ size, color, focused }) => (
            <Foundation name="home" size={size} color={focused ? Theme.color.PRIMARY : Theme.color.GRAY['1']} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: '스케쥴',
          headerRight: () => <BellButton onPress={() => router.navigate('/notification')} />,
          tabBarIcon: ({ size, color, focused }) => (
            <FontAwesome5 name="calendar" size={size} color={focused ? Theme.color.PRIMARY : Theme.color.GRAY['1']} />
          ),
        }}
      />
      <Tabs.Screen
        name="management"
        options={{
          title: '직원 관리',
          headerRight: () => <BellButton onPress={() => router.navigate('/notification')} />,
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialCommunityIcons
              name="view-list"
              size={size}
              color={focused ? Theme.color.PRIMARY : Theme.color.GRAY['1']}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="banking"
        options={{
          title: '뱅킹',
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialCommunityIcons
              name="bank"
              size={size}
              color={focused ? Theme.color.PRIMARY : Theme.color.GRAY['1']}
            />
          ),
          tabBarStyle: {
            ...TABBAR_STYLE,
            display: segments[4] === 'remittance' && segments[5] === '2' ? 'none' : 'flex',
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default BossMainLayout;
