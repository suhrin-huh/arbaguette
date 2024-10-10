import Styled from '@emotion/native';
import { useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';
import Pdf from 'react-native-pdf';

import Text from '@/components/common/Text';
import { useEmploymentContract } from '@/reactQuery/querys';
import useRootStore from '@/zustand';

const PdfScreen = () => {
  const { crewId } = useRootStore();
  const data = useEmploymentContract(crewId!);
  if (!data?.url) {
    return (
      <Container>
        <Text>근로계약서가 조회되지 않습니다.</Text>
      </Container>
    );
  }

  return (
    <Pdf
      style={{ flex: 1 }}
      source={{ uri: data.url }}
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`Number of pages: ${numberOfPages}`);
      }}
      onError={(error) => {
        console.log(error);
      }}
      trustAllCerts={false}
    />
  );
};

const Container = Styled.View(() => ({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'ceter',
}));

export default PdfScreen;
