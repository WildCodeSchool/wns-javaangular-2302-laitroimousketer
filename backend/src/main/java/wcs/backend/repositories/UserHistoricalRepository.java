package wcs.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import wcs.backend.entities.UserHistorical;

public interface UserHistoricalRepository extends JpaRepository<UserHistorical, Long> {

  List<UserHistorical> findByUserId(Long userId);

  @Query("SELECT uh FROM UserHistorical uh WHERE uh.user.id = :userId ORDER BY uh.timestamp ASC")
  List<UserHistorical> findOldestEntriesByUserId(@Param("userId") Long userId);

  long countByUserId(Long userId);

}

