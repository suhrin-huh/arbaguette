import styled from '@emotion/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';

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

const SendModal = () => {
  const { mutate: sendSalaryReceipt } = useMutation({
    mutationFn: arbaguette.sendSalaryReceipt,
    onSuccess: () => {
      setIsLoading(false);
      setIsSended(true);
      setTimeout(() => {
        router.back();
        setIsSended(false);
      }, 1200);
    },
    onError: (error: any) => {
      setIsLoading(false);
      setIsSended(false);
      if (error.response.data && error.response.status === 409) {
        Alert.alert('이미 발송된 명세서입니다.');
        router.back();
        return;
      }
      Alert.alert('급여명세서 발송 실패');
      router.back();
    },
  });

  const { crewId, month, originSalary, tax, allowance, totalTime } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);

  console.log(crewId, month, originSalary, tax, allowance, totalTime);

  const sendReceipt = async () => {
    // 급여명세서 발송 api 연동

    setIsLoading(true);
    setIsSended(false);
    sendSalaryReceipt({
      crewId: Number(crewId),
      month: Number(month),
      originSalary: Number(originSalary),
      tax: Number(tax),
      allowance: Number(allowance),
      totalTime: Number(totalTime),
    });
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
                <SendTitle>해당 직원에게</SendTitle>
                <SendTitle>명세서를 발송할까요?</SendTitle>
                <SendSubTitle>직원이 확인할 수 있습니다.</SendSubTitle>
              </SendTitleContainer>
              <SendButtonContainer>
                <SendButton size={100} onPress={() => router.back()} type="outlined">
                  취소
                </SendButton>
                {!isLoading ? (
                  <SendButton size={100} onPress={sendReceipt}>
                    전송
                  </SendButton>
                ) : (
                  <SendButton size={100}>
                    <Loading size={24} color="secondary" />
                  </SendButton>
                )}
              </SendButtonContainer>
            </SendContainer>
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

export default SendModal;
