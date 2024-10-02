package com.lucky.arbaguette.substitute.domain;


import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.schedule.domain.Schedule;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Version;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Substitute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int substituteId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Schedule schedule;

    private boolean permit;

    private int companyId;

    @Version
    private int version;

    @Builder
    private Substitute(Crew crew, Schedule schedule, boolean permit, int companyId) {
        this.crew = crew;
        this.schedule = schedule;
        this.permit = permit;
        this.companyId = companyId;
    }

    public void applySubstitute(Crew crew) {
        this.crew = crew;
    }

    public void permitSubstitute() {
        this.permit = true;
        schedule.changeCrew(crew);
    }

    public Crew getPrevCrew() {
        return schedule.getCrew();
    }
}
