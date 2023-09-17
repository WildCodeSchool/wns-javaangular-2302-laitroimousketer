package wcs.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.StatusDto;
import wcs.backend.entities.Status;
import wcs.backend.services.StatusService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/status")
public class StatusController {

  private StatusService statusService;

  @GetMapping
  public ResponseEntity<List<StatusDto>> getAllStatus() {
    List<Status> status = statusService.getAllStatus();
    List<StatusDto> statusDtos = status.stream()
        .map(statusEntity -> new StatusDto(statusEntity.getId(), statusEntity.getStatusTitle()))
        .collect(Collectors.toList());
    return ResponseEntity.ok(statusDtos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<StatusDto> getStatusById(@PathVariable Long id) {
    Status status = statusService.getStatusById(id);
    return ResponseEntity.ok(new StatusDto(status.getId(), status.getStatusTitle()));
  }

  @PostMapping
  public ResponseEntity<StatusDto> createStatus(@RequestBody StatusDto statusDto) {
    Status status = new Status();
    status.setTitle(statusDto.getStatusTitle());
    Status createdStatus = statusService.createStatus(status);
    return ResponseEntity.ok(new StatusDto(createdStatus.getId(), createdStatus.getStatusTitle()));
  }

  @PutMapping("/{id}")
  public ResponseEntity<StatusDto> updateStatus(@PathVariable Long id, @RequestBody StatusDto statusDto) {
    Status existingStatus = statusService.getStatusById(id);
    existingStatus.setTitle(statusDto.getStatusTitle());
    Status updatedStatus = statusService.updateStatus(existingStatus);
    return ResponseEntity.ok(new StatusDto(updatedStatus.getId(), updatedStatus.getStatusTitle()));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteStatus(@PathVariable Long id) {
    statusService.deleteStatus(id);
    return ResponseEntity.noContent().build();
  }
}
