import styled from '@emotion/native';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import checkAnim from '@/assets/lottie/check.json';
import Button from '@/components/common/Button';
import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import ContainerView from '@/components/common/ScreenContainer';
import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

const ManagementRegisterScreen4 = () => {
  const { registName } = useRootStore();

  const pathRoute = (to: 'back' | 'next') => {
    switch (to) {
      case 'back':
        router.back();
        break;
      case 'next':
        console.log('완료');
        router.push('/boss/main/management');
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
            <CompleteTextBox>
              <CompleteText>{registName} 직원에게</CompleteText>
              <CompleteText>근로계약서를 발송했어요.</CompleteText>
            </CompleteTextBox>
            <LottieBox>
              <LottieView style={{ width: 160, height: 160 }} source={checkAnim} autoPlay loop={false} />
              <LottieText>직원이 서명 후 계약이 완료돼요.</LottieText>
            </LottieBox>
          </ContentBox>
        </CompleteContainer>
        <Button type="primary" size="fill" onPress={() => pathRoute('next')}>
          완료
        </Button>
      </ScrollView>
    </ContainerView>
  );
};

export default ManagementRegisterScreen4;

const CompleteContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: Colors.WHITE,
  padding: 20,
  alignItems: 'center',
}));

const ContentBox = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
}));

const LottieBox = styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 160,
}));

const LottieText = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: 'bold',
  color: theme.color.GRAY[3],
}));

const CompleteTextBox = styled.View(({ theme }) => ({
  flex: 1,
  width: '100%',
  gap: 15,
  alignItems: 'flex-start',
  justifyContent: 'center',
}));

const CompleteText = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.color.BLACK,
}));
