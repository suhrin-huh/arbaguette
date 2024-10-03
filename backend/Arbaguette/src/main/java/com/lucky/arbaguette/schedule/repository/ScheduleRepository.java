package com.lucky.arbaguette.schedule.repository;

import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.dto.ScheduleStatusCount;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND "
            + "(FUNCTION('DATE_FORMAT', s.startTime, '%m%d') = FUNCTION('DATE_FORMAT', :nowTime, '%m%d') OR "
            + "FUNCTION('DATE_FORMAT', s.endTime, '%m%d') = FUNCTION('DATE_FORMAT', :nowTime, '%m%d')) ")
    Optional<Schedule> findByCrewAndTime(int crewId, LocalDateTime nowTime);

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND s.status is not null AND s.startTime BETWEEN :startDate AND :endDate ")
    List<Schedule> findScheduleByCrewAndMonth(@Param("crewId") int crewId, @Param("startDate") LocalDateTime startDate,
                                              @Param("endDate") LocalDateTime endDate);

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND s.startTime BETWEEN :startDate AND :endDate ")
    List<Schedule> findAllScheduleByCrewAndMonth(@Param("crewId") int crewId,
                                                 @Param("startDate") LocalDateTime startDate,
                                                 @Param("endDate") LocalDateTime endDate);

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND ("
            + "(s.startTime <= :nowDate AND :nowDate <= s.endTime) "
            + "OR s.startTime >= :nowDate) AND s.outTime IS NULL ORDER BY s.startTime LIMIT 1")
    Optional<Schedule> findNextByCrewAndTime(@Param("crewId") int crewId,
                                             @Param("nowDate") LocalDateTime nowDate);

    @Query("""
                SELECT new com.lucky.arbaguette.schedule.dto.ScheduleStatusCount(
                    COALESCE(SUM(CASE WHEN s.status = 'NORMAL' THEN 1 ELSE 0 END), 0),
                    COALESCE(SUM(CASE WHEN s.status = 'ABSENT' THEN 1 ELSE 0 END), 0),
                    COALESCE(SUM(CASE WHEN s.status = 'LATE' THEN 1 ELSE 0 END), 0),
                    COALESCE(SUM(CASE WHEN s.status = 'EARLY' THEN 1 ELSE 0 END), 0)
                )
                FROM Schedule s
                where s.crew.crewId = :crewId AND s.startTime BETWEEN :startDate AND :endDate
            """)
    ScheduleStatusCount countByStatus(@Param("crewId") int crewId,
                                      @Param("startDate") LocalDateTime startDate,
                                      @Param("endDate") LocalDateTime endDate);

    @Query("SELECT s FROM Schedule s WHERE s.crew = :crew AND FUNCTION('MONTH', s.startTime) = :month AND FUNCTION('DAY', s.startTime) = :day")
    Optional<Schedule> findByCrewAndMonthAndDay(@Param("crew") Crew crew, @Param("month") int month,
                                                @Param("day") int day);

    @Query("SELECT s FROM Schedule s where DATE(s.startTime) = :date AND s.crew.crewId IN :crewIds order by s.startTime")
    List<Schedule> findByStartTimeAndCrewIdIn(@Param("date") LocalDate date, @Param("crewIds") List<Integer> crewIds);

    Optional<Schedule> findByScheduleIdAndCrew(int scheduleId, Crew crew);

    boolean existsByCrewAndStartTime(Crew crew, LocalDateTime startTime);

    List<Schedule> findByEndTimeBeforeAndStatusIsNull(LocalDateTime now);

    Optional<Schedule> findByScheduleIdAndCrewIsNot(int scheduleId, Crew crew);
}
