package wcs.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketDto;
import wcs.backend.entities.Category;
import wcs.backend.entities.Priority;
import wcs.backend.entities.Status;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.User;
import wcs.backend.repositories.CategoryRepository;
import wcs.backend.repositories.PriorityRepository;
import wcs.backend.repositories.StatusRepository;
import wcs.backend.repositories.UserRepository;
import wcs.backend.services.TicketService;

import java.util.List;
import java.util.stream.Collectors;

@AllArgsConstructor
@RestController
@RequestMapping("api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

  private TicketService ticketService;
  private CategoryRepository categoryRepository;
  private PriorityRepository priorityRepository;
  private StatusRepository statusRepository;
  private UserRepository userRepository;

  @Autowired
  private ModelMapper modelMapper; // Utilisez ModelMapper pour simplifier la conversion entre entités et DTO

  // build create Ticket REST API
  @PostMapping
  public ResponseEntity<TicketDto> createTicket(@RequestBody TicketDto ticketDto,
      @RequestParam("statusId") Long statusId, @RequestParam("categoryId") Long categoryId,
      @RequestParam("priorityId") Long priorityId, @RequestParam("creatorId") Long creatorId) {
    // Créez un nouveau ticket à partir des données du DTO
    Ticket ticket = convertToEntity(ticketDto);

    // Utilisez le categoryId, priorityId et statusId passés en paramètres pour
    // récupérer les entités associées
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new EntityNotFoundException("Category not found with ID: " + categoryId));
    Priority priority = priorityRepository.findById(priorityId)
        .orElseThrow(() -> new EntityNotFoundException("Priority not found with ID: " + priorityId));
    Status status = statusRepository.findById(statusId)
        .orElseThrow(() -> new EntityNotFoundException("Status not found with ID: " + statusId));

    // Utilisez le creatorId pour récupérer l'utilisateur créateur
    User creator = userRepository.findById(creatorId)
        .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + creatorId));

    // Associez le ticket à la catégorie, la priorité et le statut sélectionnés
    ticket.setCategory(category);
    ticket.setPriority(priority);
    ticket.setStatus(status);

    // Enregistrez le ticket et l'utilisateur créateur
    Ticket savedTicket = ticketService.createTicket(ticket, creator);

    TicketDto savedTicketDto = convertToDto(savedTicket);

    return new ResponseEntity<>(savedTicketDto, HttpStatus.CREATED);
  }

  // build get ticket by id REST API
  // http://localhost:8080/api/tickets/1
  @GetMapping("/{id}")
  public ResponseEntity<TicketDto> getTicketById(@PathVariable("id") Long ticketId) {
    Ticket ticket = ticketService.getTicketById(ticketId);
    if (ticket != null) {
      TicketDto ticketDto = convertToDto(ticket);
      return new ResponseEntity<>(ticketDto, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  // Build Get All Tickets REST API
  // http://localhost:8080/api/tickets
  @GetMapping
  public ResponseEntity<List<TicketDto>> getAllTicketsDtos() {
    List<TicketDto> ticketDtos = ticketService.getAllTicketsDtos();
    return new ResponseEntity<>(ticketDtos, HttpStatus.OK);
  }

  // Build Update Ticket REST API
  @PutMapping("/{id}")
  // http://localhost:8080/api/tickets/1
  public ResponseEntity<TicketDto> updateTicket(@PathVariable("id") Long ticketId,
      @RequestBody TicketDto ticketDto) {
    Ticket ticket = convertToEntity(ticketDto);
    ticket.setId(ticketId);
    Ticket updatedTicket = ticketService.updateTicket(ticket);
    TicketDto updatedTicketDto = convertToDto(updatedTicket);
    return new ResponseEntity<>(updatedTicketDto, HttpStatus.OK);
  }

  // Build Delete Ticket REST API
  @DeleteMapping("{id}")
  public ResponseEntity<String> deleteTicket(@PathVariable("id") Long ticketId) {
    ticketService.deleteTicket(ticketId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  private TicketDto convertToDto(Ticket ticket) {
    return modelMapper.map(ticket, TicketDto.class);
  }

  private Ticket convertToEntity(TicketDto ticketDto) {
    return modelMapper.map(ticketDto, Ticket.class);
  }

  @GetMapping("/filter")
  public ResponseEntity<List<TicketDto>> getFilteredTickets(
          @RequestParam(name = "statusId", required = false) Long statusId,
          @RequestParam(name = "priorityId", required = false) Long priorityId,
          @RequestParam(name = "categoryId", required = false) Long categoryId) {
  
      // Utilisez ces paramètres pour filtrer les résultats dans le service
      List<Ticket> filteredTickets = ticketService.getFilteredTickets(statusId, priorityId, categoryId);
  
      // Convertissez les entités filtrées en DTO
      List<TicketDto> ticketDtos = filteredTickets.stream()
              .map(this::convertToDto)
              .collect(Collectors.toList());
  
      return new ResponseEntity<>(ticketDtos, HttpStatus.OK);
  }

}
