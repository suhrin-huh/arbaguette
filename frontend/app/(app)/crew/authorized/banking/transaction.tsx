import Styled from '@emotion/native';
import { FlatList } from 'react-native';

import CenterHeaderbar from '@/components/common/Header/CenterHeaderBar';
import Text from '@/components/common/Text';

const dummydata = {
  totalCount: '4',
  list: [
    {
      transactionUniqueNo: '17678',
      transactionDate: '20240920',
      transactionTime: '115814',
      transactionType: '2',
      transactionTypeName: '출금(이체)',
      transactionAccountNo: '0013109073877694',
      transactionBalance: '10000',
      transactionAfterBalance: '99970000',
      transactionSummary: '(수시입출금) : 출금(이체)',
      transactionMemo: '',
    },
    {
      transactionUniqueNo: '17664',
      transactionDate: '20240920',
      transactionTime: '105212',
      transactionType: '2',
      transactionTypeName: '출금(이체)',
      transactionAccountNo: '0013109073877694',
      transactionBalance: '10000',
      transactionAfterBalance: '99980000',
      transactionSummary: '(수시입출금) : 출금(이체)',
      transactionMemo: '',
    },
    {
      transactionUniqueNo: '17662',
      transactionDate: '20240920',
      transactionTime: '105156',
      transactionType: '2',
      transactionTypeName: '출금(이체)',
      transactionAccountNo: '0013109073877694',
      transactionBalance: '10000',
      transactionAfterBalance: '99990000',
      transactionSummary: '(수시입출금) : 출금(이체)',
      transactionMemo: '',
    },
    {
      transactionUniqueNo: '17637',
      transactionDate: '20240920',
      transactionTime: '100542',
      transactionType: '1',
      transactionTypeName: '입금',
      transactionAccountNo: '',
      transactionBalance: '100000000',
      transactionAfterBalance: '100000000',
      transactionSummary: '(수시입출금) : 입금',
      transactionMemo: '',
    },
    {
      transactionUniqueNo: '17637',
      transactionDate: '20240920',
      transactionTime: '100542',
      transactionType: '1',
      transactionTypeName: '입금',
      transactionAccountNo: '',
      transactionBalance: '100000000',
      transactionAfterBalance: '100000000',
      transactionSummary: '(수시입출금) : 입금',
      transactionMemo: '',
    },
    {
      transactionUniqueNo: '17637',
      transactionDate: '20240920',
      transactionTime: '100542',
      transactionType: '1',
      transactionTypeName: '입금',
      transactionAccountNo: '',
      transactionBalance: '100000000',
      transactionAfterBalance: '100000000',
      transactionSummary: '(수시입출금) : 입금',
      transactionMemo: '',
    },
  ],
};

interface TransactionItemType {
  [key: string]: string;
}

function formatDateTime(dateTimeString) {
  // 문자열을 각 부분으로 분리
  const year = dateTimeString.substring(0, 4);
  const month = dateTimeString.substring(4, 6);
  const day = dateTimeString.substring(6, 8);
  const hour = dateTimeString.substring(8, 10);
  const minute = dateTimeString.substring(10, 12);
  const second = dateTimeString.substring(12, 14);

  // 원하는 형식으로 결합하여 반환
  return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
}

const TransactionItem = ({ item }: { item: TransactionItemType }) => {
  // 타입지정
  const formatToCurrency = (money: string): string => money.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (
    <TransactionBox>
      <Text size="base" color="gray">
        {formatDateTime(item.transactionDate + item.transactionDate)}
      </Text>
      <Text size="sub" weight="bold">
        {item.transactionMemo ? item.transactionMemo : '거래한사람'}
      </Text>
      <BalanceBox>
        <Text size="sub" color={item.transactionType === '1' ? 'primary' : 'danger'}>
          {item.transactionType === '1' ? '입금 ' : '출금 '}
          {formatToCurrency(item.transactionBalance)} 원
        </Text>
        <Text size="base" color="gray">
          {formatToCurrency(item.transactionAfterBalance)} 원
        </Text>
      </BalanceBox>
    </TransactionBox>
  );
};

/// //////////////////////////////////////////////////////////////// 최상단 컴포넌트

const TransactionList = () => {
  return (
    <TransactionContainer>
      <CenterHeaderbar title="빵Pay" right="bell" />
      <FlatList
        data={dummydata.list}
        renderItem={({ item }) => <TransactionItem item={item} />}
        showsVerticalScrollIndicator={false}
      />
    </TransactionContainer>
  );
};

export default TransactionList;
/// //////////////////////////////////////////////////////////////// Emotion Styled Components

const TransactionContainer = Styled.View(({ theme }) => ({
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

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
