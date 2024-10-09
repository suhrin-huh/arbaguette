import styled from '@emotion/native';
import { useLastNotificationResponse } from 'expo-notifications';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';

import ToastLottie from '@/assets/lottie/toast.json';
import Screen from '@/components/common/Screen';
import arbaguette from '@/services/arbaguette';
import useRootStore from '@/zustand';

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
  const { updateTokens, accessToken: prevAccessToken } = useRootStore();
  const notificationResponse = useLastNotificationResponse();

  useEffect(() => {
    (async () => {
      if (
        !notificationResponse ||
        notificationResponse?.notification.request.content.data.url !== 'arbaguette://crew/unauthorized/contract'
      )
        return;
      const { data } = await arbaguette.reIssue(prevAccessToken);
      const { accessToken, refreshToken } = data.data;
      updateTokens(accessToken, refreshToken);
    })();
  }, [notificationResponse, prevAccessToken, updateTokens]);

  return (
    <Screen type="view">
      <Container>
        <LottieView source={ToastLottie} autoPlay style={{ width: 400, height: 400 }} />
        <Text>사장님이 등록하길 기다려주세요.</Text>
      </Container>
    </Screen>
  );
};

export default WaitingRoomScreen;
