package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.Priority.Title;

import java.util.List;
import java.util.Optional;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class PriorityDto {
  private Long id;
  private Title priorityTitle;
  private List<Ticket> tickets; // Utilisez List<Ticket> pour stocker plusieurs tickets
  public PriorityDto(Long id, Title priorityTitle) {
  }
  public PriorityDto(Long id, Title priorityTitle, Optional<List<TicketDto>> tickets) {
  }
  
}
