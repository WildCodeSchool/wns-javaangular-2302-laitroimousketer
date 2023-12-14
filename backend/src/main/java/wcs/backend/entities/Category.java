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
public class Category {

  public enum Title {
    TECHNICAL,
    FEATURE,
    BILLING,
  }

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, insertable = false, updatable = false)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(nullable = true)
  private Title categoryTitle;
  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
  @JsonIgnoreProperties("category")
  private Set<Ticket> tickets;

  // Getters et setters
  public Category(Title categoryTitle) {
    this.categoryTitle = categoryTitle;
  }

  public Category(Long categoryId) {
  }
}