package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.User;
import wcs.backend.services.UserService;
import wcs.backend.services.RoleService;
import wcs.backend.entities.Role;

@Component
public class UserDataseed {

  @Autowired
  private UserService userService;

  @Autowired
  private RoleService roleService;

  final int user_NB = 15;

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

    for (int i = 0; i < this.user_NB; i++) {
        User userCreated = new User();
        userCreated.setFirstname("jesapel");
        userCreated.setLastname("groot" + i);
        userCreated.setEmail("email" + i + "@wcs.fr");
        userCreated.setPassword("password" + i);
        userService.createUser(userCreated);
    }
  }
}



