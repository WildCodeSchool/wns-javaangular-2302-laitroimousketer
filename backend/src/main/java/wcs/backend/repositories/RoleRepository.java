package wcs.backend.repositories;

import wcs.backend.entities.Role;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
  List<Role> findByRoleTitle(Role.Title role_title);
}
