package wcs.backend.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketHistoricalDto;
import wcs.backend.entities.TicketHistorical;
import wcs.backend.repositories.TicketHistoricalRepository;

@Service
@AllArgsConstructor
public class TicketHistoricalService {

  private TicketHistoricalRepository ticketHistoricalRepository;
  private ModelMapper modelMapper;

  public List<TicketHistoricalDto> getAllTicketHistoricals() {
    List<TicketHistorical> ticketHistoricals = ticketHistoricalRepository.findAll();
    return ticketHistoricals.stream()
        .map(ticketHistorical -> modelMapper.map(ticketHistorical, TicketHistoricalDto.class))
        .collect(Collectors.toList());
  }

  public TicketHistoricalDto getTicketHistoricalById(Long id) {
    Optional<TicketHistorical> optionalTicketHistorical = ticketHistoricalRepository.findById(id);

    if (optionalTicketHistorical.isPresent()) {
      TicketHistorical ticketHistorical = optionalTicketHistorical.get();
      return modelMapper.map(ticketHistorical, TicketHistoricalDto.class);
    } else {
      throw new RuntimeException("TicketHistorical not found with id: " + id);
    }
  }

  public void addEntry(TicketHistoricalDto ticketHistoricalDto) {
    TicketHistorical ticketHistorical = modelMapper.map(ticketHistoricalDto, TicketHistorical.class);
    ticketHistoricalRepository.save(ticketHistorical);

    // Vérifiez si le nombre d'entrées dépasse 50
    long count = ticketHistoricalRepository.count();
    if (count >= 20) {
        // Supprimez le plus ancien tout en gardant les 50 plus récents
        // Passer l'ID du ticket comme argument à findOldestEntriesByTicketId
        List<TicketHistorical> oldestEntries = ticketHistoricalRepository.findOldestEntriesByTicketId(ticketHistoricalDto.getTicketId());
        if (!oldestEntries.isEmpty()) {
            ticketHistoricalRepository.delete(oldestEntries.get(0));
        }
    }
}


  public void updateIsReadStatus(Long id, boolean isRead) {
    // Vérifiez si l'entrée TicketHistorical existe
    Optional<TicketHistorical> optionalTicketHistorical = ticketHistoricalRepository.findById(id);

    if (optionalTicketHistorical.isPresent()) {
      TicketHistorical ticketHistorical = optionalTicketHistorical.get();
      // Mettez à jour le champ isRead
      ticketHistorical.setRead(isRead);
      // Enregistrez la mise à jour
      ticketHistoricalRepository.save(ticketHistorical);
    } else {
      throw new RuntimeException("TicketHistorical not found with id: " + id);
    }
  }

}
