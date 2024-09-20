import styled from '@emotion/native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';

import CustomBackdrop from '@/components/common/BottomSheetOption/CustomBackdrop';
import CustomBackground from '@/components/common/BottomSheetOption/CustomBackgound';
import StoreCard from '@/components/common/StoreCard';
import Layout from '@/constants/Layout';
import NfcReadyAnimation from '@/assets/lottie/nfc_ready.json';
import NfcLoadingAnimation from '@/assets/lottie/nfc_loading.json';
import NfcRegisteredAnimation from '@/assets/lottie/nfc_registered.json';
import NfcRejectedAnimation from '@/assets/lottie/nfc_rejected.json';

interface willStoreDto {
  // 일단 임시로 가게 정보 타입 선언
  storeId: number;
  name: string;
  address: string;
}

const ConfigScreen = () => {
  const [storeList] = useState<willStoreDto[]>([
    { storeId: 1, name: '엄마네 돼지찌개', address: '광주광역시 동구' },
    { storeId: 2, name: '파리파게트 장덕점', address: '광주광역시 동일로 11-6' },
    { storeId: 3, name: '파리파게트 장덕점', address: '광주광역시 동일로 11-6' },
    { storeId: 4, name: '파리파게트 장덕점', address: '광주광역시 동일로 11-6' },
    { storeId: 5, name: '파리파게트 장덕점', address: '광주광역시 동일로 11-6' },
    { storeId: 6, name: '파리파게트 장덕점', address: '광주광역시 동일로 11-6' },
  ]);

  const animation = useRef<LottieView>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['40%', '40%'], []);
  const [nfcStatus, setNfcStatus] = useState<'ready' | 'loading' | 'registered' | 'rejected'>('registered');

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const pressStoreCard = (card: willStoreDto) => {
    console.log('카드의 ID : ', card);
  };

  const pressNfcButton = (card: willStoreDto) => {
    console.log('NFC 버튼 눌림 : ', card.storeId);
    handlePresentModalPress();
  };

  const addStoreHandler = () => {
    console.log('사업장 추가');
  };

  return (
    <InnerContainer
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: 'flex-start',
        gap: 32,
        paddingHorizontal: Layout.PADDING.HORIZONTAL,
        paddingVertical: Layout.PADDING.VERTICAL,
      }}>
      <ConfigTitle>사업장을 선택해주세요.</ConfigTitle>
      {storeList.map((store) => (
        <StoreCard storeData={store} onPress={pressStoreCard} key={store.storeId} onPressNFC={pressNfcButton} />
      ))}
      <StoreCard storeData="ADD" onPress={addStoreHandler} />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundComponent={CustomBackground}
        backdropComponent={CustomBackdrop}>
        <BottomSheetViewArea>
          {(() => {
            const renderLottieView = (source: any, loop: boolean, speed: number, text1: string, text2: string) => (
              <>
                <NfcReadyTextBox>
                  <NfcReadyText1>{text1}</NfcReadyText1>
                  <NfcReadyText2>{text2}</NfcReadyText2>
                </NfcReadyTextBox>
                <LottieView
                  autoPlay
                  loop={loop}
                  ref={animation}
                  speed={speed}
                  style={{
                    width: 280,
                    height: 280,
                  }}
                  source={source}
                />
              </>
            );

            switch (nfcStatus) {
              case 'ready':
                return renderLottieView(NfcReadyAnimation, true, 1, '출근 관리용 NFC 카드를', '등록해주세요.');
              case 'loading':
                return renderLottieView(NfcLoadingAnimation, true, 1, 'NFC를 등록중입니다.', '잠시만 기다려주세요.');
              case 'registered':
                return renderLottieView(NfcRegisteredAnimation, false, 1.5, 'NFC 등록 완료', '사업장 등록 완료');
              case 'rejected':
                return renderLottieView(NfcRejectedAnimation, false, 1, 'NFC 등록 실패', '다시 시도해주세요.');
              default:
                return null;
            }
          })()}
        </BottomSheetViewArea>
      </BottomSheetModal>
    </InnerContainer>
  );
};

export default ConfigScreen;

const InnerContainer = styled.ScrollView(({ theme }) => ({
  flexGrow: 1,
  overflow: 'visible',
}));

const ConfigTitle = styled.Text(({ theme }) => ({
  fontSize: 28,
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  textAlign: 'left',
  marginTop: 80 - theme.layout.PADDING.VERTICAL,
  marginBottom: 30,
}));

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
