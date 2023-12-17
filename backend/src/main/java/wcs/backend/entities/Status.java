package wcs.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Status {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, insertable = false, updatable = false)
  private Long id;

  @ElementCollection
  @CollectionTable(name = "Status_Mapping", joinColumns = @JoinColumn(name = "status_id"))
  @MapKeyColumn(name = "status_key")
  @Column(name = "status_value")
  private Map<String, String> statusMap = new HashMap<>();

  @OneToMany(mappedBy = "status", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
  private Set<Ticket> tickets;

  public void addStatus(String key, String value) {
    statusMap.put(key, value);
  }
}
