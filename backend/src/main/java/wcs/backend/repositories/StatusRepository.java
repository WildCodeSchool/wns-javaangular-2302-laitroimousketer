package wcs.backend.repositories;

import wcs.backend.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface StatusRepository extends JpaRepository<Status, Long> {
     @Query(value = "SELECT s FROM Status s WHERE :key MEMBER OF s.statusMap")
    Status findByStatusMapKey(@Param("key") String key);
}
