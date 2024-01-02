package wcs.backend.dtos;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TicketUpdateDto {
    private Long id;
    private String ticketTitle;
    private String description;
    private Date updateDate;
    private Date archiveDate;
    private List<TicketHaveUsersDto> ticketHaveUsers;


}