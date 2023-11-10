package wcs.backend.dtos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserAddressDto {
  private Long id;
  private Long userId; 
  private Long addressId;
}
  // Les getters et setters appropriés