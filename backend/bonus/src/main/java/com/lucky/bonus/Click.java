package com.lucky.bonus;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Click {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clickId;

    private int bonusId;

    private String accountNo;

    private String userKey;

    private int cnt = 0;

    @Builder
    private Click(int bonusId, String accountNo, String userKey){
        this.bonusId = bonusId;
        this.accountNo = accountNo;
        this.userKey = userKey;
    }

    public void increaseClickCnt(){
        this.cnt++;
    }


}
