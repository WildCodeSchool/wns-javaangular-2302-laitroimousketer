package wcs.backend.repositories;

import wcs.backend.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
  Status findByStatusTitle(String statusTitle);;
}
