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
    HIGH,
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, insertable = false, updatable = false)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(nullable = true)
  private Title priorityTitle;

  @OneToMany(mappedBy = "priority", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JsonIgnoreProperties("priority")
  private Set<Ticket> tickets;

  // Getters et setters
  public Priority(Title priorityTitle) {
    this.priorityTitle = priorityTitle;
  }

  public void setTitle(Title priorityTitle) {
  }

  public Priority(Long priorityId) {
  }

}