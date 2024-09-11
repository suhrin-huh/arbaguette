import Styled from '@emotion/native';
import { useState } from 'react';
import type { DimensionValue, LayoutChangeEvent } from 'react-native';

import ProgressBarThumb from '@/components/crew/ProgressBarThumb';

const Background = Styled.View(({ theme }) => ({
  backgroundColor: theme.color.BACKGROUND,
  height: 33,
  borderRadius: 50,
}));

const Progress = Styled.View<{ width: DimensionValue }>(({ theme, width }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor: theme.color.PRIMARY,
  flex: 1,
  width: width,
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

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setParentWidth(width);
  };

  const progressPercent = (current / total) * 100;
  const progressWidth = (progressPercent / 100) * parentWidth;
  const finalWidth = progressWidth < DEFAULT_PROGRESS_WIDTH ? DEFAULT_PROGRESS_WIDTH : progressWidth;

  return (
    <Background onLayout={handleLayout}>
      <Progress width={finalWidth}>
        <ProgressBarThumb />
      </Progress>
    </Background>
  );
};

export default ProgressBar;
