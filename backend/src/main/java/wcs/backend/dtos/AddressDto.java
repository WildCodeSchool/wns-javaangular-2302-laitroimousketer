package wcs.backend.dtos;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {

  private Long id;
  private String city;
  private String country;
  private double latitude;
  private double longitude;
  private String postcode;
  private String street_l1;
  private String street_l2;

  // Les getters et setters appropriés
}