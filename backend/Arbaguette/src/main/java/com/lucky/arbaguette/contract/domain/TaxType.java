package com.lucky.arbaguette.contract.domain;

public enum TaxType {

    NONE(1),
    INSU(9.4),
    INCOME(3.3);

    private double percent;

    TaxType(double percent) {
        this.percent = percent;
    }

}
