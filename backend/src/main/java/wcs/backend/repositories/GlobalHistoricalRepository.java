package wcs.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import wcs.backend.entities.GlobalHistorical;


public interface GlobalHistoricalRepository extends JpaRepository<GlobalHistorical, Long> {
  // Ajoutez des méthodes spécifiques au besoin
  @Query("SELECT gh FROM GlobalHistorical gh ORDER BY gh.timestamp ASC")
  List<GlobalHistorical> findOldestEntries();

  List<GlobalHistorical> findByUserId(Long userId);

  List<GlobalHistorical> findByTicketId(Long ticketId);

}
