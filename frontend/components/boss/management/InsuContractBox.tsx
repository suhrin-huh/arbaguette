import styled from '@emotion/native';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import Colors from '@/constants/Colors';
import useRootStore from '@/zustand';

const ContractContainer = styled.View(({ theme }) => ({
  backgroundColor: theme.color.WHITE,

  paddingHorizontal: 10,
  width: '100%',
  height: 240,
}));

const InfoContainer = styled.View(({ theme }) => ({
  gap: 20,
  paddingTop: 2,
  alignItems: 'flex-start',
}));

const InfoTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  color: theme.color.BLACK,
  marginBottom: 10,
}));

const InsuLineContainer = styled.Pressable(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 15,
  width: '100%',
  paddingVertical: 2,
  paddingHorizontal: 20,
}));

const InsuRadioContainer = styled.View(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  width: 22,
  height: 22,
  borderRadius: 50,
}));

const InsuText = styled.Text(({ theme }) => ({
  fontSize: 16,
  color: theme.color.BLACK,
  fontWeight: '400',
  paddingBottom: 5,
}));

interface SelectType {
  id: number;
  name: string;
  taxType: TaxType;
  isSelected: boolean;
}

const InsuContractBox = () => {
  const { setStep2, setRegistTaxType } = useRootStore();
  const [selectedInsu, setSelectedInsu] = useState<SelectType[]>([
    { id: 1, name: '설정하지 않음', taxType: 'NONE', isSelected: false },
    { id: 2, name: '4대 보험(근로소득 간이세액표 기준)', taxType: 'INSU', isSelected: false },
    { id: 3, name: '3.3%(개인사업자 또는 프리랜서)', taxType: 'INCOME', isSelected: false },
  ]);

  const handleInsuPress = (id: number) => {
    const newInsu = selectedInsu.map((insu) =>
      insu.id === id ? { ...insu, isSelected: true } : { ...insu, isSelected: false },
    );
    setSelectedInsu(newInsu);
  };

  useEffect(() => {
    const selectedInsuCnt = selectedInsu.filter((insu) => insu.isSelected);

    if (selectedInsuCnt.length > 0) {
      setStep2('next');
      setRegistTaxType(selectedInsuCnt[0].taxType);
    }
  }, [selectedInsu]);

  return (
    <ContractContainer>
      <InfoContainer>
        <InfoTitle>소득세 및 4대 보험</InfoTitle>
        {selectedInsu.map((insu) => (
          <InsuLineContainer key={insu.id} onPress={() => handleInsuPress(insu.id)}>
            <InsuRadioContainer style={{ backgroundColor: insu.isSelected ? Colors.PRIMARY : Colors.GRAY[1] }}>
              <View style={{ width: 12, height: 12, borderRadius: 50, backgroundColor: Colors.WHITE }} />
            </InsuRadioContainer>
            <InsuText style={{ color: insu.isSelected ? Colors.PRIMARY : Colors.BLACK }}>{insu.name}</InsuText>
          </InsuLineContainer>
        ))}
      </InfoContainer>
    </ContractContainer>
  );
};

export default InsuContractBox;
