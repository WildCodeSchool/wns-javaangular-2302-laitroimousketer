package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
  private Long id;
  private String firstname;
  private String lastname;
  private String email;
  private String phone;
  private String password;
  private RoleDto role;
  private AddressDto address;
}
