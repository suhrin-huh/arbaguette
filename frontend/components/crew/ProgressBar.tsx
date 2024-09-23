import Styled from '@emotion/native';
import { useEffect, useState } from 'react';
import type { DimensionValue, LayoutChangeEvent } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import ProgressBarThumb from '@/components/crew/ProgressBarThumb';

const Background = Styled.View(({ theme }) => ({
  backgroundColor: theme.color.BACKGROUND,
  height: 33,
  borderRadius: 50,
}));

const Progress = Styled(Animated.View)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: theme.color.PRIMARY,
  flex: 1,
  width: 0,
  height: 33,
  borderRadius: 50,
  paddingHorizontal: 5,
}));

interface ProgressBarProps {
  total: number;
  current: number;
}

const DEFAULT_PROGRESS_WIDTH = 36;

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const [parentWidth, setParentWidth] = useState(0);
  const childWidth = useSharedValue(0);

  const progressPercent = (current / total) * 100;
  const progressWidth = (progressPercent / 100) * parentWidth;
  const finalWidth = progressWidth < DEFAULT_PROGRESS_WIDTH ? DEFAULT_PROGRESS_WIDTH : progressWidth;

  const animatedStyle = useAnimatedStyle(() => ({ width: childWidth.value }));

  useEffect(() => {
    childWidth.value = withTiming(finalWidth, { duration: 500 });
  }, [childWidth, finalWidth]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  return (
    <Background onLayout={handleLayout}>
      <Progress style={animatedStyle}>
        <ProgressBarThumb />
      </Progress>
    </Background>
  );
};

export default ProgressBar;
