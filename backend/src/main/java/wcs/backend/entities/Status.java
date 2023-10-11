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
        TO_DO,
        DOING,
        DONE
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, insertable = false, updatable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Title statusTitle;
;

    @OneToMany(mappedBy = "status",
    fetch = FetchType.LAZY,
    cascade = CascadeType.ALL,
    orphanRemoval = true)
    @JsonIgnoreProperties("status")
     private Set<Ticket> tickets;

    // Constructeurs, getters et setters
   
    public Status(Title statusTitle) {
      this.statusTitle = statusTitle;
  }
  @Override
  public String toString() {
    return "Statut [id=" + id + ", title=" +  statusTitle
 + "]";
  }
  public Status orElseThrow(Object object) {
    return null;
  }
  public void setTitle(Title title) {
  }
  public Status(Long statusId) {
  }
  
}

