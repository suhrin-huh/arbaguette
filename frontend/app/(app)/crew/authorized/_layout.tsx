import { Foundation } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router, Tabs, useGlobalSearchParams, useSegments } from 'expo-router';
import type { RegisteredStyle, StyleProp, ViewStyle } from 'react-native';

import BellButton from '@/components/crew/BellButton';
import CalendarButton from '@/components/crew/CalendarButton';
import Theme from '@/styles/Theme';

const TABBAR_STYLE: StyleProp<ViewStyle> = {
  borderTopRightRadius: 20,
  borderTopLeftRadius: 20,
  borderWidth: 0,
  elevation: 0,
  height: 60,
};

const CrewMainLayout = () => {
  const segments = useSegments();
  const { year, month } = useGlobalSearchParams<Partial<{ year: string; month: string }>>();

  return (
    <Tabs
      initialRouteName="main"
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
      }}>
      <Tabs.Screen
        name="main"
        options={{
          title: '홈',
          headerRight: () => <BellButton onPress={() => router.navigate('/crew/authorized/management/contract')} />,
          tabBarIcon: ({ size, color, focused }) => (
            <Foundation name="home" size={size} color={focused ? Theme.color.PRIMARY : Theme.color.GRAY['1']} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: '스케줄',
          headerRight: () => <BellButton onPress={() => router.navigate('/crew/authorized/management/contract')} />,
          tabBarIcon: ({ size, color, focused }) => (
            <FontAwesome5 name="calendar" size={size} color={focused ? Theme.color.PRIMARY : Theme.color.GRAY['1']} />
          ),
        }}
      />
      <Tabs.Screen
        name="management"
        options={{
          title: '근무 내역',
          headerTitle: '근무 내역 조회',
          headerRight: () => <BellButton onPress={() => router.navigate('/crew/authorized/management/contract')} />,
          headerLeft: () => (
            <CalendarButton
              onPress={() =>
                router.navigate({
                  pathname: '/crew/authorized/management/calendar',
                  params: { year, month },
                })
              }
            />
          ),
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
            display:
              segments[4] === 'remittance' && (segments[5] === '3' || segments[5] === 'success') ? 'none' : 'flex',
          },
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default CrewMainLayout;
