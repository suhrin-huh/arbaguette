import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import React from 'react';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

import Colors from '@/constants/Colors';

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({ style, animatedIndex }) => {
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(animatedIndex.value, [0, 1], [Colors.PRIMARY, Colors.PRIMARY]),
    borderRadius: 24,
    elevation: 4,
  }));

  return <Animated.View pointerEvents="none" style={[style, containerAnimatedStyle]} />;
};

export default CustomBackground;
