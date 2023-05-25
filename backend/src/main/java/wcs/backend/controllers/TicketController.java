package wcs.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import wcs.backend.entities.Ticket;
import wcs.backend.services.TicketService;

@AllArgsConstructor
@RestController
@RequestMapping("api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    private TicketService ticketService;

    // build create Ticket REST API
    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket){
        Ticket savedTicket = ticketService.createTicket(ticket);
        return new ResponseEntity<>(savedTicket, HttpStatus.CREATED);
    }

    // build get ticket by id REST API
    // http://localhost:8080/api/tickets/1
    @GetMapping("{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable("id") Long ticketId){
        Ticket ticket = ticketService.getTicketById(ticketId);
        return new ResponseEntity<>(ticket, HttpStatus.OK);
    }

    // Build Get All Tickets REST API
    // http://localhost:8080/api/tickets
    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets(){
        List<Ticket> tickets = ticketService.getAllTickets();
        return new ResponseEntity<>(tickets, HttpStatus.OK);
    }

    // Build Update Ticket REST API
    @PutMapping("{id}")
    // http://localhost:8080/api/tickets/1
    public ResponseEntity<Ticket> updateTicket(@PathVariable("id") Long ticketId,
                                           @RequestBody Ticket ticket){
        ticket.setId(ticketId);
        Ticket updatedTicket = ticketService.updateTicket(ticket);
        return new ResponseEntity<>(updatedTicket, HttpStatus.OK);
    }

    // Build Delete Ticket REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable("id") Long ticketId){
        ticketService.deleteTicket(ticketId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
