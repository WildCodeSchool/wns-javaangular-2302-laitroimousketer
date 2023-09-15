package wcs.backend.repositories;

import wcs.backend.entities.Status;
import wcs.backend.entities.Status.Title;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StatusRepository extends JpaRepository<Status, Long> {
  List<Status> findByTitle(Title Title);
}
