import styled from '@emotion/native';
import type { Theme } from '@emotion/react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import theme from '@/styles/Theme';

const TabContainer = styled.View(({ theme }) => ({
  flexDirection: 'row',
  backgroundColor: theme.color.GRAY['0'],
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  height: 60,
  elevation: 10,
}));

const TabBarButton = styled(Pressable)(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  gap: 0,
}));

const TabButtonText = styled.Text(({ theme, focused }: { theme: Theme; focused: boolean }) => ({
  fontSize: 12,
  fontWeight: 'bold',
  color: focused ? theme.color.PRIMARY : theme.color.GRAY['2'],
}));

const TabBar = ({ state, descriptors, navigation }: { state: any; descriptors: any; navigation: any }) => {
  return (
    <TabContainer>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const getIcon = (routeName: string) => {
          switch (routeName) {
            case '(home)':
              return (
                <FontAwesome6 name="house-chimney" size={24} color={isFocused ? Colors.PRIMARY : Colors.GRAY[2]} />
              );
            case 'schedule':
              return <FontAwesome5 name="calendar-day" size={24} color={isFocused ? Colors.PRIMARY : Colors.GRAY[2]} />;
            case 'management':
              return <Ionicons name="people" size={24} color={isFocused ? Colors.PRIMARY : Colors.GRAY[2]} />;
            case 'banking':
              return (
                <FontAwesome6
                  name="circle-dollar-to-slot"
                  size={24}
                  color={isFocused ? Colors.PRIMARY : Colors.GRAY[2]}
                />
              );
            default:
              return null;
          }
        };

        return (
          <TabBarButton key={route.key} onPress={onPress} onLongPress={onLongPress}>
            {getIcon(route.name)}
            <TabButtonText theme={theme} focused={isFocused}>
              {options.title}
            </TabButtonText>
          </TabBarButton>
        );
      })}
    </TabContainer>
  );
};

export default TabBar;
