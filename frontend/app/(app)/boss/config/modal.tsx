import styled from '@emotion/native';
import { BottomSheetModal, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { router, useLocalSearchParams } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useMemo, useRef, useState } from 'react';

import LoadingAnimation from '@/assets/lottie/loading.json';
import ReadyAnimation from '@/assets/lottie/nfc_ready.json';
import RegisteredAnimation from '@/assets/lottie/nfc_registered.json';
import CustomBackdrop from '@/components/common/BottomSheetOption/CustomBackdrop';
import CustomBackground from '@/components/common/BottomSheetOption/CustomBackgound';
import type { State } from '@/util/nfc';
import { writeNfcData } from '@/util/nfc';
import timer from '@/util/timer';

const NFC = {
  ready: {
    getText: () => (
      <NfcReadyTextBox>
        <NfcReadyText1>출근 관리용 NFC를</NfcReadyText1>
        <NfcReadyText2>등록해주세요.</NfcReadyText2>
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
        <NfcReadyText1>NFC 등록 중</NfcReadyText1>
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
        <NfcReadyText1>NFC 등록을 완료했습니다.</NfcReadyText1>
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
};

const NfcModal = () => {
  const { dismiss } = useBottomSheetModal();
  const [state, setState] = useState<State>('ready');
  const { companyId } = useLocalSearchParams<{ companyId: string }>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%', '40%'], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
    (async () => {
      const stateGenerator = writeNfcData(companyId);

      const { value: initialState } = await stateGenerator.next();
      setState(initialState);

      const { value: processingState } = await stateGenerator.next();
      setState(processingState);

      await timer(2000, async () => {
        const { value: finishState } = await stateGenerator.next();
        setState(finishState);
      });
      await timer(1500, dismiss);
    })();
  }, [companyId, dismiss]);

  const handleDismiss = () => {
    router.back();
  };

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

export default NfcModal;
