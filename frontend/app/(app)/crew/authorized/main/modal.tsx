import styled from '@emotion/native';
import { BottomSheetModal, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import NfcManager from 'react-native-nfc-manager';

import LoadingAnimation from '@/assets/lottie/loading.json';
import ReadyAnimation from '@/assets/lottie/nfc_ready.json';
import RegisteredAnimation from '@/assets/lottie/nfc_registered.json';
import RejectedAnimation from '@/assets/lottie/nfc_rejected.json';
import CustomBackdrop from '@/components/common/BottomSheetOption/CustomBackdrop';
import CustomBackground from '@/components/common/BottomSheetOption/CustomBackgound';
import keys from '@/reactQuery/keys';
import arbaguette from '@/services/arbaguette';
import type { State } from '@/util/nfc';
import { readNfcData } from '@/util/nfc';
import timer from '@/util/timer';

const NFC = {
  ready: {
    getText: () => (
      <NfcReadyTextBox>
        <NfcReadyText1>출퇴근 스티커에</NfcReadyText1>
        <NfcReadyText2>태그해주세요.</NfcReadyText2>
      </NfcReadyTextBox>
    ),
    animation: () => (
      <LottieView
        autoPlay
        speed={1.5}
        style={{
          width: 280,
          height: 280,
        }}
        source={ReadyAnimation}
      />
    ),
  },
  processing: {
    getText: () => (
      <NfcReadyTextBox>
        <NfcReadyText1>출퇴근 기록중</NfcReadyText1>
      </NfcReadyTextBox>
    ),
    animation: () => (
      <LottieView
        autoPlay
        speed={1.5}
        style={{
          width: 280,
          height: 280,
        }}
        resizeMode="cover"
        duration={1000}
        source={LoadingAnimation}
      />
    ),
  },
  finish: {
    getText: () => (
      <NfcReadyTextBox>
        <NfcReadyText1>출퇴근 체크 되었습니다.</NfcReadyText1>
      </NfcReadyTextBox>
    ),
    animation: () => (
      <LottieView
        autoPlay
        style={{
          width: 280,
          height: 280,
        }}
        source={RegisteredAnimation}
        loop={false}
      />
    ),
  },
  error: {
    getText: () => (
      <NfcReadyTextBox>
        <NfcReadyText1>출퇴근 체크를 할 수 없습니다.</NfcReadyText1>
      </NfcReadyTextBox>
    ),
    animation: () => (
      <LottieView
        autoPlay
        style={{
          width: 280,
          height: 280,
        }}
        source={RejectedAnimation}
        loop={false}
      />
    ),
  },
};

type NfcState = State | 'error';

const Modal = () => {
  const queryClient = useQueryClient();
  const { dismiss } = useBottomSheetModal();
  const [state, setState] = useState<NfcState>('ready');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%', '40%'], []);
  const { mutate: commuteCheck } = useMutation({
    mutationFn: arbaguette.commuteCheck,
    onSuccess: async ({ data }) => {
      await queryClient.invalidateQueries({ queryKey: keys.all, refetchType: 'all' });
      setState('finish');
    },
    onError: (error) => {
      setState('error');
    },
  });

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismiss = () => {
    router.back();
  };

  useEffect(() => {
    (async () => {
      const stateGenerator = readNfcData();
      const { value: initialState } = await stateGenerator.next();
      setState(initialState.state);
      const { value: processingState } = await stateGenerator.next();
      setState(processingState.state);
      await timer(2000, async () => {
        const { value: finishState } = await stateGenerator.next();
        commuteCheck(finishState.data);
      });
      await timer(1500, dismiss);
    })();

    return () => {
      (async () => await NfcManager.cancelTechnologyRequest())();
    };
  }, [commuteCheck, dismiss]);

  return (
    <BottomSheetModal
      onDismiss={handleDismiss}
      ref={bottomSheetModalRef}
      snapPoints={snapPoints}
      backgroundComponent={CustomBackground}
      backdropComponent={CustomBackdrop}>
      <BottomSheetViewArea>
        {NFC[state].getText()}
        {NFC[state].animation()}
      </BottomSheetViewArea>
    </BottomSheetModal>
  );
};

const BottomSheetViewArea = styled(BottomSheetView)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const NfcReadyTextBox = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 30,
}));
const NfcReadyText1 = styled.Text(({ theme }) => ({
  fontSize: 24,
  color: 'white',
  fontWeight: 600,
}));
const NfcReadyText2 = styled.Text(({ theme }) => ({
  fontSize: 24,
  color: 'white',
  fontWeight: 600,
}));

export default Modal;
