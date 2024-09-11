import Styled from '@emotion/native';
import { Text } from 'react-native';

import SchoolImage from '@/assets/images/school.png';
import CardContainer from '@/components/common/Card';
import ProgressBar from '@/components/crew/ProgressBar';

const Image = Styled.Image({ width: 28, height: 22 });

const CardHeader = Styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
});

const CardText = Styled.Text({
  fontSize: 20,
});

const TextStrong = Styled.Text(({ theme }) => ({ color: theme.color.PRIMARY }));

const TimeText = Styled.Text(({ theme }) => ({ color: theme.color.GRAY['3'], fontSize: 14 }));

const TimeCard = () => {
  return (
    <CardContainer style={{ gap: 10 }}>
      <CardHeader>
        <Image source={SchoolImage} />
        <Text>후라이드 참 잘하는 집</Text>
      </CardHeader>
      <CardText>
        퇴근까지&nbsp;
        <TextStrong>2시간 12분</TextStrong>
        &nbsp;남았어요!
      </CardText>
      <ProgressBar total={1000} current={500} />
      <TimeText>09:00 - 13:00</TimeText>
    </CardContainer>
  );
};

export default TimeCard;
