package wcs.backend.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
@Entity
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(insertable = false, updatable = false)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = true)
    private Category category;

    @ManyToOne
    @JoinColumn(name = "status_id", nullable = true)
    private Status status;

    @Transient // Le champ ne sera pas persisté en base de données
    private String status_id;

    @Transient // Le champ ne sera pas persisté en base de données
    private String statusTitle;

    @Transient
    private Long categoryId;  // Propriété pour stocker l'ID de la catégorie

    @Transient
    private String categoryTitle;  // Propriété pour stocker le nom de la catégorie

    public Ticket() {}

    // Getter and setter methods for other fields

    public String getStatusTitle() {
        if (status != null) {
            return status.getTitle();
        }
        return statusTitle;
    }

    public void setStatusTitle(String statusTitle) {
        this.statusTitle = statusTitle;
    }

    // Ajoutez les getters et les setters pour categoryTitle
    public String getCategoryTitle() {
        return categoryTitle;
    }

    public void setCategoryTitle(String categoryTitle) {
        this.categoryTitle = categoryTitle;
    }
}


