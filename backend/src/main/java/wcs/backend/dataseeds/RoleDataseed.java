package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import wcs.backend.services.RoleService;
import wcs.backend.entities.Role;

@Component
public class RoleDataseed {

    @Autowired
    private RoleService roleService;

    public void resetData() {
        if (roleService.getAllRoles().isEmpty()) {
            loadData();
        }
    }

    private void loadData() {
      Role roleClientCreated = new Role();
      roleClientCreated.setRoleTitle("Client");
      roleService.createRole(roleClientCreated);

      Role roleDevCreated = new Role();
      roleDevCreated.setRoleTitle("Développeur");
      roleService.createRole(roleDevCreated);

      Role roleManagerCreated = new Role();
      roleManagerCreated.setRoleTitle("Manager");
      roleService.createRole(roleManagerCreated);
  }
  
}
