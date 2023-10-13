package wcs.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketDto;
import wcs.backend.dtos.TicketHaveUsersDto;
import wcs.backend.dtos.UserDto;
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
@Tag(name = "Tickets", description = "Ticket Management Controller")
public class TicketController {

  private TicketService ticketService;
  private CategoryRepository categoryRepository;
  private PriorityRepository priorityRepository;
  private StatusRepository statusRepository;
  private UserRepository userRepository;

  @Autowired
  private ModelMapper modelMapper; // Utilisez ModelMapper pour simplifier la conversion entre entités et DTO

  @PostMapping
  @Operation(summary = "Create a Ticket", description = "Create a new ticket with details.")
  public ResponseEntity<TicketDto> createTicket(@RequestBody TicketDto ticketDto,
      @RequestParam Long statusId, @RequestParam Long categoryId,
      @RequestParam Long priorityId, @RequestParam Long creatorId) {
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

  @GetMapping("/{id}")
  @Operation(summary = "Get Ticket by ID", description = "Get ticket details by its ID.")
  public ResponseEntity<TicketDto> getTicketById(@PathVariable("id") Long ticketId) {
    Ticket ticket = ticketService.getTicketById(ticketId);
    if (ticket != null) {
      TicketDto ticketDto = convertToDto(ticket);
      return new ResponseEntity<>(ticketDto, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping
  @Operation(summary = "Get All Tickets", description = "Get details of all available tickets.")
  public ResponseEntity<List<TicketDto>> getAllTicketsDtos() {
    List<TicketDto> ticketDtos = ticketService.getAllTicketsDtos();
    return new ResponseEntity<>(ticketDtos, HttpStatus.OK);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update Ticket", description = "Update details of an existing ticket.")
  // http://localhost:8080/api/tickets/1
  public ResponseEntity<TicketDto> updateTicket(@PathVariable("id") Long ticketId,
      @RequestBody TicketDto ticketDto) {
    Ticket ticket = convertToEntity(ticketDto);
    ticket.setId(ticketId);
    Ticket updatedTicket = ticketService.updateTicket(ticket);
    TicketDto updatedTicketDto = convertToDto(updatedTicket);
    return new ResponseEntity<>(updatedTicketDto, HttpStatus.OK);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete Ticket", description = "Delete a ticket by its ID.")
  public ResponseEntity<String> deleteTicketAndAssociations(@PathVariable("id") Long ticketId) {
    ticketService.deleteTicket(ticketId);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  private TicketDto convertToDto(Ticket ticket) {
    TicketDto ticketDto = modelMapper.map(ticket, TicketDto.class);

    // Convertir la liste d'associations utilisateur de l'entité Ticket vers DTO
    List<TicketHaveUsersDto> ticketHaveUsersDto = ticket.getUserAssociations().stream()
            .map(ticketHaveUsers -> modelMapper.map(ticketHaveUsers, TicketHaveUsersDto.class))
            .collect(Collectors.toList());

    ticketDto.setTicketHaveUsers(ticketHaveUsersDto);

    // Ajouter les détails de l'auteur
    if (!ticket.getUserAssociations().isEmpty()) {
        User creator = ticket.getUserAssociations().get(0).getUser();
        UserDto authorDto = new UserDto(creator);
        ticketDto.setAuthor(authorDto);
    } else if (ticket.getAuthor() != null) {
        // Si la liste d'associations utilisateur est vide mais l'auteur n'est pas null, utilisez les informations de l'auteur directement
        UserDto authorDto = new UserDto(ticket.getAuthor());
        ticketDto.setAuthor(authorDto);
    }

    return ticketDto;
}





  private Ticket convertToEntity(TicketDto ticketDto) {
    return modelMapper.map(ticketDto, Ticket.class);
  }

  @GetMapping("/filter")
  @Operation(summary = "Filter Tickets", description = "Get a list of tickets based on optional status, priority, and category filters.")
  public ResponseEntity<List<TicketDto>> getFilteredTickets(
      @RequestParam(name = "status", required = false) Status.Title statusTitle,
      @RequestParam(name = "priority", required = false) Priority.Title priorityTitle,
      @RequestParam(name = "category", required = false) Category.Title categoryTitle) {

    // Utilize these parameters to build specifications in the service
    List<Ticket> filteredTickets = ticketService.getFilteredTickets(statusTitle, priorityTitle, categoryTitle);

    // Convert filtered entities to DTOs
    List<TicketDto> ticketDtos = filteredTickets.stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());

    return new ResponseEntity<>(ticketDtos, HttpStatus.OK);
  }

}
