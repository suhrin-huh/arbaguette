import type { ProfileCardProps } from '@/components/common/AttendanceStatusCard/ProfileCard';
import ProfileCard from '@/components/common/AttendanceStatusCard/ProfileCard';
import CardContainer from '@/components/common/CardContainer';

interface AttendanceStatusCardProps {
  dayScheduleData?: ProfileCardProps[];
}

const AttendanceStatusCard = ({ dayScheduleData }: AttendanceStatusCardProps) => {
  if (!dayScheduleData || !dayScheduleData.length) return null;

  return (
    <CardContainer style={{ gap: 20 }}>
      {dayScheduleData.map((daySchedule, index) => (
        <ProfileCard key={`${index}-${daySchedule}`} {...daySchedule} />
      ))}
    </CardContainer>
  );
};

export default AttendanceStatusCard;
