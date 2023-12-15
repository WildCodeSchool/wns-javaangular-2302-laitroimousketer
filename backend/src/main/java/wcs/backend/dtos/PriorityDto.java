package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class PriorityDto {
  private Long id;
  private String priorityTitle;
 // Utilisez List<Ticket> pour stocker plusieurs tickets
  
}
