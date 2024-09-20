import Styled from '@emotion/native';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import SpiralFace from '@/assets/images/spiral-eyes.png';

const ANGLE = 30;
const TIME = 100;

const ThumbImage = Styled.Image({ height: 20, width: 20 });

const Thumb = Styled(Animated.View)(({ theme }) => ({
  width: 27,
  height: 27,
  backgroundColor: theme.color.WHITE,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 14,
}));

const ProgressBarThumb = () => {
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${rotation.value}deg` }] }));

  useEffect(() => {
    rotation.value = withSequence(
      withTiming(-ANGLE, { duration: TIME / 2 }),
      withRepeat(withTiming(ANGLE, { duration: TIME }), 7, true),
      withTiming(0, { duration: TIME / 2 }),
    );
  }, [rotation]);

  return (
    <Thumb style={animatedStyle}>
      <ThumbImage source={SpiralFace} />
    </Thumb>
  );
};

export default ProgressBarThumb;
