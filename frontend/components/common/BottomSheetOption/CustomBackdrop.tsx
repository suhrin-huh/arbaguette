import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import React from 'react';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
  return (
    <Animated.View
      style={[
        style,
        {
          backgroundColor: 'rgba(0,0,0,0.3)',
        },
      ]}
      entering={FadeIn}
      exiting={FadeOut}
    />
  );
};

export default CustomBackdrop;
