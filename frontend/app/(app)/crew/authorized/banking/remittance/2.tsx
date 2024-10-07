// 두번째 페이지 : 송금하는 사람의 정보가 맞는지 체크!
import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import Theme from '@/styles/Theme';

interface RemittanceInfoProps {
  [key: string]: string;
}

const RemittanceInfo = () => {
  const { accountNo, amount, name } = useLocalSearchParams<RemittanceInfoProps>();
  const formatToAccountNo = (number: string): string => number.replace(/(\d{6})(\d{2})(\d+)/, '$1-$2-$3');
  const formattedNumber = (number: string): string => `${parseInt(number, 10).toLocaleString('ko-KR')} 원`;

  const handleCancle = () => {
    router.push('/(app)/crew/authorized/banking');
  };

  const handleRemittance = () => {
    router.push({ pathname: '/(app)/crew/authorized/banking/remittance/3', params: { accountNo, amount } });
  };

  return (
    <Container>
      <RemittanceInfoBox>
        <Text size="base" color="gray">
          {formatToAccountNo(accountNo)}
        </Text>
        <Text size="title" weight="bold">
          {name} 님에게
        </Text>
        <Text size="title" weight="bold">
          {formattedNumber(amount)}
        </Text>
        <Text size="title" color="gray">
          송금하시겠습니까?
        </Text>
      </RemittanceInfoBox>
      <ButtonGroup>
        <Button
          size={100}
          buttonStyle={{ backgroundColor: Theme.color.GRAY['3'], borderRadius: Theme.layout.BORDER.SECONDARY }}
          onPress={handleCancle}>
          취소
        </Button>
        <Button size={250} onPress={handleRemittance}>
          보내기
        </Button>
      </ButtonGroup>
    </Container>
  );
};

const Container = Styled.View(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const RemittanceInfoBox = Styled.View(() => ({
  flex: 1,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
}));

const ButtonGroup = Styled.View(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 0,
  gap: 10,
}));

export default RemittanceInfo;
