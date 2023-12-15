package wcs.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.dtos.CategoryDto;
import wcs.backend.dtos.PriorityDto;
import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.repositories.PriorityRepository;

@Service
@AllArgsConstructor
public class PriorityService {

  private PriorityRepository priorityRepository;
  private ModelMapper modelMapper;

  public List<PriorityDto> getAllPriority() {
    List<Priority> priorities = priorityRepository.findAll();
    return priorities.stream()
        .map(priority -> new PriorityDto(priority.getId(), priority.getPriorityTitle()))
        .collect(Collectors.toList());
  }

  public PriorityDto getPriorityById(Long id) {
    Priority category = priorityRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
    return modelMapper.map(category, PriorityDto.class);
  }

  public PriorityDto createPriority(PriorityDto priorityDto) {
    Priority priority = modelMapper.map(priorityDto, Priority.class);
    priority = priorityRepository.save(priority);
    return modelMapper.map(priority, PriorityDto.class);
  }

  public PriorityDto updatePriority(Long id, PriorityDto priorityDto) {
    Priority existingPriority = priorityRepository.findById(id)
        .orElseThrow(() -> new RuntimeException(" Priority not found with id: " + id));

    modelMapper.map(priorityDto, existingPriority);
    existingPriority.setId(id); // Assurez-vous que l'ID reste cohérent
    existingPriority = priorityRepository.save(existingPriority);
    return modelMapper.map(existingPriority, PriorityDto.class);
  }

  public void deletePriority(Long id) {
    priorityRepository.deleteById(id);
  }

}
