package wcs.backend.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.*;
import java.util.Date;


@Entity
@Table(name = "chat")
@Getter
@Setter
@NoArgsConstructor
public class Chat  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "message")
    private String message;

    @Column(name = "author")
    private String author;

    @Column(name = "sent_date")
    private Date sent_date;

    @ManyToOne
    @JoinColumn(name = "ticket_id", nullable = false)
    private Ticket ticket;

}