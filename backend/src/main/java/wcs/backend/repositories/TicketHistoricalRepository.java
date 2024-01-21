package wcs.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import wcs.backend.entities.TicketHistorical;

public interface TicketHistoricalRepository extends JpaRepository<TicketHistorical, Long> {

  @Query("SELECT th FROM TicketHistorical th WHERE th.ticketId = :ticketId ORDER BY th.timestamp ASC")
  List<TicketHistorical> findOldestEntriesByTicketId(@Param("ticketId") Long ticketId);

  long countByUserId(Long userId);

  List<TicketHistorical> findByUserId(Long userId);

  List<TicketHistorical> findByTicketId(Long ticketId);

}

