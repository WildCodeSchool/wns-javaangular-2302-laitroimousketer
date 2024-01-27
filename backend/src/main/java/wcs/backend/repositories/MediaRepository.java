package wcs.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import wcs.backend.entities.Media;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media, Long> {
    List<Media> findByUserId(Long userId);
    List<Media> findByChatId(Long chatId);
}
