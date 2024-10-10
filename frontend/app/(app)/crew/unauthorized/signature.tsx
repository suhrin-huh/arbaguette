import styled from '@emotion/native';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import type { SignatureViewRef } from 'react-native-signature-canvas';
import Signature from 'react-native-signature-canvas';

import Button from '@/components/common/Button';
import arbaguette from '@/services/arbaguette';
import useRootStore from '@/zustand';

const ContractContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,
  paddingHorizontal: 10,
  width: '100%',
  height: '100%',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  marginBottom: 30,
}));

const ContextBox = styled.View(({ theme }) => ({
  flex: 1,
  marginTop: 60,
  backgroundColor: theme.color.WHITE,
  width: '100%',
  alignItems: 'stretch',
  justifyContent: 'space-between',
}));

const InfoHeader = styled.View(({ theme }) => ({
  gap: 15,
  backgroundColor: theme.color.WHITE,
  width: '100%',
  alignItems: 'flex-start',
  justifyContent: 'center',
}));

const SignContainer = styled.View(({ theme }) => ({
  width: '100%',
  borderRadius: 16,
  overflow: 'hidden',
  backgroundColor: theme.color.WHITE,
  height: 250,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 2,
  borderColor: theme.color.PRIMARY,
}));

const ButtonBox = styled.View(({ theme }) => ({
  gap: 10,
  paddingTop: 2,
}));

const InfoTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.color.BLACK,
}));

const SignContractBox = () => {
  const { mutate: sign } = useMutation({
    mutationFn: arbaguette.signCrewSignature,
    onSuccess: async () => {
      await arbaguette.makeSchedule();
      // console.log('시도중');
      // router.dismissAll();
      router.push('/crew/unauthorized/success');
      // console.log('시도 완');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.status === 409) {
          Alert.alert('오류', '이미 서명된 계약서입니다.');
          router.dismissAll();
          router.replace('/crew/authorized/main');
        }
      }
      console.log('error', error);
    },
  });
  const ref = useRef<SignatureViewRef>(null);
  const [signatureURI, setSignatureURI] = useState<string | null>(null);

  const handleOK = (signature: string) => {
    if (!signature) {
      Alert.alert('오류', '서명 데이터가 비어 있습니다.');
      return;
    }
    sign(signature);
  };

  const handleConfirm = () => {
    ref.current?.readSignature();
  };

  const handleClear = () => {
    ref.current?.clearSignature();
    setSignatureURI(null);
  };

  useEffect(() => {
    console.log('signatureURI : ', signatureURI);
  }, [signatureURI]);

  return (
    <ContractContainer>
      <ContextBox>
        <InfoHeader>
          <InfoTitle>서명을 입력해주세요.</InfoTitle>
          <InfoTitle>서명이 완료되면</InfoTitle>
          <InfoTitle>근로계약이 체결되요.</InfoTitle>
        </InfoHeader>
        <SignContainer>
          <Signature
            ref={ref}
            onOK={handleOK}
            onEmpty={() => Alert.alert('서명', '서명이 비어있습니다.')}
            descriptionText="서명을 입력해주세요."
            penColor="black"
            clearText="지우기"
            confirmText="저장"
            webStyle={style}
            autoClear={false}
          />
        </SignContainer>
        <ButtonBox>
          <Button type="outlined" onPress={handleClear}>
            초기화
          </Button>
          <Button type="primary" onPress={handleConfirm}>
            서명 완료
          </Button>
        </ButtonBox>
      </ContextBox>
    </ContractContainer>
  );
};

const style = `
  .m-signature-pad {
    box-shadow: none; 
    border: none; 
    width: 100%;
    height: 100%;
  }
  .m-signature-pad--footer {
    display: none;
    margin: 0px;
  }
`;

export default SignContractBox;
