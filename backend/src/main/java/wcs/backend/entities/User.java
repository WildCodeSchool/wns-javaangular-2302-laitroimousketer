package wcs.backend.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class User implements UserDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, insertable = false, updatable = false)
  private Long id;

  @Column(nullable = false)
  private String firstname;

  @Column(nullable = false)
  private String lastname;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  @ManyToOne
  @JoinColumn(name = "role_id", nullable = false)
  private Role role;

  @OneToMany(mappedBy = "author",cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
  private List<Ticket> authoredTickets;

  @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
  private List<TicketHaveUsers> ticketHaveUsers;

  // CASCADE ALL, si user supprimé, useradress supprimé
  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  private List<UserAddress> userAddresses;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(role.getRoleTitle().toString()));
    return authorities;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
public User(String firstname, String lastname, String email, String password, Role role) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.authoredTickets = new ArrayList<>();
    this.ticketHaveUsers = new ArrayList<>();
}

public String getFirstname() {
  return this.firstname;
}

public String getLastname() {
  return this.lastname;
}

public String setFirstname() {
 return this.firstname;
}

public String setLastname() {
  return this.lastname;
}

public void setUserAddresses(List<UserAddress> userAddresses) {
  this.userAddresses = userAddresses;
}

public Address getAddress() {
  // Vous devez décider comment gérer le cas où un utilisateur peut avoir plusieurs adresses
  // Pour l'instant, je vais simplement retourner la première adresse s'il y en a une
  return this.userAddresses != null && !this.userAddresses.isEmpty() ? this.userAddresses.get(0).getAddress() : null;
}


public void setAddress(Address address) {
  // Vous devez décider comment gérer le cas où un utilisateur peut avoir plusieurs adresses
  // Pour l'instant, je vais simplement ajouter une nouvelle relation UserAddress
  if (this.userAddresses == null) {
    this.userAddresses = new ArrayList<>();
  }
  UserAddress userAddress = new UserAddress(this, address);
  this.userAddresses.add(userAddress);
}


}
