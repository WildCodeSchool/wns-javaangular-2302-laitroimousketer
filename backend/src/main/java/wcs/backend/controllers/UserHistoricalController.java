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
import wcs.backend.dtos.UserHistoricalDto;
import wcs.backend.services.UserHistoricalService;

@AllArgsConstructor
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("api/historical-user/")
@Tag(name = "Historical", description = "Historical Management Controller")
public class UserHistoricalController {
  private final UserHistoricalService userHistoricalService;

  // Endpoint pour récupérer tous les userHistoricals
  @GetMapping
  @Operation(summary = "Get UserHistoricals", description = "Get a list of userHistoricals or perform filtering based on query with userId")
  public ResponseEntity<List<UserHistoricalDto>> getAlluserHistoricals(
      @RequestParam(name = "ticketId", required = false) Long ticketId,
      @RequestParam(name = "userId", required = false) Long userId) {
    List<UserHistoricalDto> userHistoricals;
    if (ticketId != null) {
      userHistoricals = userHistoricalService.getUserHistoricalsByTicketId(userId);
    } else if (userId != null) {
      userHistoricals = userHistoricalService.getUserHistoricalsByUserId(userId);
    } else {
      userHistoricals = userHistoricalService.getAllUserHistoricals();
    }
    return new ResponseEntity<>(userHistoricals, HttpStatus.OK);
  }

  // Endpoint pour récupérer un userHistorical par son ID
  @GetMapping("{id}")
  @Operation(summary = "Get UserHistorical by ID", description = "Get userHistorical details by its ID.")
  public ResponseEntity<UserHistoricalDto> getuserHistoricalById(@PathVariable Long id) {
    UserHistoricalDto userHistorical = userHistoricalService.getUserHistoricalById(id);
    return new ResponseEntity<>(userHistorical, HttpStatus.OK);
  }

  // Endpoint pour mettre à jour le statut isRead d'un userHistorical
  @PutMapping("{id}")
  @Operation(summary = "Update UserHistorical isRead status", description = "Update userHistorical isRead status by its ID.")
  public ResponseEntity<Void> updateIsReadStatus(@PathVariable Long id, @RequestParam boolean isRead) {
    userHistoricalService.updateIsReadStatus(id, isRead);
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
  }
}