import Styled from '@emotion/native';

import CheckImage from '@/assets/images/check.png';
import CardContainer from '@/components/common/CardContainer';
import WithPressable from '@/components/hoc/withPressable';
import Theme from '@/styles/Theme';

const CardText = Styled.Text(({ theme }) => ({ color: theme.color.WHITE, fontSize: 20, fontWeight: 700 }));
const CardImage = Styled.Image(({ theme }) => ({ width: 100, height: 100 }));

const NfcCard = () => {
  return (
    <CardContainer
      style={{
        backgroundColor: Theme.color.PRIMARY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 34,
      }}>
      <CardText>출퇴근 기록하기</CardText>
      <CardImage source={CheckImage} />
    </CardContainer>
  );
};

const PressableNfcCard = WithPressable(NfcCard);

export default PressableNfcCard;
