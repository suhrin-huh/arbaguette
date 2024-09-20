import CardContainer from '@/components/common/CardContainer';
import type { ProfileCardProps } from '@/components/crew/Card/AttendanceStatusCard/ProfileCard';
import ProfileCard from '@/components/crew/Card/AttendanceStatusCard/ProfileCard';

interface AttendanceStatusCardProps {
  profileCardsData?: ProfileCardProps[];
}

const AttendanceStatusCard = ({ profileCardsData }: AttendanceStatusCardProps) => {
  if (!profileCardsData || !profileCardsData.length) return null;

  return (
    <CardContainer style={{ gap: 20 }}>
      {profileCardsData.map((profileCardData, index) => (
        <ProfileCard key={`index-${profileCardData}`} {...profileCardData} />
      ))}
    </CardContainer>
  );
};

export default AttendanceStatusCard;
