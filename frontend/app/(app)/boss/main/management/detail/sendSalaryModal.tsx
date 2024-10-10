import styled from '@emotion/native';
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useMutation } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Alert, Modal, Text } from 'react-native';

import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import ContainerView from '@/components/common/ScreenContainer';
import arbaguette from '@/services/arbaguette';

import sendComplete from '../../../../../../assets/lottie/check.json';

const SendBackground = styled(ContainerView)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  paddingVertical: 250,
}));

const SendContainer = styled(ContainerView)(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  width: '90%',
  borderRadius: 10,
  justifyContent: 'space-between',
  gap: 30,
  elevation: 30,
}));

const SendTitleContainer = styled(ContainerView)(({ theme }) => ({
  justifyContent: 'center',
  paddingTop: 30,
  alignItems: 'center',
  width: '100%',
  gap: 5,
}));

const SendTitle = styled(Text)(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.color.BLACK,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
}));

const SendSubTitle = styled(Text)(({ theme }) => ({
  fontSize: 16,
  color: theme.color.GRAY[3],
  paddingTop: 20,
}));

const SendButtonContainer = styled(ContainerView)(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: 10,
  paddingBottom: 20,
}));

const SendButton = styled(Button)(({ theme }) => ({
  height: 40,
  borderRadius: 10,
}));

const SendSalaryModal = () => {
  const { crewId, money, name } = useLocalSearchParams();
  console.log('money', money);
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const { mutate: sendSalary } = useMutation({
    mutationFn: arbaguette.sendSalary,
    onSuccess: () => {
      setIsLoading(false);
      setIsSended(true);
    },
    onError: (error: any) => {
      setIsLoading(false);
      setIsSended(false);
      Alert.alert('송금 실패', '송금에 실패했습니다.', [
        {
          text: '확인',
          onPress: () => {
            router.back();
          },
        },
      ]);
    },
  });

  const handleSendSalary = async () => {
    setIsLoading(true);
    setIsSended(false);
    sendSalary({ crewId: Number(crewId), money: String(money) });
  };

  return (
    <ContainerView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          router.back();
        }}>
        <SendBackground>
          {!isSended ? (
            <SendContainer>
              <SendTitleContainer>
                <SendTitle>{name} 님에게</SendTitle>
                <SendTitle>급여 {money.toLocaleString('ko-KR')} 원을</SendTitle>
                <SendSubTitle>송금하시겠습니까?</SendSubTitle>
              </SendTitleContainer>
              <SendButtonContainer>
                <SendButton size={100} onPress={() => router.back()} type="outlined">
                  취소
                </SendButton>
                <SendButton size={100} onPress={handleSendSalary}>
                  전송
                </SendButton>
              </SendButtonContainer>
            </SendContainer>
          ) : !isLoading ? (
            <SendButton size={100}>
              <Loading size={24} color="secondary" />
            </SendButton>
          ) : (
            <SendContainer>
              <SendTitleContainer>
                <LottieView style={{ width: 150, height: 150, marginBottom: 30 }} source={sendComplete} autoPlay />
              </SendTitleContainer>
            </SendContainer>
          )}
        </SendBackground>
      </Modal>
    </ContainerView>
  );
};

export default SendSalaryModal;
