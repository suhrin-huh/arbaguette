import styled from '@emotion/native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useMemo, useRef } from 'react';

import NfcAnimation from '@/assets/lottie/nfc_ready.json';
import CustomBackdrop from '@/components/common/BottomSheetOption/CustomBackdrop';
import CustomBackground from '@/components/common/BottomSheetOption/CustomBackgound';

const NfcModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const animation = useRef<LottieView>(null);
  const snapPoints = useMemo(() => ['40%', '40%'], []);

  useEffect(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
        <NfcReadyTextBox>
          <NfcReadyText1>출근 관리용 NFC를</NfcReadyText1>
          <NfcReadyText2>등록해주세요.</NfcReadyText2>
        </NfcReadyTextBox>
        <LottieView
          autoPlay
          ref={animation}
          speed={1.5}
          style={{
            width: 280,
            height: 280,
          }}
          source={NfcAnimation}
        />
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
