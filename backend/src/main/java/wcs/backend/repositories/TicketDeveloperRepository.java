package wcs.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import wcs.backend.entities.TicketDeveloper;

import java.util.List;

public interface TicketDeveloperRepository extends JpaRepository<TicketDeveloper, Long> {

    List<TicketDeveloper> findByDeveloperIdOrTicketId(Long developerId, Long ticketId);
  
    // Additional custom queries if needed
}
