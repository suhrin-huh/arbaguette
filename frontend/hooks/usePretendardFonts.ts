import { useFonts } from 'expo-font';

import PretendardBlack from '@/assets/fonts/Pretendard/Pretendard-Black.ttf';
import PretendardBold from '@/assets/fonts/Pretendard/Pretendard-Bold.ttf';
import PretendardExtraBold from '@/assets/fonts/Pretendard/Pretendard-ExtraBold.ttf';
import PretendardExtraLight from '@/assets/fonts/Pretendard/Pretendard-ExtraLight.ttf';
import PretendardLight from '@/assets/fonts/Pretendard/Pretendard-Light.ttf';
import PretendardMedium from '@/assets/fonts/Pretendard/Pretendard-Medium.ttf';
import PretendardRegular from '@/assets/fonts/Pretendard/Pretendard-Regular.ttf';
import PretendardSemiBold from '@/assets/fonts/Pretendard/Pretendard-SemiBold.ttf';
import PretendardThin from '@/assets/fonts/Pretendard/Pretendard-Thin.ttf';

const usePretendardFonts = () => {
  const [loaded, error] = useFonts({
    PretendardBlack,
    PretendardRegular,
    PretendardBold,
    PretendardExtraBold,
    PretendardExtraLight,
    PretendardMedium,
    PretendardLight,
    PretendardSemiBold,
    PretendardThin,
  });

  return [loaded, error];
};

export default usePretendardFonts;
