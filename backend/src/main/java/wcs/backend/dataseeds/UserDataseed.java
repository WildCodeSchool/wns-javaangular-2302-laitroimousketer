package wcs.backend.dataseeds;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.User;
import wcs.backend.repositories.RoleRepository;
import wcs.backend.services.RoleService;
import wcs.backend.services.UserService;
import wcs.backend.dtos.RoleDto;
import wcs.backend.dtos.UserDto;
import wcs.backend.entities.Role;

@Component
public class UserDataseed {

  @Autowired
  private UserService userService;

  @Autowired
  private RoleService roleService;

  @Autowired
  private RoleRepository roleRepository;

  public void resetData() {
    if (userService.getAllUsers().isEmpty()) {
      loadData();
    }
  }

private void loadData() {

  List<RoleDto> existingRoles = roleService.getAllRoles();

  RoleDto roleClient = findRoleByTitle(existingRoles, "Client");
  RoleDto roleDev = findRoleByTitle(existingRoles, "Développeur");
  RoleDto roleManager = findRoleByTitle(existingRoles, "Manager");


    UserDto userCreated = new UserDto();
    userCreated.setLastname("jesapel");
    userCreated.setFirstname("groot");
    userCreated.setEmail("client@wcs.com");
    userCreated.setPassword("Alayd3!client");
    userCreated.setRole(roleClient);
    userService.createUser(userCreated);

    UserDto dev = new UserDto();
    dev.setEmail("dev@wcs.com");
    dev.setFirstname("Dave");
    dev.setLastname("Grohl");
    dev.setPassword("Alayd3!dev");
    dev.setRole(roleDev);
    userService.createUser(dev);

    UserDto manager = new UserDto();
    manager.setEmail("manager@wcs.com");
    manager.setFirstname("the");
    manager.setLastname("manager");
    manager.setPassword("Alayd3!manager");
    manager.setRole(roleManager);
    userService.createUser(manager);
}
private RoleDto findRoleByTitle(List<RoleDto> roles, String title) {
  return roles.stream()
          .filter(role -> role.getRoleTitle().equalsIgnoreCase(title))
          .findFirst()
          .orElse(null);
}
}