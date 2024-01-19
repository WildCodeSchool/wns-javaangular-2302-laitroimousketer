package wcs.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import wcs.backend.entities.Chat;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
  // Requête JPQL pour récupérer les messages d'un ticket spécifique
  List<Chat> findByTicketId(Long ticketId);
}
