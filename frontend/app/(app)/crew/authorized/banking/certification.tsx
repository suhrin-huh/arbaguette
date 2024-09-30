import Styled from '@emotion/native';
import { View } from 'react-native';

import Text from '@/components/common/Text';
import CertificationChart from '@/components/crew/CertificationChart';
import DateSelector from '@/components/crew/DateSelector';

const Certification = () => {
  return (
    <Container>
      <DateSelector />
      <CertificationChart />
      <Text>급여명세서</Text>
    </Container>
  );
};

const Container = Styled.View(({ theme }) => ({
  backgroundColor: 'white',
  paddingHorizontal: theme.layout.PADDING.HORIZONTAL,
  paddingVertical: theme.layout.PADDING.VERTICAL,
}));

export default Certification;
