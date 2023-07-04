package wcs.backend.repositories;

import wcs.backend.entities.Role;
import wcs.backend.entities.Role.Title;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
  List<Role> findByTitle(Title title);
}
