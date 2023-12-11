package wcs.backend.entities;

import jakarta.persistence.*;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class Address {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String city;

  @Column(nullable = false)
  private String country;

  @Column
  private double latitude;

  @Column
  private double longitude;

  @Column(nullable = false)
  private String postcode;

  @Column(nullable = false)
  private String street_l1;

  @Column
  private String street_l2;
// si address supprimé, useradress supprimé via cascade ALL
  @OneToMany(mappedBy = "address", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
  private List<UserAddress> userAddresses;

  // Constructeurs, getters, setters, etc.

}