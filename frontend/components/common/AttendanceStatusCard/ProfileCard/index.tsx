import Styled from '@emotion/native';
import { Text } from 'react-native';

import Status from '@/components/common/AttendanceStatusCard/ProfileCard/Status';
import type { PhoneProps } from '@/components/common/Phone';
import Phone from '@/components/common/Phone';
import type { ProfileProps } from '@/components/common/Profile';
import Profile from '@/components/common/Profile';

export interface ProfileCardProps extends ProfileProps, PhoneProps {
  time: string;
}

const ProfileContainer = Styled.View({ flexDirection: 'row' });

const TimeContainer = Styled.View({
  flex: 2,
  alignItems: 'center',
  justifyContent: 'center',
});

const StatusContainer = Styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const PhoneContainer = Styled.View({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
});

const ProfileCard = ({ time, status, name, phoneNumber, source }: ProfileCardProps) => {
  return (
    <ProfileContainer>
      <Profile name={name} status={status} source={source} />
      <TimeContainer>
        <Text>{time}</Text>
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
