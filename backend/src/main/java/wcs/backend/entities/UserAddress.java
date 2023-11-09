package wcs.backend.entities;

import jakarta.persistence.*;

@Entity
public class UserAddress {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "address_id")
  private Address address;

  // Constructeurs, getters, setters, etc.

}
