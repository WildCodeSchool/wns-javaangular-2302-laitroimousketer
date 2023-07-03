package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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

  final int client_NB = 2;

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
        userCreated.setFirstname("jesapel");
        userCreated.setLastname("groot" + i);
        userCreated.setEmail("client" + i + "@wcs.fr");
        userCreated.setPassword("client" + i);
        userCreated.setRole(null);
        Role roleUsed = roleRepository.findByTitle(Title.CLIENT).get(0);
        userCreated.setRole(roleUsed);
        this.userService.createUser(userCreated);
    }

    User userManagerCreated = new User();
    userManagerCreated.setFirstname("manager");
    userManagerCreated.setLastname("manager");
    userManagerCreated.setEmail("manager" + "@wcs.fr");
    userManagerCreated.setPassword("manager");
    userManagerCreated.setRole(null);
    Role roleManagerUsed = roleRepository.findByTitle(Title.MANAGER).get(0);
    userManagerCreated.setRole(roleManagerUsed);
    this.userService.createUser(userManagerCreated);

    User userDevCreated = new User();
    userDevCreated.setFirstname("dev");
    userDevCreated.setLastname("dev");
    userDevCreated.setEmail("dev" + "@wcs.fr");
    userDevCreated.setPassword("dev");
    userDevCreated.setRole(null);
    Role roleDevUsed = roleRepository.findByTitle(Title.DEVELOPER).get(0);
    userDevCreated.setRole(roleDevUsed);
    this.userService.createUser(userDevCreated);

  }
}



