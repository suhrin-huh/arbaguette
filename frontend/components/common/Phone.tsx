import AntDesign from '@expo/vector-icons/AntDesign';
import * as Linking from 'expo-linking';
import { Pressable } from 'react-native';

export interface PhoneProps {
  tel: Tel;
}

const Phone = ({ tel }: PhoneProps) => {
  const handlePhoneCall = async () => {
    await Linking.openURL('tel:' + tel);
  };

  return (
    <Pressable onPress={handlePhoneCall}>
      <AntDesign name="phone" size={24} color="black" />
    </Pressable>
  );
};
export default Phone;
