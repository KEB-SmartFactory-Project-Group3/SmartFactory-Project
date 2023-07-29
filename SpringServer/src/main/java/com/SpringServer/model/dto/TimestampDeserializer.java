package com.SpringServer.model.dto;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class TimestampDeserializer extends JsonDeserializer<Timestamp> {

    // 패턴 수정
    private static final DateTimeFormatter DATE_TIME_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Override
    public Timestamp deserialize(JsonParser parser, DeserializationContext ctxt) throws IOException {
        LocalDateTime localDateTime = LocalDateTime.parse(parser.getText(), DATE_TIME_FORMATTER);
        return Timestamp.valueOf(localDateTime);
    }
}
