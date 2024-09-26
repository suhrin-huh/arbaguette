import styled from '@emotion/native';
import { Pressable } from 'react-native';

interface ShowContractButtonProps {
  onPress?: () => void;
}

const ButtonContainer = styled.View(({ theme }) => ({
  height: 30,
  paddingHorizontal: 10,
  backgroundColor: 'transparent',
  borderWidth: 1,
  borderRadius: 4,
  borderColor: theme.color.GRAY['2'],
}));

const ButtonText = styled.Text(({ theme }) => ({
  fontSize: 16,
  color: theme.color.BLACK,
  fontWeight: 600,
}));

const ShowContractButton = ({ onPress }: ShowContractButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <ButtonContainer>
        <ButtonText>근로계약서</ButtonText>
      </ButtonContainer>
    </Pressable>
  );
};

export default ShowContractButton;
