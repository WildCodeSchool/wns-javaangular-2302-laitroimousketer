package wcs.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import wcs.backend.entities.UserHasTicket;

public interface UserHasTicketRepository extends JpaRepository<UserHasTicket, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
