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
public class UserHistoricalDto {
  private Long id;
  private Long userId;
  private Long ticketId;
  private String ticketTitle;
  private String action;
  private LocalDateTime timestamp;
  private boolean isRead;
  private String userName;
}
