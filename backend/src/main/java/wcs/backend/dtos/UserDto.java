package wcs.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import wcs.backend.entities.User;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
  private Long id;
  private String firstname;
  private String lastname;
  private String email;
  private String roleTitle;
  private AddressDto address;

  // Other fields as needed
  public String getFirstname() {
    return this.firstname;
  }

  public String getLastname() {
    return this.lastname;
  }

  public String getEmail() {
    return this.email;
  }

  public UserDto(User user) {
    this.id = user.getId();
    this.firstname = user.getFirstname();
    this.lastname = user.getLastname();
    this.email = user.getEmail();
    this.roleTitle = user.getRole().getRoleTitle().toString();
    // Map other fields
  }
}