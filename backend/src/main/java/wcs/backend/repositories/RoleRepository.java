package wcs.backend.repositories;

import wcs.backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findByRoleTitle(String roleTitle);
}
