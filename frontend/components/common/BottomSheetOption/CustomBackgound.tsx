import Styled from '@emotion/native';
import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';
import React from 'react';

const Background = Styled.View(({ theme }) => ({
  backgroundColor: theme.color.PRIMARY,
  borderRadius: 24,
  elevation: 4,
}));

const CustomBackground: React.FC<BottomSheetBackgroundProps> = ({ style }) => {
  return <Background pointerEvents="none" style={style} />;
};

export default CustomBackground;
