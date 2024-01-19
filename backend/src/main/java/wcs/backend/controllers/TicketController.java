package wcs.backend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
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
@RequestMapping("api/tickets/")
@CrossOrigin(origins = "*")
@Tag(name = "Tickets", description = "Ticket Management Controller")
public class TicketController {
  @Autowired
  private TicketService ticketService;

  @GetMapping
  @Operation(summary = "Get Tickets", description = "Get a list of tickets or perform filtering based on optional status, priority, and category filters. If count parameter is true, returns the count instead of tickets.")
  public ResponseEntity<?> getTickets(
      @RequestParam(name = "status", required = false) String statusTitle,
      @RequestParam(name = "priority", required = false) String priorityTitle,
      @RequestParam(name = "category", required = false) String categoryTitle,
      @RequestParam(name = "userId", required = false) Long userId,
      @RequestParam(name = "id", required = false) Long id,
      @RequestParam(required = false) String query,
      @RequestParam(name = "count", required = false, defaultValue = "false") boolean count) {

    if (count) {
      long countValue = ticketService.countFilteredTickets(id, statusTitle, priorityTitle, categoryTitle, userId);
      return ResponseEntity.ok(countValue);
    } 
    if (query != null) {
      List<TicketDto> ticketDtos = ticketService.getTicketsByQuery(query);
      return ResponseEntity.ok(ticketDtos);
    }
    else {
      Specification<Ticket> spec = ticketService.buildSpecificationForFilter(id, statusTitle, priorityTitle,
          categoryTitle, userId);
      List<TicketDto> ticketDtos = ticketService.getFilteredTickets(id, statusTitle, priorityTitle, categoryTitle,
          userId);
      return ResponseEntity.ok(ticketDtos);
    }
  }

  @GetMapping("{id}")
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

  @PutMapping("{id}")
  @Operation(summary = "Update Ticket", description = "Update details of an existing ticket.")
  public ResponseEntity<TicketDto> updateTicket(@PathVariable Long id,
      @RequestBody TicketDto ticketDto) {
    TicketDto updatedTicketDto = ticketService.updateTicket(id, ticketDto);
    return ResponseEntity.ok(updatedTicketDto);
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Delete Ticket", description = "Delete a ticket by its ID.")
  public ResponseEntity<String> deleteTicketAndAssociations(@PathVariable Long id) {
    ticketService.deleteTicket(id);
    return ResponseEntity.noContent().build();
  }

}
