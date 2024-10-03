import styled from '@emotion/native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useEffect, useMemo, useRef } from 'react';

import CustomBackdrop from '@/components/common/BottomSheetOption/CustomBackdrop';
import CustomBackground from '@/components/common/BottomSheetOption/CustomBackgound';

const BottomSheetViewArea = styled(BottomSheetView)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const SignatureModal = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
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
      <BottomSheetViewArea />
    </BottomSheetModal>
  );
};

export default SignatureModal;
