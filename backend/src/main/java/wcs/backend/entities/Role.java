package wcs.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity

public class Role {
    public enum Title {
        CLIENT,
        DEVELOPPEUR,
        RESPONSABLE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, insertable = false, updatable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "VARCHAR(100) DEFAULT 'CLIENT'")
    private Title title;

@JsonIgnoreProperties("category")
@OneToMany(mappedBy = "role", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
private List<User> users = new ArrayList<>();

    // Constructeurs, getters et setters
   
    public Role(Title title) {
      this.title = title;
  }

}

