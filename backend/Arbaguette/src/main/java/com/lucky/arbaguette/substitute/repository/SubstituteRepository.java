package com.lucky.arbaguette.substitute.repository;

import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.substitute.domain.Substitute;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

public interface SubstituteRepository extends JpaRepository<Substitute, Integer> {

    Optional<Substitute> findByScheduleAndPermitIsFalse(Schedule schedule);

    boolean existsByScheduleAndPermitIsFalse(Schedule schedule);

    List<Substitute> findByCompanyIdAndPermitIsFalse(int companyId);

    Optional<Substitute> findBySchedule_ScheduleIdAndPermitIsFalse(int scheduleId);

    @Lock(LockModeType.OPTIMISTIC)
    @Query("select s from Substitute s where s.schedule.scheduleId = :scheduleId and s.permit = false and s.crew is null")
    Optional<Substitute> findByIdWithOptimisticLocking(int scheduleId);

}
