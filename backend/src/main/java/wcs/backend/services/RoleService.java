package wcs.backend.services;

import java.util.List;


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
    public Role getRoleById(Long id) {
      return roleRepository.findById(id).orElse(null);
    }
    public Role updateRole(Role role) {
      Role existingRole = roleRepository.findById(role.getId()).orElse(null);
      existingRole.setTitle(role.getTitle());
      return roleRepository.save(existingRole);
    }
    public void deleteRole(Long id) {
      roleRepository.deleteById(id);
    }
    
}


