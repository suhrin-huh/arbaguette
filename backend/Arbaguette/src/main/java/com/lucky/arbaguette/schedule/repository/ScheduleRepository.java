package com.lucky.arbaguette.schedule.repository;

import com.lucky.arbaguette.schedule.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND s.status = 'YES' AND s.startTime BETWEEN :startDate AND :endDate ")
    List<Schedule> findScheduleByCrewAndMonth(@Param("crewId") int crewId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

    @Query("SELECT s FROM Schedule s WHERE s.crew.crewId = :crewId AND s.startTime BETWEEN :startDate AND :endDate ")
    List<Schedule> findAllScheduleByCrewAndMonth(@Param("crewId") int crewId, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);

}
