package wcs.backend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.PriorityDto;
import wcs.backend.entities.Priority;
import wcs.backend.services.PriorityService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/priority")
public class PriorityController {

  private PriorityService priorityService;

  @GetMapping
  public ResponseEntity<List<PriorityDto>> getAllPriority() {
    List<Priority> priority = priorityService.getAllPriority();
    List<PriorityDto> priorityDtos = priority.stream()
        .map(priorityEntity -> new PriorityDto(priorityEntity.getId(), priorityEntity.getPriorityTitle()))
        .collect(Collectors.toList());
    return ResponseEntity.ok(priorityDtos);
  }

  @GetMapping("/{id}")
  public ResponseEntity<PriorityDto> getPriorityById(@PathVariable Long id) {
    Priority priority = priorityService.getPriorityById(id);
    return ResponseEntity.ok(new PriorityDto(priority.getId(), priority.getPriorityTitle()));
  }

  @PostMapping
  public ResponseEntity<PriorityDto> createPriority(@RequestBody PriorityDto priorityDto) {
    Priority priority = new Priority();
    priority.setTitle(priorityDto.getPriorityTitle());
    Priority createdPriority = priorityService.createPriority(priority);
    return ResponseEntity.ok(new PriorityDto(createdPriority.getId(), createdPriority.getPriorityTitle()));
  }

  @PutMapping("/{id}")
  public ResponseEntity<PriorityDto> updatePriority(@PathVariable Long id, @RequestBody PriorityDto priorityDto) {
    Priority existingPriority = priorityService.getPriorityById(id);
    existingPriority.setTitle(priorityDto.getPriorityTitle());
    Priority updatedPriority = priorityService.updatePriority(existingPriority);
    return ResponseEntity.ok(new PriorityDto(updatedPriority.getId(), updatedPriority.getPriorityTitle()));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deletePriority(@PathVariable Long id) {
    priorityService.deletePriority(id);
    return ResponseEntity.noContent().build();
  }
}
