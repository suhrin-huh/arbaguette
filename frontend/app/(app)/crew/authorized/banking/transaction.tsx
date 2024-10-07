import Styled from '@emotion/native';

import TransactionList from '@/components/common/TransactionList';

const Transaction = () => {
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
