package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import wcs.backend.entities.User;
import wcs.backend.entities.Role.Title;
import wcs.backend.repositories.RoleRepository;
import wcs.backend.services.UserService;
import wcs.backend.services.RoleService;
import wcs.backend.entities.Role;

@Component
public class UserDataseed {

  @Autowired
  private UserService userService;

  @Autowired
  private RoleService roleService;

  @Autowired
  private RoleRepository roleRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  final int client_NB = 20;

  public void resetData() {
    cleanData();
    loadData();
  }

  private void cleanData() {
    List<User> users = userService.getAllUsers();
    for (User user : users) {
      userService.deleteUser(user.getId());
    }
  }

  private void loadData() {

    for (int i = 0; i < this.client_NB; i++) {
      User userCreated = new User();
      userCreated.setLastname("jesapel");
      userCreated.setFirstname("groot" + i);
      userCreated.setEmail("client" + i + "@wcs.com");
      userCreated.setPassword("client" + i);
      userCreated.setRole(null);
      Role roleUsed = roleRepository.findByRoleTitle(Title.CLIENT).get(0);
      userCreated.setRole(roleUsed);
      userService.createUser(userCreated);
    }

User dev = new User();
dev.setEmail("dev@wcs.com");
dev.setFirstname("Dave");
dev.setLastname("Grohl");
dev.setPassword("Alayd3!dev");
Role roleDev = roleRepository.findByRoleTitle(Title.DEVELOPER).get(0);
dev.setRole(roleDev);
userService.createUser(dev);


User manager = new User();
manager.setEmail("manager@wcs.com");
manager.setFirstname("manager");
manager.setLastname("manager");
manager.setPassword("Alayd3!manager");
Role roleManager = roleRepository.findByRoleTitle(Title.MANAGER).get(0);
manager.setRole(roleManager);
userService.createUser(manager);
}
}