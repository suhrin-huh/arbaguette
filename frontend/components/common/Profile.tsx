import Styled from '@emotion/native';

import type { ProfileImageProps } from '@/components/common/ProfileImage';
import ProfileImage from '@/components/common/ProfileImage';

export interface ProfileProps extends ProfileImageProps {
  name: string;
}

const ProfileContainer = Styled.View(({ theme }) => ({
  alignSelf: 'center',
  gap: 4,
  alignItems: 'center',
}));

const ProfileName = Styled.Text(({ theme }) => ({
  color: theme.color.BLACK,
}));

const Profile = ({ name, ...imageProps }: ProfileProps) => {
  return (
    <ProfileContainer>
      <ProfileImage {...imageProps} />
      <ProfileName>{name}</ProfileName>
    </ProfileContainer>
  );
};

export default Profile;
