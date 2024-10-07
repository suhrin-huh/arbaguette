import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';

interface StoreButtonProps {
  onPress: () => void;
}

const BellButton = ({ onPress }: StoreButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <Ionicons name="storefront-sharp" size={24} color={Colors.GRAY[3]} />
    </Pressable>
  );
};

export default BellButton;
