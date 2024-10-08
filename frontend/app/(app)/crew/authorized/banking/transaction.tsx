import Styled from '@emotion/native';
import { useFocusEffect, useNavigation } from 'expo-router';

import TransactionList from '@/components/common/TransactionList';

const Transaction = () => {
  const { getParent } = useNavigation();

  useFocusEffect(() => {
    getParent()?.setOptions({
      title: '송금 목록',
    });
  });

  return (
    <TransactionContainer>
      <TransactionList />
    </TransactionContainer>
  );
};

const TransactionContainer = Styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingTop: theme.layout.PADDING.VERTICAL,
  paddingBottom: 80,
}));

export default Transaction;
