package wcs.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;




import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Status {
    public enum Title {
        DOING,
        TO_DO,
        DONE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, insertable = false, updatable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = true)
    private Title title;

    @OneToMany(mappedBy = "status",
    fetch = FetchType.LAZY,
    cascade = CascadeType.ALL,
    orphanRemoval = true)
    @JsonIgnoreProperties("status")
     private Set<Ticket> tickets;

    // Constructeurs, getters et setters
   
    public Status(Title title) {
      this.title = title;
  }
  @Override
  public String toString() {
    return "Statut [id=" + id + ", title=" + title + "]";
  }
  public Status orElseThrow(Object object) {
    return null;
  }
  public void setTitle(Title title) {
  }
  
}

