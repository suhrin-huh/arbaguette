import styled from '@emotion/native';
import LottieView from 'lottie-react-native';

import ToastLottie from '@/assets/lottie/toast.json';
import Screen from '@/components/common/Screen';

const Container = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  paddingTop: 120,
  gap: 10,
}));

const Text = styled.Text({
  fontSize: 24,
  fontWeight: 600,
});

const WaitingRoomScreen = () => {
  return (
    <Screen>
      <Container>
        <LottieView source={ToastLottie} autoPlay style={{ width: 400, height: 400 }} />
        <Text>사장님이 등록하길 기다려주세요.</Text>
      </Container>
    </Screen>
  );
};

export default WaitingRoomScreen;
