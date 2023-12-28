package wcs.backend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketDto;
import wcs.backend.entities.Ticket;
import wcs.backend.services.TicketService;
import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("api/tickets")
@CrossOrigin(origins = "*")
@Tag(name = "Tickets", description = "Ticket Management Controller")
public class TicketController {
  @Autowired
  private TicketService ticketService;

  @Autowired
  private ModelMapper modelMapper; // Utilisez ModelMapper pour simplifier la conversion entre entités et DTO

  @GetMapping
  @Operation(summary = "Get Tickets", description = "Get a list of tickets or perform filtering based on optional status, priority, and category filters. If count parameter is true, returns the count instead of tickets.")
  public ResponseEntity<?> getTickets(
      @RequestParam(name = "status", required = false) String statusTitle,
      @RequestParam(name = "priority", required = false) String priorityTitle,
      @RequestParam(name = "category", required = false) String categoryTitle,
      @RequestParam(name = "userId", required = false) Long userId,
      @RequestParam(name = "id", required = false) Long id,
      @RequestParam(name = "count", required = false, defaultValue = "false") boolean count) {

    if (count) {
      long countValue = ticketService.countFilteredTickets(id, statusTitle, priorityTitle, categoryTitle, userId);
      return ResponseEntity.ok(countValue);
    } else {
      Specification<Ticket> spec = ticketService.buildSpecificationForFilter(id, statusTitle, priorityTitle,
          categoryTitle, userId);
      List<TicketDto> ticketDtos = ticketService.getFilteredTickets(id, statusTitle, priorityTitle, categoryTitle,
          userId);
      return ResponseEntity.ok(ticketDtos);
    }
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get Ticket by ID", description = "Get ticket details by its ID.")
  public ResponseEntity<TicketDto> getTicketById(@PathVariable Long id) {
    TicketDto ticketDto = ticketService.getTicketById(id);
    return ResponseEntity.ok(ticketDto);
  }

  @PostMapping
  @Operation(summary = "Create a Ticket", description = "Create a new ticket with details.")
  public ResponseEntity<TicketDto> createTicket(@RequestBody TicketDto ticketDto) {
    TicketDto createdTicketDto = ticketService.createTicket(ticketDto);
    return ResponseEntity.ok(createdTicketDto);
  }

  @PutMapping("/{id}")
  @Operation(summary = "Update Ticket", description = "Update details of an existing ticket.")
  public ResponseEntity<TicketDto> updateTicket(@PathVariable Long id,
      @RequestBody TicketDto ticketDto) {
    ticketDto.setId(id);
    TicketDto updatedTicketDto = ticketService.updateTicket(id, ticketDto);
    return ResponseEntity.ok(updatedTicketDto);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete Ticket", description = "Delete a ticket by its ID.")
  public ResponseEntity<String> deleteTicketAndAssociations(@PathVariable Long id) {
    ticketService.deleteTicket(id);
    return ResponseEntity.noContent().build();
  }

  @PutMapping("/archive/{id}")
  @Operation(summary = "Archive Ticket", description = "Archive an existing ticket by ID.")
  public ResponseEntity<TicketDto> archiveTicket(@PathVariable Long id) {
    TicketDto archivedTicketDto = ticketService.archiveTicket(id);
    return new ResponseEntity<>(archivedTicketDto, HttpStatus.OK);
  }

  @PutMapping("/unarchive/{id}")
  @Operation(summary = "Unarchive Ticket", description = "Unarchive an existing ticket by ID.")
  public ResponseEntity<TicketDto> unarchiveTicket(@PathVariable Long id) {
    TicketDto unarchivedTicketDto = ticketService.unarchiveTicket(id);
    return new ResponseEntity<>(unarchivedTicketDto, HttpStatus.OK);
  }

  // @GetMapping("/filter")
  // @Operation(summary = "Filter Tickets", description = "Get a list of tickets
  // based on optional status, priority, and category filters. If count parameter
  // is true, returns the count instead of tickets.")
  // public ResponseEntity<?> filterTickets(
  // @RequestParam(name = "status", required = false) String statusTitle,
  // @RequestParam(name = "priority", required = false) String priorityTitle,
  // @RequestParam(name = "category", required = false) String categoryTitle,
  // @RequestParam(name = "userId", required = false) Long userId,
  // @RequestParam(name = "count", required = false, defaultValue = "false")
  // boolean count) {
  // // si count donné en param, renvoie le nombre de tickets uniquemenjt selon
  // les autres paramètres
  // if (count) {
  // long countValue;
  // if (categoryTitle != null) {
  // countValue = ticketService.countTicketsByCategory(categoryTitle);
  // } else if (priorityTitle != null) {
  // countValue = ticketService.countTicketsByPriority(priorityTitle);
  // } else if (statusTitle != null) {
  // countValue = ticketService.countTicketsByStatus(statusTitle);
  // } else {
  // countValue = ticketService.countAllTickets();
  // }
  // return ResponseEntity.ok(countValue);
  // } else {
  // List<TicketDto> ticketDtos = ticketService.getFilteredTickets(statusTitle,
  // priorityTitle, categoryTitle, userId);
  // return ResponseEntity.ok(ticketDtos);
  // }
  // }

}
