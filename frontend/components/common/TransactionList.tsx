import Styled from '@emotion/native';
import { View } from 'react-native';

import NoContent from '@/components/common/NoContent';
import Text from '@/components/common/Text';
import { useGetBankHistory } from '@/reactQuery/querys';

interface Transaction {
  transactionUniqueNo: string;
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  transactionTypeName: string;
  transactionAccountNo: string;
  transactionBalance: string;
  transactionAfterBalance: string;
  transactionSummary: string;
  transactionMemo: string;
}

interface TransactionProps {
  item: Transaction;
}
const formatDateTime = (dateTimeString: string): string => {
  const year = dateTimeString.substring(0, 4);
  const month = dateTimeString.substring(4, 6);
  const day = dateTimeString.substring(6, 8);
  const hour = dateTimeString.substring(8, 10);
  const minute = dateTimeString.substring(10, 12);
  const second = dateTimeString.substring(12, 14);
  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
};

const formattedNumber = (number: string): string => `${parseInt(number, 10).toLocaleString('ko-KR')} 원`;

const TransactionItem = ({ item }: TransactionProps) => {
  return (
    <TransactionBox>
      <Text size="base" color="gray">
        {formatDateTime(item.transactionDate + item.transactionDate)}
      </Text>
      <Text size="sub" weight="bold">
        {item.transactionSummary}
      </Text>
      <BalanceBox>
        <Text size="sub" color={item.transactionType === '1' ? 'primary' : 'danger'}>
          {item.transactionType === '1' ? '입금 ' : '출금 '}
          {formattedNumber(item.transactionBalance)}
        </Text>
        <Text size="base" color="gray">
          잔액 {formattedNumber(item.transactionAfterBalance)}
        </Text>
      </BalanceBox>
    </TransactionBox>
  );
};

const TransactionList = () => {
  const { bankHistory } = useGetBankHistory();
  if (bankHistory?.list?.length) {
    return (
      <View>
        <Container
          data={bankHistory.list}
          renderItem={({ item }) => <TransactionItem item={item} />}
          showsVerticalScrollIndicator={false}
        />
        <Block />
      </View>
    );
  }
  return <NoContent message={['입출금 내역이 없습니다.']} />;
};

const Container = Styled.FlatList(() => ({
  paddingBottom: 80,
}));
const Block = Styled.View(() => ({}));

const TransactionBox = Styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  gap: 10,
  paddingVertical: 20,
  borderBottomColor: theme.color.GRAY['1'],
  borderBottomWidth: 1,
}));

const BalanceBox = Styled.View(() => ({
  flexDirection: 'column',
  alignItems: 'flex-end',
}));

export default TransactionList;
