package wcs.backend.dtos;
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
  private String title;
  private String description;
  private String status;
  private Long statusId;
  private String category;
  

    
}
