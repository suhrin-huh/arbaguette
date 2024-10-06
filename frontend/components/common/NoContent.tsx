import Styled from '@emotion/native';

import Text from '@/components/common/Text';

const NoContent = () => {
  return (
    <NoContentBox>
      <Text size="sub" weight="bold">
        해당 월의 급여명세서가
      </Text>
      <Text size="sub" weight="bold">
        존재하지 않습니다.
      </Text>
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
