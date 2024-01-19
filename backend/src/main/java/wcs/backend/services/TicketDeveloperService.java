package wcs.backend.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketDeveloperDto;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.TicketDeveloper;
import wcs.backend.entities.User;
import wcs.backend.repositories.TicketDeveloperRepository;
import wcs.backend.repositories.TicketRepository;
import wcs.backend.repositories.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TicketDeveloperService {
  @Autowired
  private final TicketDeveloperRepository ticketDeveloperRepository;
  @Autowired
  private final TicketRepository ticketRepository;
  @Autowired
  private final UserRepository userRepository;
  @Autowired
  private final ModelMapper modelMapper;

  // GET ALL//
  public List<TicketDeveloperDto> getAllTicketDevelopers() {
    List<TicketDeveloper> ticketDevelopers = ticketDeveloperRepository.findAll();
    return ticketDevelopers.stream()
        .map(ticketDeveloper -> modelMapper.map(ticketDeveloper, TicketDeveloperDto.class))
        .collect(Collectors.toList());
  }

  // CREATE//
  public Optional<TicketDeveloperDto> getTicketDeveloperById(Long id) {
    Optional<TicketDeveloper> ticketDeveloper = ticketDeveloperRepository.findById(id);
    return ticketDeveloper.map(value -> modelMapper.map(value, TicketDeveloperDto.class));
  }

  // GET BY ID//
  public TicketDeveloperDto createTicketDeveloper(TicketDeveloperDto ticketDeveloperDto) {
    TicketDeveloper ticketDeveloper = modelMapper.map(ticketDeveloperDto, TicketDeveloper.class);
    TicketDeveloper savedTicketDeveloper = ticketDeveloperRepository.save(ticketDeveloper);
    return modelMapper.map(savedTicketDeveloper, TicketDeveloperDto.class);
  }

  // UPDATE//
  public TicketDeveloperDto updateTicketDeveloper(Long id, TicketDeveloperDto ticketDeveloperDto) {
    Optional<TicketDeveloper> existingTicketDeveloper = ticketDeveloperRepository.findById(id);

    if (existingTicketDeveloper.isPresent()) {
      TicketDeveloper updatedTicketDeveloperEntity = existingTicketDeveloper.get();

      if (ticketDeveloperDto.getTicketId() != null) {

        Ticket newTicket = ticketRepository.findById(ticketDeveloperDto.getTicketId())
            .orElseThrow(() -> new EntityNotFoundException(
                "Ticket avec l'ID " + ticketDeveloperDto.getTicketId() + " non trouvé."));
        updatedTicketDeveloperEntity.setTicket(newTicket);
      }

      if (ticketDeveloperDto.getDeveloperId() != null) {

        User newDeveloper = userRepository.findById(ticketDeveloperDto.getDeveloperId())
            .orElseThrow(() -> new EntityNotFoundException(
                "Developer avec l'ID " + ticketDeveloperDto.getDeveloperId() + " non trouvé."));
        updatedTicketDeveloperEntity.setDeveloper(newDeveloper);
      }

      TicketDeveloper savedTicketDeveloperEntity = ticketDeveloperRepository.save(updatedTicketDeveloperEntity);

      return modelMapper.map(savedTicketDeveloperEntity, TicketDeveloperDto.class);
    } else {

      throw new EntityNotFoundException("TicketDeveloper avec l'ID " + id + " non trouvé.");
    }
  }

  // SEARCH//
  public List<TicketDeveloperDto> getTicketDeveloperByQuery(Long developerId, Long ticketId) {
    return ticketDeveloperRepository.findByDeveloperIdOrTicketId(developerId, ticketId)
        .stream()
        .map(ticketDeveloper -> modelMapper.map(ticketDeveloper, TicketDeveloperDto.class))
        .collect(Collectors.toList());
}

  // DELETE//
  public void deleteTicketDeveloper(Long id) {
    ticketDeveloperRepository.deleteById(id);
  }

  // Additional methods for update, etc., can be added based on your requirements
}
