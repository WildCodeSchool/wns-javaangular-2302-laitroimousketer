package wcs.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import wcs.backend.dtos.TicketHistoricalDto;
import wcs.backend.services.TicketHistoricalService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/historical-ticket/")
@Tag(name = "Historical-Ticket", description = "Historical-Ticket Management Controller")
public class TicketHistoricalController {
  private final TicketHistoricalService ticketHistoricalService;

  // Endpoint pour récupérer tous les TicketHistoricals
  @GetMapping
  @Operation(summary = "Get TicketHistoricals", description = "Get a list of ticketHistoricals or a list of ticketHistoricals by ticketId or userId.")
  public ResponseEntity<List<TicketHistoricalDto>> getAllTicketHistoricals(
      @RequestParam(name = "ticketId", required = false) Long ticketId,
      @RequestParam(name = "userId", required = false) Long userId) {
    List<TicketHistoricalDto> ticketHistoricals;
    if (ticketId != null) {
      ticketHistoricals = ticketHistoricalService.getTicketHistoricalsByTicketId(ticketId);
    } else if (userId != null) {
      ticketHistoricals = ticketHistoricalService.getTicketHistoricalsByUserId(userId);
    } else {
      ticketHistoricals = ticketHistoricalService.getAllTicketHistoricals();
    }

    return new ResponseEntity<>(ticketHistoricals, HttpStatus.OK);
  }

  // Endpoint pour récupérer un TicketHistorical par son ID
  @GetMapping("{id}")
  @Operation(summary = "Get TicketHistorical by ID", description = "Get ticketHistorical details by its ID.")
  public ResponseEntity<TicketHistoricalDto> getTicketHistoricalById(@PathVariable Long id) {
    TicketHistoricalDto ticketHistorical = ticketHistoricalService.getTicketHistoricalById(id);
    return new ResponseEntity<>(ticketHistorical, HttpStatus.OK);
  }

  // Endpoint pour mettre à jour le statut isRead d'un TicketHistorical
  @PutMapping("{id}")
  @Operation(summary = "Update TicketHistorical isRead status", description = "Update ticketHistorical isRead status by its ID.")
  public ResponseEntity<Void> updateIsReadStatus(@PathVariable Long id, @RequestParam boolean isRead) {
    ticketHistoricalService.updateIsReadStatus(id, isRead);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}
