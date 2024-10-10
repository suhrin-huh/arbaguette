import Styled from '@emotion/native';
import type { PressableProps } from 'react-native';

import NullImage from '@/assets/images/unknown_person.jpg';
import getModifiedSchedule from '@/util/schedule';

import Text from './Text';

const LABEL = 20;
const PROFILE = 50;
const BOTTOM = 20;
const HEIGHT = 20;

interface ScheduleRequest {
  crewId: number;
  name: string;
  scheduleId: number;
  substituteRequest: boolean;
  hopeCrewId: number | null;
  hopeCrewName: string | null;
  startTime: string;
  endTime: string;
  profileImage: string;
  status?: 'mine' | 'request' | 'none';
}

interface ScheduleProps {
  schedule: ScheduleRequest[];
  handleEventPress: (scheduleId: number) => void;
}

const TimeTable = ({ schedule, handleEventPress }: ScheduleProps) => {
  const updatedSchedules = getModifiedSchedule(schedule);
  const size = updatedSchedules.length;

  if (!size) {
    return (
      <Container>
        <NoContent>
          <Text size="title" color="gray">
            일정이 없습니다.
          </Text>
        </NoContent>
      </Container>
    );
  }

  return (
    <Screen>
      <Container>
        <ProfileColumn>
          {updatedSchedules.map((item) => (
            <ProfileImageWrapper key={item.crewId}>
              <ProfileImage source={item.profileImage ? { uri: item.profileImage } : NullImage} />
              <Text style={{ fontSize: 8, height: BOTTOM }} color="gray">
                {item.name.slice(0, 3)}
              </Text>
            </ProfileImageWrapper>
          ))}
        </ProfileColumn>
        <TimeTableWrapper horizontal>
          <LineContainer size={size}>
            {[...Array(16)].map((_, index) => (
              <Line key={`line${index}`} />
            ))}
          </LineContainer>
          <TimeLabelsRow>
            {[...Array(16)].map((_, index) => (
              <TimeLabel key={`time${index}`}>{index + 8}</TimeLabel>
            ))}
          </TimeLabelsRow>
          {updatedSchedules.map((schedule, index) => (
            <ScheduleBlock
              key={schedule.scheduleId}
              marginTop={LABEL + (PROFILE + BOTTOM + 10) * index + PROFILE / 2}
              marginLeft={`${(schedule.startTime / 16) * 100}%`}
              width={`${((schedule.endTime - schedule.startTime) / 16) * 100}%`}
              status={schedule.status}
              onPress={() => handleEventPress(schedule.scheduleId)}
              disabled={schedule.status === 'none'}
            />
          ))}
        </TimeTableWrapper>
      </Container>
    </Screen>
  );
};

const Screen = Styled.ScrollView(() => ({
  flex: 1,
  paddingBottom: 80,
}));
const Container = Styled.View({
  flexDirection: 'row',
  padding: 10,
});

const ProfileColumn = Styled.View({
  width: 60,
  justifyContent: 'space-between',
  paddingVertical: BOTTOM,
});

const ProfileImageWrapper = Styled.View({
  marginBottom: 10,
  alignItems: 'center',
});

const ProfileImage = Styled.Image({
  width: PROFILE,
  height: PROFILE,
  borderRadius: PROFILE / 2,
});

const TimeTableWrapper = Styled.ScrollView({
  position: 'relative',
  width: 960,
});

interface LineProps {
  size: number;
}
const LineContainer = Styled.View<LineProps>(({ size }) => ({
  position: 'absolute',
  flexDirection: 'row',
  top: LABEL,
  width: 960,
  height: size * 80,
}));

const Line = Styled.View(({ theme }) => ({
  width: 40,
  height: '100%',
  borderRightWidth: 1,
  borderColor: theme.color.GRAY['1'],
}));

const TimeLabelsRow = Styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  height: LABEL,
});

const TimeLabel = Styled.Text({
  width: 40,
  textAlign: 'center',
  fontSize: 16,
});

type StatusType = 'mine' | 'request' | 'none';

interface ScheduleBlockProps {
  marginTop: number;
  marginLeft: string;
  width: string;
  status: StatusType;
}

type BlockProps = PressableProps & Partial<ScheduleBlockProps>;

const ScheduleBlock = Styled.Pressable<BlockProps>(({ theme, marginTop, marginLeft, width, status }) => {
  return {
    position: 'absolute',
    top: 0,
    bottom: 0,
    height: HEIGHT,
    borderRadius: HEIGHT / 2,
    marginTop: marginTop,
    marginLeft: marginLeft,
    width: width,
    backgroundColor:
      status === 'mine' ? theme.color.PRIMARY : status === 'request' ? theme.color.SECONDARY : theme.color.GRAY['3'],
  };
});

const NoContent = Styled.View(() => ({
  flex: 1,
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}));

export default TimeTable;
