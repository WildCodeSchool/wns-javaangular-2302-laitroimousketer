package wcs.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

import wcs.backend.dtos.UserHistoricalDto;
import wcs.backend.entities.UserHistorical;
import wcs.backend.repositories.UserHistoricalRepository;

@Service
@AllArgsConstructor

public class UserHistoricalService {
  
  private UserHistoricalRepository userHistoricalRepository;
  private ModelMapper modelMapper;


  public List<UserHistoricalDto> getAllUserHistoricals() {
    List<UserHistorical> userHistoricals = userHistoricalRepository.findAll();
    return userHistoricals.stream()
        .map(userHistorical -> modelMapper.map(userHistorical, UserHistoricalDto.class))
        .collect(Collectors.toList());
}

  public UserHistoricalDto getUserHistoricalById(Long id) {
    Optional<UserHistorical> optionalUserHistorical = userHistoricalRepository.findById(id);

    if (optionalUserHistorical.isPresent()) {
      UserHistorical userHistorical = optionalUserHistorical.get();
      return modelMapper.map(userHistorical, UserHistoricalDto.class);
    } else {
      throw new RuntimeException("UserHistorical not found with id: " + id);
    }
  }

  public void addEntry(UserHistoricalDto userHistoricalDto) {
    UserHistorical userHistorical = modelMapper.map(userHistoricalDto, UserHistorical.class);
    userHistoricalRepository.save(userHistorical);

    // Vérifiez si le nombre d'entrées dépasse 20 pour cet utilisateur spécifique
    long count = userHistoricalRepository.countByUserId(userHistoricalDto.getUserId());
    if (count >= 20) {
        // Supprimez les plus anciennes pour cet utilisateur tout en gardant les 20 plus récents
        List<UserHistorical> oldestEntries = userHistoricalRepository.findOldestEntriesByUserId(userHistoricalDto.getUserId());
        if (!oldestEntries.isEmpty()) {
            userHistoricalRepository.delete(oldestEntries.get(0));
        }
    }
}


  public void updateIsReadStatus(Long id, boolean isRead) {
    // Vérifiez si l'entrée UserHistorical existe
    Optional<UserHistorical> optionalUserHistorical = userHistoricalRepository.findById(id);

    if (optionalUserHistorical.isPresent()) {
      UserHistorical userHistorical = optionalUserHistorical.get();
      // Mettez à jour le champ isRead
      userHistorical.setRead(isRead);
      // Enregistrez la mise à jour
      userHistoricalRepository.save(userHistorical);
    } else {
      throw new RuntimeException("UserHistorical not found with id: " + id);
    }
  }
}
