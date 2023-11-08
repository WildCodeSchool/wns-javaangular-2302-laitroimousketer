package wcs.backend.services;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.StatusDto; // Importez votre DTO ici
import wcs.backend.entities.Status;
import wcs.backend.repositories.StatusRepository;

@Service
@AllArgsConstructor
public class StatusService {
  private StatusRepository statusRepository;

  public List<StatusDto> getAllStatus() {
    List<Status> statuses = statusRepository.findAll();
    return statuses.stream()
        .map(status -> new StatusDto(status.getId(), status.getStatusTitle()))
        .collect(Collectors.toList());
  }

  public StatusDto createStatus(StatusDto statusDto) {
    // Convertissez le DTO en entité Status ici si nécessaire
    Status status = new Status(statusDto.getStatusTitle());
    Status savedStatus = statusRepository.save(status);
    return new StatusDto(savedStatus.getId(), savedStatus.getStatusTitle());
  }

  public StatusDto getStatusById(Long id) {
    Status status = statusRepository.findById(id).orElse(null);
    if (status != null) {
      return new StatusDto(status.getId(), status.getStatusTitle());
    }
    return null;
  }

  public StatusDto updateStatus(Long id, StatusDto statusDto) {
    Status existingStatus = statusRepository.findById(id).orElse(null);

    if (existingStatus != null) {
      existingStatus.setStatusTitle(statusDto.getStatusTitle());
      Status updatedStatus = statusRepository.save(existingStatus);
      return new StatusDto(updatedStatus.getId(), updatedStatus.getStatusTitle());
    }

    return null;
  }

  public void deleteStatus(Long id) {
    statusRepository.deleteById(id);
  }
}
