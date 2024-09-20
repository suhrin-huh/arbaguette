import AntDesign from '@expo/vector-icons/AntDesign';
import * as Linking from 'expo-linking';
import { Pressable } from 'react-native';

export interface PhoneProps {
  phoneNumber: string;
}

const Phone = ({ phoneNumber }: PhoneProps) => {
  const handlePhoneCall = async () => {
    await Linking.openURL('tel:' + phoneNumber);
  };

  return (
    <Pressable onPress={handlePhoneCall}>
      <AntDesign name="phone" size={24} color="black" />
    </Pressable>
  );
};
export default Phone;
