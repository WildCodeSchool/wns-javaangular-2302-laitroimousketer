package wcs.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.dtos.RoleDto;
import wcs.backend.entities.Role;
import wcs.backend.repositories.RoleRepository;

@Service
@AllArgsConstructor
public class RoleService {
  @Autowired
  private RoleRepository roleRepository;
  @Autowired
  private ModelMapper modelMapper;

  public List<RoleDto> getAllRoles() {
    List<Role> roles = roleRepository.findAll();
    return roles.stream()
        .map(role -> modelMapper.map(role, RoleDto.class))
        .collect(Collectors.toList());
  }

  public RoleDto createRole(RoleDto roleDto) {
    Role role = modelMapper.map(roleDto, Role.class);
    Role savedRole = roleRepository.save(role);
    return modelMapper.map(savedRole, RoleDto.class);
  }

  public RoleDto getRoleById(Long id) {
    Optional<Role> optionalRole = roleRepository.findById(id);
    return optionalRole.map(role -> modelMapper.map(role, RoleDto.class)).orElse(null);
  }

  public RoleDto getRoleByTitle(String title) {
    Role role = roleRepository.findByRoleTitle(title);
    return modelMapper.map(role, RoleDto.class);
  }

  public RoleDto updateRole(RoleDto roleDto) {
    Role role = modelMapper.map(roleDto, Role.class);
    Role updatedRole = roleRepository.save(role);
    return modelMapper.map(updatedRole, RoleDto.class);
  }

  public void deleteRoleById(Long id) {
    roleRepository.deleteById(id);
  }
}
