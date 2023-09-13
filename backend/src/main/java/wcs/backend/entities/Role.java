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
    private Title title;

    @JsonIgnoreProperties("role")
    @OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<User> users;

    // Constructeurs, getters et setters
   
    public Role(Title title) {
      this.title = title;
  }
  @Override
  public String toString() {
    return "Role [id=" + id + ", title=" + title + "]";
  }
}

