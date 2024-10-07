import styled from '@emotion/native';

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
      {/* 스토어 버튼 생겨서 굳이 안넣어도 됨 */}
      {/* <FontAwesome name="chevron-down" size={16} color={Colors.GRAY[3]} /> */}
    </DropdownContainer>
  );
};

export default TitleDropdown;
