import styled from '@emotion/native';
import { Text, View } from 'react-native';

const PreviewBusinessCertificateScreen = () => {
  return (
    <Container>
      <Text>사업자 등록증 확인 스크린</Text>
    </Container>
  );
};

export default PreviewBusinessCertificateScreen;

const Container = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.PRIMARY,
}))