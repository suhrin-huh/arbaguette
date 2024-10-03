import type { BottomSheetModalProps } from '@gorhom/bottom-sheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useRef } from 'react';

import CustomBackdrop from '@/components/common/BottomSheetOption/CustomBackdrop';

interface ModalProps extends BottomSheetModalProps {
  children: ReactNode;
}

const Modal = ({ children, ...props }: ModalProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%'], []);

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
      backdropComponent={CustomBackdrop}
      {...props}>
      {children}
    </BottomSheetModal>
  );
};

export default Modal;
