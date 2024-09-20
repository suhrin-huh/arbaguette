import styled from '@emotion/native';
import { router } from 'expo-router';
import { useState } from 'react';

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

  const pressStoreCard = (card: willStoreDto) => {
    console.log('카드의 ID : ', card);
  };

  const pressNfcButton = (card: willStoreDto) => {
    console.log('NFC 버튼 눌림 : ', card.storeId);
    router.push('/(app)/boss/config/modal');
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
    </InnerContainer>
  );
};

export default ConfigScreen;

const InnerContainer = styled.ScrollView({
  flexGrow: 1,
  overflow: 'visible',
});

const ConfigTitle = styled.Text(({ theme }) => ({
  fontSize: 28,
  fontWeight: 'bold',
  justifyContent: 'flex-start',
  textAlign: 'left',
  marginTop: 80 - theme.layout.PADDING.VERTICAL,
  marginBottom: 30,
}));
