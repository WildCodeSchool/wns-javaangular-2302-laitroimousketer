package wcs.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.StatusDto;
import wcs.backend.entities.Status;
import wcs.backend.services.StatusService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/status")
@Tag(name = "Status", description = "Status Management Controller")
public class StatusController {

  private StatusService statusService;

  @GetMapping
  @Operation(summary = "Get All Status", description = "Get details of all available status.")
  public ResponseEntity<List<StatusDto>> getAllStatus() {
    List<Status> status = statusService.getAllStatus();
    List<StatusDto> statusDtos = status.stream()
        .map(statusEntity -> new StatusDto(statusEntity.getId(), statusEntity.getStatusTitle()))
        .collect(Collectors.toList());
    return ResponseEntity.ok(statusDtos);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get Status by ID", description = "Get status details by its ID.")
  public ResponseEntity<StatusDto> getStatusById(@PathVariable Long id) {
    Status status = statusService.getStatusById(id);
    return ResponseEntity.ok(new StatusDto(status.getId(), status.getStatusTitle()));
  }

  @PostMapping
  @Operation(summary = "Create Status", description = "Create a new status with details.")
  public ResponseEntity<StatusDto> createStatus(@RequestBody StatusDto statusDto) {
    Status status = new Status();
    status.setTitle(statusDto.getStatusTitle());
    Status createdStatus = statusService.createStatus(status);
    return ResponseEntity.ok(new StatusDto(createdStatus.getId(), createdStatus.getStatusTitle()));
  }

  @PutMapping("/{id}")
  @Operation(summary = "Delete Status", description = "Delete a status by its ID.")
  public ResponseEntity<StatusDto> updateStatus(@PathVariable Long id, @RequestBody StatusDto statusDto) {
    Status existingStatus = statusService.getStatusById(id);
    existingStatus.setTitle(statusDto.getStatusTitle());
    Status updatedStatus = statusService.updateStatus(existingStatus);
    return ResponseEntity.ok(new StatusDto(updatedStatus.getId(), updatedStatus.getStatusTitle()));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete Status", description = "Delete a status by its ID.")
  public ResponseEntity<Void> deleteStatus(@PathVariable Long id) {
    statusService.deleteStatus(id);
    return ResponseEntity.noContent().build();
  }
}
