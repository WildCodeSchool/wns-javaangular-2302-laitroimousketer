package wcs.backend.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ChatDto {

    private Long id;

    private String message;

    private String sender;

    private String receiver;

    private LocalDate timestamp;

}