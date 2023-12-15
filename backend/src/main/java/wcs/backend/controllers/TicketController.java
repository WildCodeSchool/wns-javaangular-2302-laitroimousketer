package wcs.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketDto;
import wcs.backend.dtos.TicketHaveUsersDto;
import wcs.backend.dtos.UserDto;
import wcs.backend.entities.Ticket;
import wcs.backend.entities.User;
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

  @Autowired
  private ModelMapper modelMapper; // Utilisez ModelMapper pour simplifier la conversion entre entités et DTO

  @PostMapping
  @Operation(summary = "Create a Ticket", description = "Create a new ticket with details.")
  public ResponseEntity<TicketDto> createTicket(@RequestBody TicketDto ticketDto) {
    TicketDto createdTicketDto = ticketService.createTicket(ticketDto);
    return ResponseEntity.ok(createdTicketDto);
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get Ticket by ID", description = "Get ticket details by its ID.")
  public ResponseEntity<TicketDto> getTicketById(@PathVariable("id") Long id) {
    TicketDto statusDto = ticketService.getTicketById(id);
    return ResponseEntity.ok(statusDto);
  }
  

  @GetMapping
  @Operation(summary = "Get All Tickets", description = "Get details of all available tickets.")
  public ResponseEntity<List<TicketDto>> getAllTicketsDtos() {
    List<TicketDto> ticketDtos = ticketService.getAllTicketsDtos();
    return new ResponseEntity<>(ticketDtos, HttpStatus.OK);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update Ticket", description = "Update details of an existing ticket.")
  public ResponseEntity<TicketDto> updateTicket(@PathVariable("id") Long id,
      @RequestBody TicketDto ticketDto) {
      ticketDto.setId(id);
      TicketDto updatedTicketDto = ticketService.updateTicket(id,ticketDto);
      return new ResponseEntity<>(updatedTicketDto, HttpStatus.OK);
  }
  

  @PutMapping("/archive/{id}")
  @Operation(summary = "Archive Ticket", description = "Archive an existing ticket by ID.")
  public ResponseEntity<TicketDto> archiveTicket(@PathVariable("id") Long ticketId) {
      TicketDto archivedTicketDto = ticketService.archiveTicket(ticketId);
      return new ResponseEntity<>(archivedTicketDto, HttpStatus.OK);
  }
  
  @PutMapping("/unarchive/{id}")
  @Operation(summary = "Unarchive Ticket", description = "Unarchive an existing ticket by ID.")
  public ResponseEntity<TicketDto> unarchiveTicket(@PathVariable("id") Long ticketId) {
      TicketDto unarchivedTicketDto = ticketService.unarchiveTicket(ticketId);
      return new ResponseEntity<>(unarchivedTicketDto, HttpStatus.OK);
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
      // Si la liste d'associations utilisateur est vide mais l'auteur n'est pas null,
      // utilisez les informations de l'auteur directement
      UserDto authorDto = new UserDto(ticket.getAuthor());
      ticketDto.setAuthor(authorDto);
    }
    return ticketDto;
  }

  @GetMapping("/filter")
  @Operation(summary = "Filter Tickets", description = "Get a list of tickets based on optional status, priority, and category filters.")
  public ResponseEntity<List<TicketDto>> getFilteredTickets(
      @RequestParam(name = "status", required = false) String statusTitle,
      @RequestParam(name = "priority", required = false) String priorityTitle,
      @RequestParam(name = "category", required = false) String categoryTitle,
      @RequestParam(name = "userId", required = false) Long userId) {

    // Utilize these parameters to build specifications in the service
    List<Ticket> filteredTickets = ticketService.getFilteredTickets(statusTitle, priorityTitle, categoryTitle);

    // Convert filtered entities to DTOs
    List<TicketDto> ticketDtos = filteredTickets.stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());

    return new ResponseEntity<>(ticketDtos, HttpStatus.OK);
  }

  // GET COUNT//
  @GetMapping("/count")
  @Operation(summary = "Count all Tickets", description = "Get the number of all tickets.")
  public ResponseEntity<Long> countAllTickets() {
    long count = ticketService.countAllTickets();
    return ResponseEntity.ok(count);
  }

  @GetMapping("/countByCategory/{categoryTitle}")
  @Operation(summary = "Count Tickets by Category", description = "Get the number of tickets in a category.")
  public ResponseEntity<Long> countTicketsByCategory(@PathVariable("categoryTitle") String categoryTitle) {
    long count = ticketService.countTicketsByCategory(categoryTitle);
    return ResponseEntity.ok(count);
  }

  @GetMapping("/countByPriority/{priorityTitle}")
  @Operation(summary = "Count Tickets by Priority", description = "Get the number of tickets with a priority.")
  public ResponseEntity<Long> countTicketsByPriority(@PathVariable("priorityTitle") String priorityTitle) {
    long count = ticketService.countTicketsByPriority(priorityTitle);
    return ResponseEntity.ok(count);
  }

  @GetMapping("/countByStatus/{statusTitle}")
  @Operation(summary = "Count Tickets by Status", description = "Get the number of tickets with a status.")
  public ResponseEntity<Long> countTicketsByStatus(@PathVariable("statusTitle") String statusTitle) {
    long count = ticketService.countTicketsByStatus(statusTitle);
    return ResponseEntity.ok(count);
  }
}
