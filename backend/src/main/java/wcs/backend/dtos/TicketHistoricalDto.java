package wcs.backend.dtos;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TicketHistoricalDto {
  private Long id;
  private Long  ticketId;
  private Long userId;
  private String userName;
  private String ticketTitle;
  private String action;
  private LocalDateTime timestamp;
  private boolean isRead;

}
