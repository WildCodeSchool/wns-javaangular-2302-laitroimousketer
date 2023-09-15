package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wcs.backend.entities.Status.Title;

import java.util.List;
import java.util.Optional;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StatusDto {
  private Long id;
  private Title title;
  private List<TicketDto> tickets;

  public StatusDto(Long id, Title title, Optional<List<TicketDto>> tickets) {
  
  }

 
  public StatusDto(Long id, Title title) {
    
  }


}
