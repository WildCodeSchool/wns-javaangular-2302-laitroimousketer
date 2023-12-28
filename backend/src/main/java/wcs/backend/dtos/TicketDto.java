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
public class TicketDto {
    private Long id;
    private String ticketTitle;
    private String description;
    private CategoryDto category;
    private StatusDto status;
    private PriorityDto priority;
    private Date creationDate;
    private Date updateDate;
    private Date archiveDate;
    private List<TicketHaveUsersDto> ticketHaveUsers;

    // Informations sur l'auteur
    private UserReadDto author;

}