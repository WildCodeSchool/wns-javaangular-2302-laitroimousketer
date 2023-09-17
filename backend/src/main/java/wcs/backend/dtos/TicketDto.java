package wcs.backend.dtos;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

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
  private List<UserHasTicketDto> userHasTickets;

}
