import Styled from '@emotion/native';
import { useState } from 'react';
import { View } from 'react-native';

import NoContent from '@/components/common/NoContent';
import DateSelector from '@/components/crew/DateSelector';
import PayStubChart from '@/components/crew/PayStubChart';
import SalaryDocument from '@/components/crew/SalaryDocument';
import { usePayStub } from '@/reactQuery/querys';

const PayStub = () => {
  const [date, setDate] = useState(new Date());
  const payStub = usePayStub(date.getMonth() + 1);
  return (
    <Container>
      <DateSelector date={date} setDate={setDate} />
      {payStub ? (
        <View>
          <PayStubChart payStub={payStub} />
          <SalaryDocument payStub={payStub} />
        </View>
      ) : (
        <NoContent />
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

export default PayStub;
