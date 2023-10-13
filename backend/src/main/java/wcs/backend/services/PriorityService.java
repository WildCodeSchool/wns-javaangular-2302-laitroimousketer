package wcs.backend.services;

import java.util.List;


import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.entities.Priority;
import wcs.backend.repositories.PriorityRepository;

@Service
@AllArgsConstructor
public class PriorityService {

    private PriorityRepository priorityRepository;

    public List<Priority> getAllPriority() {
        return priorityRepository.findAll();
    }
    public Priority createPriority(Priority priority) {
      return priorityRepository.save(priority);
    }
    public Priority getPriorityById(Long id) {
      return priorityRepository.findById(id).orElse(null);
    }
    public Priority updatePriority(Priority priority) {
      Priority existingPriority = priorityRepository.findById(priority.getId()).orElse(null);
      existingPriority.setTitle(priority.getPriorityTitle());
      return priorityRepository.save(existingPriority);
    }
    public void deletePriority(Long id) {
      priorityRepository.deleteById(id);
    }
    
}


