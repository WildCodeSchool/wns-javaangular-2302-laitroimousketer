package wcs.backend.entities;

import java.util.Date;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
@Setter
@Entity
public class Ticket {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, insertable = false, updatable = false)
  private Long id;

  @Column(nullable = false)
  private String ticketTitle;

  @Column(nullable = false, length = 5000)
  private String description;

  @Column(nullable = true)
  @Temporal(TemporalType.TIMESTAMP)
  private Date creationDate;

  @Column(nullable = true)
  @Temporal(TemporalType.TIMESTAMP)
  private Date updateDate;

  @Column(nullable = true)
  @Temporal(TemporalType.TIMESTAMP)
  private Date archiveDate;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = false)
  private Category category;

  @ManyToOne
  @JoinColumn(name = "priority_id", nullable = false)
  private Priority priority;

  @ManyToOne
  @JoinColumn(name = "status_id", nullable = false)
  private Status status;

  @ManyToOne
  @JoinColumn(name = "author_id", nullable = true)
  private User author;

  @OneToMany(mappedBy = "ticket", cascade = CascadeType.REMOVE, orphanRemoval = true, fetch = FetchType.EAGER)
  private List<TicketHaveUsers> userAssociations = new ArrayList<>();

  public Ticket() {
  }
  // Autres getters et setters
}