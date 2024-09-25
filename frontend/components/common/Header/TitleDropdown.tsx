import styled from '@emotion/native';
import { FontAwesome } from '@expo/vector-icons';

import Colors from '@/constants/Colors';

const DropdownContainer = styled.Pressable({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 5,
});

const Title = styled.Text({
  fontSize: 20,
  fontWeight: 'bold',
});

const TitleDropdown = ({ title, onPress }: { title: string; onPress: () => void }) => {
  return (
    <DropdownContainer onPress={onPress}>
      <Title>{title}</Title>
      <FontAwesome name="chevron-down" size={16} color={Colors.GRAY[3]} />
    </DropdownContainer>
  );
};

export default TitleDropdown;
