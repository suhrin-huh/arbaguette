import Styled from '@emotion/native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView } from 'react-native';

import checkAnim from '@/assets/lottie/check.json';
import Button from '@/components/common/Button';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import arbaguette from '@/services/arbaguette';
import useRootStore from '@/zustand';

const SuccessScreen = () => {
  const { refreshToken, updateTokens } = useRootStore();

  const handleReIssue = async () => {
    const { data } = await arbaguette.reIssue(refreshToken);
    const { accessToken, refreshToken: newRefreshToken } = data.data;
    updateTokens(accessToken, newRefreshToken);
  };

  const pathRoute = (to: 'paper' | 'next') => {
    switch (to) {
      case 'paper':
        router.push('/crew/unauthorized/pdf');
        break;
      case 'next':
        handleReIssue();
        break;
    }
  };

  return (
    <ContainerView style={{ backgroundColor: Colors.WHITE, paddingTop: 20 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, gap: 20, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}>
        <CompleteContainer>
          <ContentBox>
            <LottieBox>
              <LottieView style={{ width: 160, height: 160 }} source={checkAnim} autoPlay loop={false} />
              <LottieText>서명이 완료되었습니다.</LottieText>
            </LottieBox>
          </ContentBox>
        </CompleteContainer>
        <ButtonContainer>
          <Button type="outlined" size="fill" buttonStyle={{ flex: 1 }} onPress={() => pathRoute('paper')}>
            근로계약서
          </Button>
          <Button type="primary" size="fill" buttonStyle={{ flex: 1 }} onPress={() => pathRoute('next')}>
            완료
          </Button>
        </ButtonContainer>
      </ScrollView>
    </ContainerView>
  );
};

export default SuccessScreen;

const CompleteContainer = Styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: Colors.WHITE,
  padding: 20,
  alignItems: 'center',
}));

const ContentBox = Styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}));

const LottieBox = Styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 160,
}));

const LottieText = Styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.GRAY[3],
}));

const ButtonContainer = Styled.View(({ theme }) => ({
  width: '100%',
  flexDirection: 'row',
  alignItems: 'flex-end',
  gap: 10,
  //   flex: 1,
}));
