import styled from '@emotion/native';
import { router } from 'expo-router';
import { useState } from 'react';

import CompanyCard from '@/components/common/StoreCard';
import Layout from '@/constants/Layout';
import { useCompanyList } from '@/reactQuery/querys';

const ConfigScreen = () => {
  const { companyList } = useCompanyList();

  const pressStoreCard = (card: Company) => {
    console.log('카드의 ID : ', card);
    router.push({
      pathname: '/(app)/boss/main/',
      params: { id: card.companyId },
    });
  };

  const pressNfcButton = (card: Company) => {
    console.log('NFC 버튼 눌림 : ', card.companyId);
    router.push('/(app)/boss/config/modal');
  };

  const addStoreHandler = () => {
    router.push('/boss/config/register');
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
      {companyList.map((company) => (
        <CompanyCard
          companyData={company}
          onPress={pressStoreCard}
          key={company.companyId}
          onPressNFC={pressNfcButton}
        />
      ))}
      <CompanyCard companyData="ADD" onPress={addStoreHandler} />
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
