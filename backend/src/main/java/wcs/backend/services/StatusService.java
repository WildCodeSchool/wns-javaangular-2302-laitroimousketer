package wcs.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.StatusDto; // Importez votre DTO ici

import wcs.backend.entities.Status;
import wcs.backend.repositories.StatusRepository;

@Service
@AllArgsConstructor
public class StatusService {
  private StatusRepository statusRepository;
  private ModelMapper modelMapper;

  public List<StatusDto> getAllStatus() {
    List<Status> statuses = statusRepository.findAll();
    return statuses.stream()
        .map(status -> new StatusDto(status.getId(), status.getStatusTitle()))
        .collect(Collectors.toList());
  }

  public StatusDto getStatusById(Long id) {
    Status status = statusRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Status not found with id: " + id));
    return modelMapper.map(status, StatusDto.class);
  }

  public StatusDto createStatus(StatusDto statusDto) {
    Status status = modelMapper.map(statusDto, Status.class);
    status = statusRepository.save(status);
    return modelMapper.map(status, StatusDto.class);
  }

  public StatusDto updateStatus(Long id, StatusDto statusDto) {
    Status existingStatus = statusRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Status not found with id: " + id));

    modelMapper.map(statusDto, existingStatus);
    existingStatus.setId(id); // Assurez-vous que l'ID reste cohérent
    existingStatus = statusRepository.save(existingStatus);

    return modelMapper.map(existingStatus, StatusDto.class);
  }

  public void deleteStatus(Long id) {
    statusRepository.deleteById(id);
  }
}
