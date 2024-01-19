package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class ChatDto {

    private Long id;

    private Long ticket_id;

    private String message;

    private Date sent_date;

    private UserReadDto author;

    // media sans le contenu data
    private MediaGetAllDto media;

}