package wcs.backend.dataseeds;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.entities.User;
import wcs.backend.entities.Role.Title;
import wcs.backend.services.UserService;
import wcs.backend.services.RoleService;
import wcs.backend.entities.Role;

@Component
public class RoleDataseed {

  @Autowired
  private RoleService roleService;

  public void resetData() {
    cleanData();
    loadData();
  }
  
  private void cleanData() {
    List<Role> roles = roleService.getAllRoles();
    for (Role role : roles) {
      roleService.deleteRole(role.getId());
    }
  }

  
  private void loadData() {

        Role roleCreated = new Role();
        roleCreated.setTitle(Title.CLIENT);
        roleService.createRole(roleCreated);

  }
}



