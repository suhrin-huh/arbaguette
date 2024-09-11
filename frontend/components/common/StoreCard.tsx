import React from 'react'
import styled from '@emotion/native'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '@/constants/Colors';


type willStoreDto = { // 일단 임시로 가게 정보 타입 선언
  storeId: number;
  name: string;
  address: string;
}

type StoredCardProps = {
  storeData: any | string;
  onPress: (card: willStoreDto) => void;
  onPressNFC?: (card: willStoreDto) => void;
}

const StoreCard = ({ storeData, onPress, onPressNFC }: StoredCardProps) => {

  if (storeData === 'ADD') {
    return (
      <PressableArea onPress={onPress.bind(this, storeData)}>
        <AddContainer>
          <AddText>가게 추가하기</AddText>
          <PlutButton name="circle-with-plus" size={28} color={Colors.PRIMARY} />
        </AddContainer>
      </PressableArea>
    )
  }

  return (
    <PressableArea onPress={onPress.bind(this, storeData)}>
      <LeftContainer>
        <StoreName>{storeData.name}</StoreName>
        <StoreAddress>{storeData.address}</StoreAddress>
      </LeftContainer>
      <IconContainer onPress={onPressNFC && onPressNFC.bind(this, storeData)}>
        <NfcIcon name="nfc" size={36} />
      </IconContainer>
    </PressableArea>
  )
}

export default StoreCard

const PressableArea = styled.Pressable(({ theme }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 19,
  width: '100%',
  height: 140,
  borderRadius: 24,
  backgroundColor: 'white',
  // iOS Shadow
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  // Android Elevation
  elevation: 5,
}));

const LeftContainer = styled.View(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  gap: 18,
}));

// AddContainer의 요소들을 수직 중앙 정렬
const AddContainer = styled.View(({ theme }) => ({
  flex: 1,
  justifyContent: 'center', // 수직 방향으로 가운데 정렬
  alignItems: 'center',      // 수평 방향으로 가운데 정렬
  flexDirection: 'column',
  gap: 15,
}));

const AddText = styled.Text(({ theme }) => ({
  color: theme.color.PRIMARY,
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 600
}));

const StoreName = styled.Text(({ theme }) => ({
  color: 'black',
  fontSize: 20,
  fontWeight: '600',
}));

const StoreAddress = styled.Text(({ theme }) => ({
  fontSize: 14,
  color: theme.color.GRAY?.[3],
}));

const IconContainer = styled.Pressable(({ theme }) => ({
  justifyContent: 'center',
  alignItems: 'center',
  paddingRight: 10,
}))
const PlutButton = styled(Entypo)(({ theme }) => ({
  color: theme.color.PRIMARY
}))

const NfcIcon = styled(MaterialCommunityIcons)(({ theme }) => ({
  color: theme.color.GRAY?.[3],
  size: 20
}));
