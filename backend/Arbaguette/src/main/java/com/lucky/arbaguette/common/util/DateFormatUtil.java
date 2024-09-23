package com.lucky.arbaguette.common.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateFormatUtil {

    public static String formatDateTime(LocalDateTime dateTime) {
        return dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
