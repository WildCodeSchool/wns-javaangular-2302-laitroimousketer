package wcs.backend.services;

import java.util.List;


import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.entities.Status;
import wcs.backend.repositories.StatusRepository;

@Service
@AllArgsConstructor
public class StatusService {

    private StatusRepository statusRepository;

    public List<Status> getAllStatus() {
        return statusRepository.findAll();
    }
    public Status createStatus(Status status) {
      return statusRepository.save(status);
    }
    public Status getStatusById(Long id) {
      return statusRepository.findById(id).orElse(null);
    }
    public Status updateStatus(Status status) {
      Status existingStatus = statusRepository.findById(status.getId()).orElse(null);
      existingStatus.setTitle(status.getTitle());
      return statusRepository.save(existingStatus);
    }
    public void deleteStatus(Long id) {
      statusRepository.deleteById(id);
    }
    
}


