package wcs.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.dtos.GlobalHistoricalDto;
import wcs.backend.entities.GlobalHistorical;
import wcs.backend.repositories.GlobalHistoricalRepository;

@Service
@AllArgsConstructor
public class GlobalHistoricalService {

  private GlobalHistoricalRepository globalHistoricalRepository;
  private ModelMapper modelMapper;

  public List<GlobalHistoricalDto> getAllGlobalHistoricals() {
    List<GlobalHistorical> globalHistoricals = globalHistoricalRepository.findAll();
    return globalHistoricals.stream()
        .map(globalHistorical -> modelMapper.map(globalHistorical, GlobalHistoricalDto.class))
        .collect(Collectors.toList());
  }

  public GlobalHistoricalDto getGlobalHistoricalById(Long id) {
    Optional<GlobalHistorical> optionalGlobalHistorical = globalHistoricalRepository.findById(id);

    if (optionalGlobalHistorical.isPresent()) {
      GlobalHistorical globalHistorical = optionalGlobalHistorical.get();
      return modelMapper.map(globalHistorical, GlobalHistoricalDto.class);
    } else {
      throw new RuntimeException("GlobalHistorical not found with id: " + id);
    }
  }

  public List<GlobalHistoricalDto> getGlobalHistoricalsByTicketId(Long ticketId) {
    List<GlobalHistorical> globalHistoricals = globalHistoricalRepository.findByTicketId(ticketId);
    return globalHistoricals.stream()
        .map(globalHistorical -> modelMapper.map(globalHistorical, GlobalHistoricalDto.class))
        .collect(Collectors.toList());
  }

  public List<GlobalHistoricalDto> getGlobalHistoricalsByUserId(Long userId) {
    List<GlobalHistorical> globalHistoricals = globalHistoricalRepository.findByUserId(userId);
    return globalHistoricals.stream()
        .map(globalHistorical -> modelMapper.map(globalHistorical, GlobalHistoricalDto.class))
        .collect(Collectors.toList());
  }

  public void addEntry(GlobalHistoricalDto globalHistoricalDto) {
    GlobalHistorical globalHistorical = modelMapper.map(globalHistoricalDto, GlobalHistorical.class);
    globalHistoricalRepository.save(globalHistorical);

    // Vérifiez si le nombre d'entrées dépasse 50
    long count = globalHistoricalRepository.count();
    if (count >= 50) {
      // Supprimez le plus ancien tout en gardant les 50 plus récents
      List<GlobalHistorical> oldestEntries = globalHistoricalRepository.findOldestEntries();
      if (!oldestEntries.isEmpty()) {
        globalHistoricalRepository.delete(oldestEntries.get(0));
      }
    }
  }

  public void updateIsReadStatus(Long id, boolean isRead) {
    // Vérifiez si l'entrée GlobalHistorical existe
    Optional<GlobalHistorical> optionalGlobalHistorical = globalHistoricalRepository.findById(id);

    if (optionalGlobalHistorical.isPresent()) {
      GlobalHistorical globalHistorical = optionalGlobalHistorical.get();
      // Mettez à jour le champ isRead
      globalHistorical.setRead(isRead);
      // Enregistrez la mise à jour
      globalHistoricalRepository.save(globalHistorical);
    } else {
      throw new RuntimeException("GlobalHistorical not found with id: " + id);
    }
  }

}
