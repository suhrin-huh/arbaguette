import { useLocalSearchParams } from 'expo-router';
import Pdf from 'react-native-pdf';

const PdfScreen = () => {
  const { url } = useLocalSearchParams<{ url: string }>();

  console.log(url);

  return (
    <Pdf
      style={{ flex: 1 }}
      source={{ uri: url }}
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

export default PdfScreen;
