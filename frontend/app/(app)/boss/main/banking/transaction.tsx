import Styled from '@emotion/native';

import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import TransactionList from '@/components/common/TransactionList';

const Transaction = () => {
  return (
    <TransactionContainer>
      <CenterHeaderbar left="" title="빵Pay" right="bell" />
      <TransactionList />
    </TransactionContainer>
  );
};

const TransactionContainer = Styled.View(({ theme }) => ({
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

export default Transaction;
