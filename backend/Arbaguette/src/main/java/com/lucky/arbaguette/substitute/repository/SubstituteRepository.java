package com.lucky.arbaguette.substitute.repository;

import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.substitute.domain.Substitute;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubstituteRepository extends JpaRepository<Substitute, Integer> {

    Optional<Substitute> findByScheduleAndPermitIsFalse(Schedule schedule);

    boolean existsBySchedule(Schedule schedule);

    List<Substitute> findByCompanyIdAndPermitIsFalse(int companyId);
}
