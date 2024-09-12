import styled from '@emotion/native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import { useCallback, useMemo, useRef, useState } from 'react';

import NfcAnimation from '@/assets/lottie/nfc_ready.json';
import CustomBackdrop from '@/components/common/BottomSheetOption/CustomBackdrop';
import CustomBackground from '@/components/common/BottomSheetOption/CustomBackgound';
import StoreCard from '@/components/common/StoreCard';
import Layout from '@/constants/Layout';

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
