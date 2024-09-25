import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';

import Theme from '@/styles/Theme';

interface BellButtonProps {
  onPress: () => void;
}

const BellButton = ({ onPress }: BellButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons name="bell" size={24} color={Theme.color.SECONDARY} />
    </Pressable>
  );
};

export default BellButton;
