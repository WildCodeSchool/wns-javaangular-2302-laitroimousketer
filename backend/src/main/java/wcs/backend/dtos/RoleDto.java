package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import wcs.backend.entities.Role.Title;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class RoleDto {
  private Long id;
  private Title roleTitle;
}
