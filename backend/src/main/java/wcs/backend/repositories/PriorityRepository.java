package wcs.backend.repositories;

import wcs.backend.entities.Priority;
import wcs.backend.entities.Priority.Title;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PriorityRepository extends JpaRepository<Priority, Long> {
  List<Priority> findByTitle(Title Title);
}
