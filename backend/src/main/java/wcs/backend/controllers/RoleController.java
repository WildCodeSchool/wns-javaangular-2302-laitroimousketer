package wcs.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.RoleDto;
import wcs.backend.services.RoleService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/roles/")
@Tag(name = "Roles", description = "Role Management Controller")
public class RoleController {
  @Autowired
  private RoleService roleService;

  @GetMapping
  @Operation(summary = "Get All Roles", description = "Get details of all available roles.")
  public ResponseEntity<List<RoleDto>> getAllRoles() {
    List<RoleDto> roleDtos = roleService.getAllRoles().stream()
        .map(role -> new RoleDto(role.getId(), role.getRoleTitle()))
        .collect(Collectors.toList());
    return ResponseEntity.ok(roleDtos);
  }

  @GetMapping("{id}")
  @Operation(summary = "Get Role by ID", description = "Get details of a role by its ID.")
  public ResponseEntity<RoleDto> getRoleById(@PathVariable Long id) {
    RoleDto roleDto = roleService.getRoleById(id);
    if (roleDto != null) {
      return ResponseEntity.ok(roleDto);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  @Operation(summary = "Create Role", description = "Create a new role.")
  public ResponseEntity<RoleDto> createRole(@RequestBody RoleDto roleDto) {
    RoleDto createdRole = roleService.createRole(roleDto);
    return ResponseEntity.status(HttpStatus.CREATED).body(createdRole);
  }

  @PutMapping("{id}")
  @Operation(summary = "Update Role", description = "Update an existing role.")
  public ResponseEntity<RoleDto> updateRole(@PathVariable Long id, @RequestBody RoleDto roleDto) {
    RoleDto updatedRole = roleService.updateRole(roleDto);
    if (updatedRole != null) {
      return ResponseEntity.ok(updatedRole);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Delete Role", description = "Delete a role by its ID.")
  public ResponseEntity<Void> deleteRole(@PathVariable Long id) {
    roleService.deleteRoleById(id);
    return ResponseEntity.noContent().build();
  }

}
