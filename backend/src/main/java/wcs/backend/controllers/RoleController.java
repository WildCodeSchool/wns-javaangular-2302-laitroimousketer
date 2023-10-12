package wcs.backend.controllers;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.entities.Role;
import wcs.backend.services.RoleService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/roles")
@Tag(name = "Roles", description = "Role Management Controller")
public class RoleController {

    private RoleService roleService;
 
    @GetMapping
    @Operation(summary = "Get All Roles", description = "Get details of all available roles.")
    public ResponseEntity<List<Role>> getAllRoles() {
        List<Role> roles = roleService.getAllRoles();
        return ResponseEntity.ok(roles);
    }

}
