import { useLocalSearchParams } from 'expo-router';
import Pdf from 'react-native-pdf';

const CrewContractPaperScreen = () => {
  const { url } = useLocalSearchParams<{ url: string }>();

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

export default CrewContractPaperScreen;
