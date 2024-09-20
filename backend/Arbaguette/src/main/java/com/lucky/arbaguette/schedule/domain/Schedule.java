package com.lucky.arbaguette.schedule.domain;

import static com.lucky.arbaguette.schedule.domain.StatusType.LATE;
import static com.lucky.arbaguette.schedule.domain.StatusType.YES;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lucky.arbaguette.crew.domain.Crew;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.Duration;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "crew_id")
    private Crew crew;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    private LocalDateTime inTime;

    private LocalDateTime outTime;

    public int getDurationTime() {
        if (this.startTime != null && this.endTime != null) {
            return (int) Duration.between(this.startTime, this.endTime).toHours();
        }
        return 0;
    }

    @JsonIgnore
    public boolean isBeforeWork() {
        return this.status == null;
    }

    @JsonIgnore
    public boolean isAlreadyOutWork() {
        return outTime != null;
    }

    public void inWork(LocalDateTime nowTime) {
        this.inTime = nowTime;
        this.status = YES;

        if (nowTime.isAfter(this.startTime)) {
            this.status = LATE;
        }
    }

    public void outWork(LocalDateTime nowTime) {
        this.outTime = nowTime;
    }
}
