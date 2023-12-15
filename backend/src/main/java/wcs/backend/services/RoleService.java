package wcs.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.entities.Role;
import wcs.backend.repositories.RoleRepository;

@Service
@AllArgsConstructor
public class RoleService {

  private RoleRepository roleRepository;

  public List<Role> getAllRoles() {
    return roleRepository.findAll();
  }

  public Role createRole(Role role) {
    return roleRepository.save(role);
  }

  public Optional<Role> getRoleById(Long id) {
    return roleRepository.findById(id);
  }

  public Role getRoleByTitle(String title) {
    return roleRepository.findByRoleTitle(title);
  }

  public Role updateRole(Role role) {
    return roleRepository.save(role);
  }

  public void deleteRoleById(Long id) {
    roleRepository.deleteById(id);
  }

} 