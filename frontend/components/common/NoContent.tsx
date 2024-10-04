import Styled from '@emotion/native';

import Text from '@/components/common/Text';

interface Message {
  message: string;
}

const NoContent = ({ message }: Message) => {
  return (
    <NoContentBox>
      <Text size="sub">{message}</Text>
    </NoContentBox>
  );
};

const NoContentBox = Styled.View(() => ({
  flex: 1,
  height: '100%',
  backgroundColor: 'white',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default NoContent;
