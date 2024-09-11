import Styled from '@emotion/native';

import SpiralFace from '@/assets/images/spiral-eyes.png';

const ThumbImage = Styled.Image({ height: 20, width: 20 });

const Thumb = Styled.View(({ theme }) => ({
  width: 27,
  height: 27,
  backgroundColor: theme.color.WHITE,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 14,
}));

const ProgressBarThumb = () => {
  return (
    <Thumb>
      <ThumbImage source={SpiralFace} />
    </Thumb>
  );
};

export default ProgressBarThumb;
