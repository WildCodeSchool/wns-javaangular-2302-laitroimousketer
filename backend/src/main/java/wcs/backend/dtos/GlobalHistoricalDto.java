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

public class GlobalHistoricalDto {

  private Long id;
  private Long ticketId;
  private String ticketTitle;
  private String action;
  private String userName;
  private LocalDateTime timestamp;
  private boolean isRead;

}