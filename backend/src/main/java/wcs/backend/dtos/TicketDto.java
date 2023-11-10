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
    private Long categoryId;
    private String categoryTitle;
    private Long statusId;
    private String statusTitle;
    private Long priorityId;
    private String priorityTitle;
    private Date creationDate;
    private Date updateDate;
    private Date archiveDate;
    private List<TicketHaveUsersDto> ticketHaveUsers;

    // Informations sur l'auteur
    private Long authorId;
    private String authorFirstname;
    private String authorLastname;
    private String authorEmail;

    // ... autres champs si nécessaire
    public void setAuthor(UserDto authorDto) {
      this.authorId = authorDto.getId();
      this.authorFirstname = authorDto.getFirstname();
      this.authorLastname = authorDto.getLastname();
      this.authorEmail = authorDto.getEmail();
      // ... définissez d'autres champs si nécessaire
  }
  

}