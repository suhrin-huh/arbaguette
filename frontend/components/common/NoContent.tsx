import Styled from '@emotion/native';

import Text from '@/components/common/Text';

interface Message {
  message: string[];
}

const NoContent = ({ message }: Message) => {
  return (
    <NoContentBox>
      {message.map((item, idx) => (
        <Text size="sub" weight="bold" key={idx}>
          {item}
        </Text>
      ))}
    </NoContentBox>
  );
};

const NoContentBox = Styled.View(() => ({
  flex: 1,
  height: '100%',
  backgroundColor: 'white',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
}));

export default NoContent;
