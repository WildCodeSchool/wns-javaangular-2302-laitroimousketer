package wcs.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import wcs.backend.entities.Status;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

    List<Status> findByTitle(String title);
    
}
