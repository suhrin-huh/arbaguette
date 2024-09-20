import Styled from '@emotion/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import type { ImageSourcePropType } from 'react-native';

type AttendanceStatus = 'work' | 'late' | 'rest';

export interface ProfileImageProps {
  source?: ImageSourcePropType;
  status?: AttendanceStatus;
}

const ProfileImageContainer = Styled.View<Pick<ProfileImageProps, 'status'>>(({ theme, status }) => ({
  borderRadius: 20,
  borderColor: status === 'work' ? theme.color.PRIMARY : status === 'late' ? theme.color.DANGER : theme.color.GRAY['1'],
  borderWidth: 1,
  overflow: 'hidden',
  alignSelf: 'center',
}));

const Image = Styled.Image(({ theme }) => ({
  width: 40,
  height: 40,
  objectFit: 'cover',
  objectPosition: 'center center',
}));

const ProfileImage = ({ source, status = 'rest' }: ProfileImageProps) => {
  return (
    <ProfileImageContainer status={status}>
      {source ? <Image source={source} /> : <Ionicons name="person-sharp" size={40} color="black" />}
    </ProfileImageContainer>
  );
};

export default ProfileImage;
