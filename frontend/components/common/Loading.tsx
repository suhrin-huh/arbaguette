import React from 'react';
import { ActivityIndicator } from 'react-native';

import Colors from '@/constants/Colors';

type Color = 'primary' | 'secondary' | 'danger' | 'gray';

interface LoadingProps {
  size?: number | 'large' | 'small';
  color?: Color;
}

const Loading = ({ size = 80, color = 'primary' }: LoadingProps) => {
  const colorMapper = (color: Color) => {
    switch (color) {
      case 'primary':
        return Colors.PRIMARY;
      case 'secondary':
        return Colors.SECONDARY;
      case 'danger':
        return Colors.DANGER;
      default:
        return Colors.PRIMARY;
    }
  };

  return <ActivityIndicator size={size} color={colorMapper(color)} />;
};

export default Loading;
