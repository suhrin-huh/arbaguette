package com.lucky.arbaguette.bonus.service;

import com.lucky.arbaguette.bonus.domain.Bonus;
import com.lucky.arbaguette.bonus.repository.BonusRedisRepository;
import com.lucky.arbaguette.bonus.repository.BonusRepository;
import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.boss.repository.BossRepository;
import com.lucky.arbaguette.common.domain.CustomUserDetails;
import com.lucky.arbaguette.common.domain.dto.KafkaMsg;
import com.lucky.arbaguette.common.exception.BadRequestException;
import com.lucky.arbaguette.common.exception.NotFoundException;
import com.lucky.arbaguette.common.service.BankService;
import com.lucky.arbaguette.crew.domain.Crew;
import com.lucky.arbaguette.crew.repository.CrewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BonusService {

    private final String TOPIC_NAME = "clickTopic";

    private final BonusRepository bonusRepository;
    private final BonusRedisRepository bonusRedisRepository;
    private final BossRepository bossRepository;
    private final BankService bankService;
    private final CrewRepository crewRepository;
    private final KafkaTemplate<String, KafkaMsg> kafkaTemplate;

    public void spreadBonus(CustomUserDetails customUserDetails, int money) {
        Boss boss = bossRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("사장님을 찾을 수 없습니다."));

        bankService.depositAccountWithdraw(boss, money);

        Bonus bonus = bonusRepository.save(Bonus.builder()
                .boss(boss)
                .money(money)
                .build());

        bonusRedisRepository.save(bonus.getBonusId(), money / 100);
    }

    public void getBonus(CustomUserDetails customUserDetails, int bonusId) {
        Crew crew = crewRepository.findByEmail(customUserDetails.getUsername())
                .orElseThrow(() -> new NotFoundException("알바생을 찾을 수 없습니다."));
        long remainClickCnt = bonusRedisRepository.decrement(bonusId);

        boolean isEnd = false;
        if (remainClickCnt == 0) {
            isEnd = true;
        } else if (remainClickCnt < 0) {
            throw new BadRequestException("종료된 이벤트입니다.");
        }

        KafkaMsg kafkaMsg = new KafkaMsg(bonusId, crew.getAccount(), crew.getUserKey(), isEnd);
        kafkaTemplate.send(TOPIC_NAME, kafkaMsg);
    }
}
