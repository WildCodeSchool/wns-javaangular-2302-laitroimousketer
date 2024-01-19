package wcs.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketDeveloperDto;
import wcs.backend.services.TicketDeveloperService;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("api/ticket-developer/")
@CrossOrigin(origins = "*")
@Tag(name = "Ticket-Developer", description = "Ticket-Developer Management Controller")
public class TicketDeveloperController {
  @Autowired
  private final TicketDeveloperService ticketDeveloperService;


  @GetMapping
  @Operation(summary = "Get Ticket-Developer", description = "Get a list of ticket-developer or perform filtering based on userId and ticketId filters")
  public ResponseEntity<List<TicketDeveloperDto>> getTicketDevelopers(
          @RequestParam(name = "userId", required = false) Long userId,
          @RequestParam(name = "ticketId", required = false) Long ticketId) {
  
      List<TicketDeveloperDto> ticketDeveloperDtos = ticketDeveloperService.getTicketDeveloperByQuery(userId, ticketId);
      return ResponseEntity.ok(ticketDeveloperDtos);
  }
  

  // Create
  @PostMapping
  @Operation(summary = "Create Ticket-Developer", description = "Create a new ticket-developer with details.")
  public ResponseEntity<TicketDeveloperDto> createTicketDeveloper(@RequestBody TicketDeveloperDto ticketDeveloperDto) {
    TicketDeveloperDto createdTicketDeveloper = ticketDeveloperService.createTicketDeveloper(ticketDeveloperDto);
    return new ResponseEntity<>(createdTicketDeveloper, HttpStatus.CREATED);
  }

  // Read
  @GetMapping("/{id}")
  @Operation(summary = "Get Ticket-Developer by ID", description = "Get ticket-developer details by its ID.")
  public ResponseEntity<TicketDeveloperDto> getTicketDeveloperById(@PathVariable Long id) {
    Optional<TicketDeveloperDto> ticketDeveloperDto = ticketDeveloperService.getTicketDeveloperById(id);

    if (ticketDeveloperDto.isPresent()) {
      return new ResponseEntity<>(ticketDeveloperDto.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  // Update
  @PutMapping("{id}")
  @Operation(summary = "Update Ticket-Developer", description = "Update a ticket-developer by its ID.")
  public ResponseEntity<TicketDeveloperDto> updateTicketDeveloper(
      @PathVariable Long id,
      @RequestBody TicketDeveloperDto ticketDeveloperDto) {
    TicketDeveloperDto updatedTicketDeveloper = ticketDeveloperService.updateTicketDeveloper(id, ticketDeveloperDto);
    return new ResponseEntity<>(updatedTicketDeveloper, HttpStatus.OK);
  }

  // Delete
  @DeleteMapping("{id}")
  @Operation(summary = "Delete Ticket-Developer", description = "Delete a ticket-developer by its ID.")
  public ResponseEntity<Void> deleteTicketDeveloper(@PathVariable Long id) {
    ticketDeveloperService.deleteTicketDeveloper(id);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
