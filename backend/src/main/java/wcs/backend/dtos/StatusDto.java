package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wcs.backend.entities.Status.Title;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StatusDto {
  private Long id;
  private Title  statusTitle;
}
