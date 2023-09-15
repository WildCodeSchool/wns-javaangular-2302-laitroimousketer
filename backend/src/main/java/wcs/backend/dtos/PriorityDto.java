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
  private Title title;
  private List<Ticket> tickets; // Utilisez List<Ticket> pour stocker plusieurs tickets
  public PriorityDto(Long id, Title title) {
  }
  public PriorityDto(Long id, Title title, Optional<List<TicketDto>> tickets) {
  }
  
}
