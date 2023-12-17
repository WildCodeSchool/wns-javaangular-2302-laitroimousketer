package wcs.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.StatusDto;
import wcs.backend.services.StatusService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/status")
@Tag(name = "Status", description = "Status Management Controller")
public class StatusController {
  @Autowired
  private StatusService statusService;

  @GetMapping
  @Operation(summary = "Get All Status", description = "Get details of all available status.")
  public ResponseEntity<List<StatusDto>> getAllStatus() {
    List<StatusDto> statusDtos = statusService.getAllStatus();
    return ResponseEntity.ok(statusDtos);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get Status by ID", description = "Get status details by its ID.")
  public ResponseEntity<StatusDto> getStatusById(@PathVariable Long id) {
    StatusDto statusDto = statusService.getStatusById(id);
    if (statusDto != null) {
      return ResponseEntity.ok(statusDto);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  @Operation(summary = "Create Status", description = "Create a new status with details.")
  public ResponseEntity<StatusDto> createStatus(@RequestBody StatusDto statusDto) {
    StatusDto createdStatusDto = statusService.createStatus(statusDto);
    return ResponseEntity.ok(createdStatusDto);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update Status", description = "Update a status by its ID.")
  public ResponseEntity<StatusDto> updateStatus(@PathVariable Long id, @RequestBody StatusDto statusDto) {
    StatusDto updatedStatusDto = statusService.updateStatus(id, statusDto);
    if (updatedStatusDto != null) {
      return ResponseEntity.ok(updatedStatusDto);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete Status", description = "Delete a status by its ID.")
  public ResponseEntity<Void> deleteStatus(@PathVariable Long id) {
    statusService.deleteStatus(id);
    if (statusService.getStatusById(id) != null) {
      return ResponseEntity.noContent().build();
    } else {
      return ResponseEntity.notFound().build();
    }
  }
}
