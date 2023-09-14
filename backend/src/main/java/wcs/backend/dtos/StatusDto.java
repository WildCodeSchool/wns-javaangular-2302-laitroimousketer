package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wcs.backend.entities.Ticket;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StatusDto {
  private Long id;
  private String title;
  private Ticket ticket;
}
