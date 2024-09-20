import type { ProfileCardProps } from '@/components/common/AttendanceStatusCard/ProfileCard';
import ProfileCard from '@/components/common/AttendanceStatusCard/ProfileCard';
import CardContainer from '@/components/common/CardContainer';

interface AttendanceStatusCardProps {
  profileCardsData?: ProfileCardProps[];
}

const AttendanceStatusCard = ({ profileCardsData }: AttendanceStatusCardProps) => {
  if (!profileCardsData || !profileCardsData.length) return null;

  return (
    <CardContainer style={{ gap: 20 }}>
      {profileCardsData.map((profileCardData, index) => (
        <ProfileCard key={`${index}-${profileCardData}`} {...profileCardData} />
      ))}
    </CardContainer>
  );
};

export default AttendanceStatusCard;
