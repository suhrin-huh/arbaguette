import Styled from '@emotion/native';
import { router } from 'expo-router';

import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import TransactionList from '@/components/common/TransactionList';

const Transaction = () => {
  const navigateBack = () => {
    router.push('/crew/authorized/banking');
  };
  return (
    <TransactionContainer>
      <CenterHeaderbar title="빵Pay" right="bell" onPressLeft={navigateBack} />
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
