import Styled from '@emotion/native';

interface StatusProps {
  status: WorkStatus | null;
}

const StatusText = Styled.Text<StatusProps>(({ theme, status }) => ({
  color: status === 'NORMAL' ? theme.color.PRIMARY : status === 'LATE' ? theme.color.DANGER : theme.color.GRAY['3'],
}));

const Status = ({ status }: StatusProps) => {
  const text = status
    ? {
        NORMAL: '근무중',
        LATE: '지각',
        ABSENT: '결근',
        EARLY: '조퇴',
      }[status]
    : '미출근';

  return <StatusText status={status}>{text}</StatusText>;
};

export default Status;
