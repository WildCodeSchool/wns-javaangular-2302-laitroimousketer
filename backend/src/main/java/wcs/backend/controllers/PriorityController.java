package wcs.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.PriorityDto;
import wcs.backend.entities.Priority;
import wcs.backend.services.PriorityService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/priority")
@Tag(name = "Priorities", description = "Priority Management Controller")
public class PriorityController {

  private PriorityService priorityService;

  @GetMapping
  @Operation(summary = "Get All Priorities", description = "Get details of all available priorities.")
  public ResponseEntity<List<PriorityDto>> getAllPriority() {
    List<Priority> priority = priorityService.getAllPriority();
    List<PriorityDto> priorityDtos = priority.stream()
        .map(priorityEntity -> new PriorityDto(priorityEntity.getId(), priorityEntity.getPriorityTitle()))
        .collect(Collectors.toList());
    return ResponseEntity.ok(priorityDtos);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get Priority by ID", description = "Get details of a priority by its ID.")
  public ResponseEntity<PriorityDto> getPriorityById(@PathVariable Long id) {
    Priority priority = priorityService.getPriorityById(id);
    return ResponseEntity.ok(new PriorityDto(priority.getId(), priority.getPriorityTitle()));
  }

  @PostMapping
  @Operation(summary = "Create Priority", description = "Create a new priority.")
  public ResponseEntity<PriorityDto> createPriority(@RequestBody PriorityDto priorityDto) {
    Priority priority = new Priority();
    priority.setTitle(priorityDto.getPriorityTitle());
    Priority createdPriority = priorityService.createPriority(priority);
    return ResponseEntity.ok(new PriorityDto(createdPriority.getId(), createdPriority.getPriorityTitle()));
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update Priority", description = "Update an existing priority.")
  public ResponseEntity<PriorityDto> updatePriority(@PathVariable Long id, @RequestBody PriorityDto priorityDto) {
    Priority existingPriority = priorityService.getPriorityById(id);
    existingPriority.setTitle(priorityDto.getPriorityTitle());
    Priority updatedPriority = priorityService.updatePriority(existingPriority);
    return ResponseEntity.ok(new PriorityDto(updatedPriority.getId(), updatedPriority.getPriorityTitle()));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete Priority", description = "Delete a priority by its ID.")
  public ResponseEntity<Void> deletePriority(@PathVariable Long id) {
    priorityService.deletePriority(id);
    return ResponseEntity.noContent().build();
  }
}
