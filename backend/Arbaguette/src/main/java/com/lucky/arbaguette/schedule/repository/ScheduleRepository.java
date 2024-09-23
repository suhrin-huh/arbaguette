package com.lucky.arbaguette.schedule.repository;

import com.lucky.arbaguette.schedule.domain.Schedule;
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

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND s.status = 'YES' AND s.startTime BETWEEN :startDate AND :endDate ")
    List<Schedule> findScheduleByCrewAndMonth(@Param("crewId") int crewId, @Param("startDate") LocalDateTime startDate,
                                              @Param("endDate") LocalDateTime endDate);

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND s.startTime BETWEEN :startDate AND :endDate ")
    List<Schedule> findAllScheduleByCrewAndMonth(@Param("crewId") int crewId,
                                                 @Param("startDate") LocalDateTime startDate,
                                                 @Param("endDate") LocalDateTime endDate);

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND ("
            + "(s.startTime <= :nowDate AND :nowDate <= s.endTime) "
            + "OR s.startTime >= :nowDate)")
    Optional<Schedule> findNextByCrewAndTime(@Param("crewId") int crewId,
                                             @Param("nowDate") LocalDateTime nowDate);
}
