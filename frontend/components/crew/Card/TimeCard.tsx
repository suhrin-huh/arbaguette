import Styled from '@emotion/native';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import SchoolImage from '@/assets/images/school.png';
import CardContainer from '@/components/common/CardContainer';
import ProgressBar from '@/components/crew/ProgressBar';
import format from '@/util/format';

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

interface TimeCardProps extends NearCommuteInfoResponseData {}

const TimeCard = ({ startTime, endTime, companyName }: TimeCardProps) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  const totalSeconds = (end.getTime() - start.getTime()) / 1000;
  const remainTimeInSeconds = Math.floor(
    (now < end ? end.getTime() - now.getTime() : now.getTime() - start.getTime()) / 1000,
  );
  const isOnDuty = now >= start && now <= end;
  const [remainingTime, setRemainingTime] = useState(remainTimeInSeconds);
  const formattedStartTime = format.dateToHourAndMinute(start);
  const formattedEndTime = format.dateToHourAndMinute(end);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const { hours, minutes } = format.getTimeAndMinuteFromSeconds(remainingTime);

  return (
    <CardContainer style={{ gap: 10 }}>
      <CardHeader>
        <Image source={SchoolImage} />
        <Text>후라이드 참 잘하는 집</Text>
      </CardHeader>
      <CardText>
        {isOnDuty ? '퇴근까지' : '출근까지'}&nbsp;
        <TextStrong>
          {hours}시간 {minutes}분
        </TextStrong>
        &nbsp;남았어요!
      </CardText>
      {isOnDuty && <ProgressBar total={totalSeconds} current={remainTimeInSeconds} />}
      <TimeText>
        {formattedStartTime} - {formattedEndTime}
      </TimeText>
    </CardContainer>
  );
};

export default TimeCard;
