import Styled from '@emotion/native';
import { Text } from 'react-native';

import Status from '@/components/common/AttendanceStatusCard/ProfileCard/Status';
import type { PhoneProps } from '@/components/common/Phone';
import Phone from '@/components/common/Phone';
import type { ProfileProps } from '@/components/common/Profile';
import Profile from '@/components/common/Profile';

export interface ProfileCardProps extends ProfileProps, PhoneProps {
  startTime: Time;
  endTime: Time;
  status: WorkStatus;
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

const ProfileCard = ({ startTime, endTime, status, name, tel, source }: ProfileCardProps) => {
  return (
    <ProfileContainer>
      <Profile name={name} status={status} source={source} />
      <TimeContainer>
        <Text>
          {startTime} - {endTime}
        </Text>
      </TimeContainer>
      <StatusContainer>
        <Status status={status} />
      </StatusContainer>
      <PhoneContainer>
        <Phone tel={tel} />
      </PhoneContainer>
    </ProfileContainer>
  );
};

export default ProfileCard;
