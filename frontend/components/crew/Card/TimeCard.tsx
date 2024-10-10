import Styled from '@emotion/native';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import SchoolImage from '@/assets/images/school.png';
import CardContainer from '@/components/common/CardContainer';
import ProgressBar from '@/components/crew/ProgressBar';
import keys from '@/reactQuery/keys';
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

const TimeCard = ({ startTime, endTime, companyName, commuted }: TimeCardProps) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  const totalSeconds = (end.getTime() - start.getTime()) / 1000;
  const remainTimeInSeconds = Math.floor(
    (now < end ? (now > start ? end.getTime() - now.getTime() : start.getTime() - now.getTime()) : 0) / 1000,
  );
  const realTimeLeft = Math.floor((end.getTime() - now.getTime()) / 1000);
  const isOnDuty = now >= start && now <= end;
  // 텍스트 시간
  const [remainingTime, setRemainingTime] = useState(
    realTimeLeft > remainTimeInSeconds ? realTimeLeft : remainTimeInSeconds,
  );
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

  useEffect(() => {
    setRemainingTime(remainTimeInSeconds);
  }, [remainTimeInSeconds]);

  console.log(' start:', start.toLocaleString(), 'now:', now.toLocaleString(), ' end:', end.toLocaleString());
  console.log('isOnDuty:', isOnDuty);
  console.log('remainTimeInSeconds:', remainTimeInSeconds);

  const { hours, minutes } = format.getTimeAndMinuteFromSeconds(remainingTime);

  console.log('hours:', hours, 'minutes:', minutes);

  return (
    <CardContainer style={{ gap: 10 }}>
      <CardHeader>
        <Image source={SchoolImage} />
        <Text>{companyName}</Text>
      </CardHeader>
      <CardText>
        {commuted ? '퇴근까지' : '출근까지'}&nbsp;
        <TextStrong>
          {!!hours && `${hours}시간`} {minutes}분
        </TextStrong>
        &nbsp;남았어요!
      </CardText>
      {isOnDuty && <ProgressBar total={totalSeconds} current={totalSeconds - remainTimeInSeconds} />}
      <TimeText>
        {formattedStartTime} - {formattedEndTime}
      </TimeText>
    </CardContainer>
  );
};

export default TimeCard;
