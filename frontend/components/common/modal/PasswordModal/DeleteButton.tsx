import Styled from '@emotion/native';
import Delete from '@expo/vector-icons/Feather';
import { useState } from 'react';

interface DeleteProps {
  deletePassword: () => void;
}

const DeleteButton = ({ deletePassword }: DeleteProps) => {
  return (
    <Button onPress={deletePassword}>
      <Delete name="delete" size={24} color="black" />
    </Button>
  );
};

const Button = Styled.TouchableOpacity<{ pressed?: boolean }>(({ theme }) => ({
  flex: 1,
  flexDirection: 'column',
  //   width: '100%',
  //   height: 80,
  alignItems: 'center',
  justifyContent: 'center',
  //   backgroundColor: pressed ? theme.color.PRIMARY : 'transparent',
}));

const DeleteIcon = Styled.Image<{ pressed?: boolean }>(({ theme }) => ({
  resizeMode: 'contain',
  width: 20,
  height: 20,
}));

export default DeleteButton;
