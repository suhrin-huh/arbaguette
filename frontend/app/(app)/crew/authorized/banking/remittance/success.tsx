import Styled from '@emotion/native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';

import SuccessAnimation from '@/assets/lottie/remittance_success.json';
import Button from '@/components/common/Button';
import Text from '@/components/common/Text';

const SuccessScreen = () => {
  const goToBanking = () => {
    router.push('/(app)/crew/authorized/banking');
  };
  return (
    <Container>
      <ContentBox>
        <LottieView
          autoPlay
          speed={1.5}
          style={{
            width: 200,
            height: 200,
          }}
          resizeMode="cover"
          duration={2000}
          source={SuccessAnimation}
        />
        <Text size="title" weight="bold">
          송금이 완료되었습니다.
        </Text>
      </ContentBox>
      <Button onPress={goToBanking}>돌아가기</Button>
    </Container>
  );
};

const Container = Styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const ContentBox = Styled.View(() => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 80,
}));

export default SuccessScreen;
