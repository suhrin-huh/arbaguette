package com.lucky.arbaguette.common.util;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class DateFormatUtil {

    public static String formatDateTime(LocalDateTime dateTime) {
        return dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }

    public static String formatYearMonth(LocalDateTime dateTime) {
        return dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM"));
    }

    public static String formatMonthDay(LocalDateTime dateTime) {
        return dateTime.format(DateTimeFormatter.ofPattern("MM-dd"));
    }

    public static String formatTime(LocalDateTime dateTime) {
        if (dateTime == null) {
            return null;
        }
        return dateTime.format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    public static LocalDateTime getStartOfMonth(LocalDateTime date) {
        return date.withDayOfMonth(1).with(LocalTime.MIN); // 월의 1일 00:00:00
    }

    public static LocalDateTime getEndOfMonth(LocalDateTime date) {
        return date.withDayOfMonth(LocalDate.now().lengthOfMonth())
                .with(LocalTime.MAX); // 월의 마지막 날 23:59:59
    }
}
