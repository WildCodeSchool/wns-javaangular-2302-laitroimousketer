package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wcs.backend.entities.Priority.Title;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class PriorityDto {
  private Long id;
  private Title priorityTitle;
 // Utilisez List<Ticket> pour stocker plusieurs tickets
  
}
