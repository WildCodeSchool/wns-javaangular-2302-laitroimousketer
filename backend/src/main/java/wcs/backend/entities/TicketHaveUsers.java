package wcs.backend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TicketHaveUsers {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(nullable = false, insertable = false, updatable = false)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "ticket_id", nullable = false)
  private Ticket ticket;

  public TicketHaveUsers(User user, Ticket ticket) {
    this.user = user;
    this.ticket = ticket;
  }

}

// Getters and setters
