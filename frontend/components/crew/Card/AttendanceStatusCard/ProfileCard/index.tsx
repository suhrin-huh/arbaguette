import Styled from '@emotion/native';

import type { PhoneProps } from '@/components/common/Phone';
import Phone from '@/components/common/Phone';
import type { ProfileProps } from '@/components/common/Profile';
import Profile from '@/components/common/Profile';
import Status from '@/components/crew/Card/AttendanceStatusCard/ProfileCard/Status';

interface ProfileCardProps extends ProfileProps, PhoneProps {
  time: string;
}

const ProfileContainer = Styled.View(({ theme }) => ({ flexDirection: 'row' }));

const TimeContainer = Styled.View(({ theme }) => ({
  flex: 2,
  alignItems: 'center',
  justifyContent: 'center',
}));

const Time = Styled.Text();

const StatusContainer = Styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

const PhoneContainer = Styled.View(({ theme }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}));

const ProfileCard = ({ time, status, name, phoneNumber, source }: ProfileCardProps) => {
  return (
    <ProfileContainer>
      <Profile name={name} status={status} source={source} />
      <TimeContainer>
        <Time>{time}</Time>
      </TimeContainer>
      <StatusContainer>
        <Status status={status || 'rest'} />
      </StatusContainer>
      <PhoneContainer>
        <Phone phoneNumber={phoneNumber} />
      </PhoneContainer>
    </ProfileContainer>
  );
};

export default ProfileCard;
