import useRootStore from '@/zustand';

import format from './format';

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

interface ScheduleResponse {
  crewId: number;
  name: string;
  scheduleId: number;
  substituteRequest: boolean;
  hopeCrewId: number | null;
  hopeCrewName: string | null;
  startTime: number;
  endTime: number;
  profileImage: string;
  status?: 'mine' | 'request' | 'none';
}

const getModifiedSchedule = (schedule: ScheduleRequest[]) => {
  const { crewId, role, selectedCompanyId } = useRootStore.getState();
  // role에 따라 다른 데이터 처리
  const processSchedules = (schedules: ScheduleRequest[]): ScheduleResponse[] => {
    if (role === 'CREW') {
      const updatedSchedule = processCrewSchedules(schedules);
      const matchingSchedules = updatedSchedule.filter((schedule) => schedule.crewId === crewId);
      const otherSchedules = updatedSchedule.filter((schedule) => schedule.crewId !== crewId);

      const sortedSchedules = matchingSchedules.concat(otherSchedules);
      return sortedSchedules;
    } else {
      return processBossSchedules(schedules);
    }
  };

  // role == CREW인 경우
  const processCrewSchedules = (schedules: ScheduleRequest[]): ScheduleResponse[] => {
    if (!schedules.length) {
      return [];
    }
    return schedules.map((schedule) => {
      // crewId가 사용자와 같은 경우 자신의 일정
      if (schedule.crewId === crewId && !schedule.substituteRequest) {
        return {
          ...schedule,
          status: 'mine',
          startTime: format.timeToDecimalHours(schedule.startTime),
          endTime: format.timeToDecimalHours(schedule.endTime),
        };
      }
      // 대타 요청이 들어왔으며, 다른 사람이 아직 신청하기 전이라면 대타 신청 가능!
      if (schedule.substituteRequest && !schedule.hopeCrewId) {
        return {
          ...schedule,
          status: 'request',
          startTime: format.timeToDecimalHours(schedule.startTime),
          endTime: format.timeToDecimalHours(schedule.endTime),
        };
      }
      return {
        ...schedule,
        status: 'none',
        startTime: format.timeToDecimalHours(schedule.startTime),
        endTime: format.timeToDecimalHours(schedule.endTime),
      };
    });
  };

  // role == BOSS인 경우
  const processBossSchedules = (schedules: ScheduleRequest[]): ScheduleResponse[] => {
    if (!schedules.length) {
      return [];
    }
    return schedules.map((schedule) => {
      // 대타를 구하는 사람과 수행할 사람이 매챙되었다면 대타 신청 수락가능!
      if (schedule.substituteRequest && schedule.hopeCrewId) {
        return {
          ...schedule,
          status: 'request',
          startTime: format.timeToDecimalHours(schedule.startTime),
          endTime: format.timeToDecimalHours(schedule.endTime),
        };
      }
      return {
        ...schedule,
        status: 'none',
        startTime: format.timeToDecimalHours(schedule.startTime),
        endTime: format.timeToDecimalHours(schedule.endTime),
      };
    });
  };

  return processSchedules(schedule);
};

export default getModifiedSchedule;
