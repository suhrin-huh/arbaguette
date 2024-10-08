package com.lucky.arbaguette.substitute.service;

import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.exception.DuplicateException;
import com.lucky.arbaguette.common.exception.ForbiddenException;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.common.exception.UnAuthorizedException;
import com.lucky.arbaguette.company.repository.CompanyRepository;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import com.lucky.arbaguette.schedule.domain.Schedule;
import com.lucky.arbaguette.schedule.repository.ScheduleRepository;
import com.lucky.arbaguette.substitute.domain.Substitute;
import com.lucky.arbaguette.substitute.dto.request.SubstituteRequest;
import com.lucky.arbaguette.substitute.dto.response.SubstituteAgreeResponse;
import com.lucky.arbaguette.substitute.dto.response.SubstituteSaveResponse;
import com.lucky.arbaguette.substitute.dto.response.SubstitutesResponse;
import com.lucky.arbaguette.substitute.repository.SubstituteRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class SubstituteService {

    private final SubstituteRepository substituteRepository;
    private final CrewRepository crewRepository;
    private final ScheduleRepository scheduleRepository;
    private final CompanyRepository companyRepository;

    public SubstituteSaveResponse saveSubstitute(CustomUserDetails userDetails, SubstituteRequest request) {
        Crew crew = crewRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("알바생이 아니거나, 찾을 수 없습니다."));
        Schedule schedule = scheduleRepository.findByScheduleIdAndCrew(request.scheduleId(), crew)
                .orElseThrow(() -> new ForbiddenException("스케줄을 찾을 수 없습니다."));

        if (schedule.getStartTime().isBefore(LocalDateTime.now())) {
            throw new BadRequestException("이미 지난 날짜는 요청할 수 없습니다.");
        }

        if (substituteRepository.existsByScheduleAndPermitIsFalse(schedule)) {
            throw new DuplicateException("이미 대타 신청이 완료되었습니다.");
        }

        Substitute subStitute = substituteRepository.save(Substitute.builder()
                .schedule(schedule)
                .permit(false)
                .companyId(crew.getCompany().getCompanyId())
                .build());
        return SubstituteSaveResponse.of(subStitute);
    }

    public SubstitutesResponse getSubstitutes(CustomUserDetails customUserDetails, int companyId) {
        if (companyId == 0) {
            companyId = crewRepository.findByEmail(customUserDetails.getUsername())
                    .orElseThrow(() -> new NotFoundException("해당하는 회사를 찾을 수 없습니다."))
                    .getCompany().getCompanyId();
        }

        if (!companyRepository.existsById(companyId)) {
            throw new NotFoundException("사업장을 찾을 수 없습니다.");
        }
        return SubstitutesResponse.of(substituteRepository.findByCompanyIdAndPermitIsFalse(companyId));
    }

    public SubstituteAgreeResponse agreeSubstitute(CustomUserDetails userDetails, SubstituteRequest request) {
        Substitute substitute = substituteRepository.findBySchedule_ScheduleId(request.scheduleId())
                .orElseThrow(() -> new NotFoundException("해당하는 대타 내역을 찾을 수 없습니다."));
        companyRepository.findByCompanyIdAndBoss_Email(substitute.getCompanyId(), userDetails.getUsername())
                .orElseThrow(() -> new UnAuthorizedException("요청하신 사업장의 사장님만 접근 가능합니다."));

        Crew prevCrew = substitute.getPrevCrew();
        Crew afterCrew = substitute.getCrew();

        if (afterCrew == null) {
            throw new BadRequestException("대타 희망자가 없습니다. 대타 희망자가 있어야 승인 가능합니다.");
        }

        if (prevCrew.getCrewId() == afterCrew.getCrewId()) {
            throw new DuplicateException("이미 대타 승인완료 된 스케줄입니다.");
        }

        //요청 승인, 스케줄 변경
        substitute.permitSubstitute();

        return SubstituteAgreeResponse.from(prevCrew, substitute.getCrew());
    }

    public void applySubstitute(CustomUserDetails userDetails, SubstituteRequest request) {
        Crew crew = crewRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new UnAuthorizedException("알바생이 아니거나, 찾을 수 없습니다."));
        Schedule schedule = scheduleRepository.findByScheduleIdAndCrewIsNot(request.scheduleId(), crew)
                .orElseThrow(() -> new NotFoundException("해당하는 스케줄이 존재하지 않습니다."));

        if (scheduleRepository.findByCrewAndMonthAndDay(crew, schedule.getStartTime().getMonthValue(),
                schedule.getStartTime().getDayOfMonth()).isPresent()) {
            throw new DuplicateException("근무일이 겹칩니다.");
        }

        Substitute substitute = substituteRepository.findByIdWithOptimisticLocking(schedule.getScheduleId())
                .orElseThrow(() -> new BadRequestException("이미 마감된 대타입니다."));

        substitute.applySubstitute(crew);
    }

}
