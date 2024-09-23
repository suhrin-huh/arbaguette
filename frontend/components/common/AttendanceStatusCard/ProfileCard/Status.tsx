import Styled from '@emotion/native';

type AttendanceStatus = 'work' | 'late' | 'rest';

interface StatusProps {
  status: AttendanceStatus;
}

const StatusText = Styled.Text<StatusProps>(({ theme, status }) => ({
  color: status === 'work' ? theme.color.PRIMARY : status === 'late' ? theme.color.DANGER : theme.color.GRAY['3'],
}));

const Status = ({ status }: StatusProps) => {
  const text = {
    work: '근무중',
    late: '지각',
    rest: '휴식중',
  }[status];

  return <StatusText status={status}>{text}</StatusText>;
};

export default Status;
