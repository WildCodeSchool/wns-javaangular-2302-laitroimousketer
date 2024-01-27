package wcs.backend.dataseeds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import wcs.backend.services.RoleService;
import wcs.backend.dtos.RoleDto;

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
      RoleDto roleClientCreated = new RoleDto();
      roleClientCreated.setRoleTitle("Client");
      roleService.createRole(roleClientCreated);

      RoleDto roleDevCreated = new RoleDto();
      roleDevCreated.setRoleTitle("Développeur");
      roleService.createRole(roleDevCreated);

      RoleDto roleManagerCreated = new RoleDto();
      roleManagerCreated.setRoleTitle("Manager");
      roleService.createRole(roleManagerCreated);
  }
  
}
