package wcs.backend.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Priority {


  public enum Title {
    LOW,
    MEDIUM,
    HIGH
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Title title;
  


  @OneToMany(mappedBy = "priority", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JsonIgnoreProperties("priority")
  private Set<Ticket> tickets;
  
  // Getters et setters
    public Priority(Title title) {
    this.title = title;
}
    public void setTitle(Title title) {
    }

    
}