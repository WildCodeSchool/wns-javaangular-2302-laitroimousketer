package wcs.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import wcs.backend.entities.TicketHaveUsers;

public interface TicketHaveUsersRepository extends JpaRepository<TicketHaveUsers, Long> {
    // Ajoutez des méthodes personnalisées si nécessaire
}
