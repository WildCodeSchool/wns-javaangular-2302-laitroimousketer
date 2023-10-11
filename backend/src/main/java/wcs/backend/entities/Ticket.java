package wcs.backend.entities;

import java.util.Date;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.util.ArrayList;
import java.util.Date;
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

  @Column(nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date creationDate;

  @Column(nullable = true)
  @Temporal(TemporalType.TIMESTAMP)
  private Date updateDate;

  @ManyToOne
  @JoinColumn(name = "category_id", nullable = true)
  private Category category;

  @ManyToOne
  @JoinColumn(name = "priority_id", nullable = true)
  private Priority priority;

  @ManyToOne
  @JoinColumn(name = "status_id", nullable = false)
  private Status status;

  @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<UserHasTicket> userAssociations = new ArrayList<>();

  public Ticket() {
  }

  // Méthode pour définir l'utilisateur créateur lors de la création du ticket
  public void setCreatorUser(User user) {
    UserHasTicket userHasTicket = new UserHasTicket(user, this, true);
    user.getUserHasTickets().add(userHasTicket);
  }

  public void setTicketTitle(String ticketTitle) {
    this.ticketTitle = ticketTitle;
  }


  // Autres getters et setters
}
