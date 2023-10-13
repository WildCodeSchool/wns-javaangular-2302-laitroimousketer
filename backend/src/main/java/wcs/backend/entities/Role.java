package wcs.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Role {
    public enum Title {
        DEVELOPER,
        CLIENT,
        MANAGER
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, insertable = false, updatable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Title roleTitle;

    @JsonIgnoreProperties("role")
    @OneToMany(mappedBy = "role", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users;

    // Constructeurs, getters et setters
   
    public Role(Title roleTitle) {
      this.roleTitle = roleTitle;
  }
  @Override
  public String toString() {
    return "Role [id=" + id + ", title=" + roleTitle + "]";
  }
}

