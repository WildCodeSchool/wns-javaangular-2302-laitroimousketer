package wcs.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.PriorityDto;
import wcs.backend.services.PriorityService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/priorities/")
@Tag(name = "Priorities", description = "Priority Management Controller")
public class PriorityController {
  @Autowired
  private PriorityService priorityService;

  @GetMapping
  @Operation(summary = "Get All Priorities", description = "Get details of all available priorities.")
  public ResponseEntity<List<PriorityDto>> getAllPriority() {
    List<PriorityDto> priorityDto = priorityService.getAllPriority();
    return ResponseEntity.ok(priorityDto);
  }

  @GetMapping("{id}")
  @Operation(summary = "Get Priority by ID", description = "Get details of a priority by its ID.")
  public ResponseEntity<PriorityDto> getPriorityById(@PathVariable Long priorityId) {
    PriorityDto priorityDto = priorityService.getPriorityById(priorityId);
     return ResponseEntity.ok(priorityDto);
  }

  @PostMapping
  @Operation(summary = "Create Priority", description = "Create a new priority.")
  public ResponseEntity<PriorityDto> createPriority(@RequestBody PriorityDto priorityDto) {
    PriorityDto createdPriorityDto = priorityService.createPriority(priorityDto);
    return ResponseEntity.ok(createdPriorityDto);
  }

  @PutMapping("{id}")
  @Operation(summary = "Update Priority", description = "Update an existing priority.")
  public ResponseEntity<PriorityDto> updatePriority(@PathVariable Long id, @RequestBody PriorityDto priorityDto) {
    PriorityDto updatedPriorityDto = priorityService.updatePriority(id, priorityDto);
    return ResponseEntity.ok(updatedPriorityDto);
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Delete Priority", description = "Delete a priority by its ID.")
  public ResponseEntity<Void> deletePriority(@PathVariable Long id) {
    priorityService.deletePriority(id);
    return ResponseEntity.noContent().build();
  }
}
