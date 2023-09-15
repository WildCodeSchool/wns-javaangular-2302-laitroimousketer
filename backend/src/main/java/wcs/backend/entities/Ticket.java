package wcs.backend.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Entity
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name="category_id", nullable = false)
    Category category;

    @ManyToOne
    @JoinColumn(name="priority_id", nullable = false)
    Priority priority;
    
    @ManyToOne
    @JoinColumn(name="status_id", nullable = false)
    Status status;

    public Ticket(){}

}
