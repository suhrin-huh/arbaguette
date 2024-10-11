import Styled from '@emotion/native';
import { router, useLocalSearchParams } from 'expo-router';

import Button from '@/components/common/Button';
import Text from '@/components/common/Text';
import Theme from '@/styles/Theme';

interface RemittanceInfoProps {
  crewId: number;
  money: string;
  name: string;
}

const SalaryRemittanceInfo = () => {
  const { crewId, money, name } = useLocalSearchParams();
  const formattedNumber = (number: string): string => `${parseInt(number, 10).toLocaleString('ko-KR')} 원`;

  const handleCancle = () => {
    router.push(`/(app)/boss/main/management/detail/${crewId}`);
  };

  const handleRemittance = () => {
    router.push({ pathname: '/(app)/boss/main/management/detail/salary/2', params: { crewId, money, name } });
  };

  return (
    <Container>
      <RemittanceInfoBox>
        <Text size="title">
          <Text size="title" weight="bold">
            {name}
          </Text>{' '}
          님에게
        </Text>
        <Text size="title" weight="bold" color="primary">
          급여 {formattedNumber(money as 'string')}
        </Text>
        <Text size="title">송금하시겠습니까?</Text>
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

export default SalaryRemittanceInfo;
