import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import React, { useMemo } from 'react';
import Animated, { interpolateColor, useAnimatedStyle } from 'react-native-reanimated';

import Colors from '@/constants/Colors';

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({ style, animatedIndex }) => {
  // 애니메이션 스타일을 설정하여 배경 색상을 변경
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [Colors.PRIMARY, Colors.PRIMARY], // 여기서 색상을 정의합니다.
    ),
    borderRadius: 24, // 여기서 radius를 설정합니다.
    elevation: 4,
  }));

  // 스타일과 애니메이션 스타일을 합치기
  const containerStyle = useMemo(() => [style, containerAnimatedStyle], [style, containerAnimatedStyle]);

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};

export default CustomBackground;
