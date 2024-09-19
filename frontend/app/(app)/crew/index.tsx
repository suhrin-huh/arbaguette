import Screen from '@/components/common/Screen';
import NfcCard from '@/components/crew/Card/NfcCard';
import TimeCard from '@/components/crew/Card/TimeCard';

const CrewMainScreen = () => {
  const handlePressNfcCard = () => {
    console.log('pressed Nfc Card');
  };

  return (
    <Screen viewOption={{ style: { gap: 10 } }}>
      <TimeCard />
      <NfcCard onPress={handlePressNfcCard} />
    </Screen>
  );
};

export default CrewMainScreen;
