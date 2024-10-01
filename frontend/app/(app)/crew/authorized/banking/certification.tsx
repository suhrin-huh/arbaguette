import Styled from '@emotion/native';
import { useState } from 'react';
import { View } from 'react-native';

import Text from '@/components/common/Text';
import CertificationChart from '@/components/crew/CertificationChart';
import DateSelector from '@/components/crew/DateSelector';
import SalaryDocument from '@/components/crew/SalaryDocument';
import { usePayStub } from '@/reactQuery/querys';

const Certification = () => {
  const [date, setDate] = useState(new Date());
  const { certification } = usePayStub(date.getMonth() + 1);
  return (
    <Container>
      <DateSelector date={date} setDate={setDate} />
      {certification ? (
        <View>
          <CertificationChart certification={certification} />
          <SalaryDocument certification={certification} />
        </View>
      ) : (
        <NoContentBox>
          <Text size="sub">해당 월의 급여명세서가 존재하지 않습니다.</Text>
        </NoContentBox>
      )}
    </Container>
  );
};

const Container = Styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

const NoContentBox = Styled.View(() => ({
  flex: 1,
  height: '100%',
  backgroundColor: 'white',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default Certification;
